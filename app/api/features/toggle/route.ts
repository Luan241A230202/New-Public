import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  name: z.string(),
  enabled: z.boolean().optional(),
  rolloutPercent: z.number().min(0).max(100).optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Forbidden - Admin only" }, { status: 403 });
  }

  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ 
      error: "Invalid payload", 
      details: parsed.error.errors 
    }, { status: 400 });
  }

  try {
    const updateData: any = {};
    
    if (parsed.data.enabled !== undefined) {
      updateData.enabled = parsed.data.enabled;
    }
    
    if (parsed.data.rolloutPercent !== undefined) {
      updateData.rolloutPercent = parsed.data.rolloutPercent;
    }

    const feature = await prisma.featureFlag.upsert({
      where: { name: parsed.data.name },
      update: updateData,
      create: {
        name: parsed.data.name,
        enabled: parsed.data.enabled ?? false,
        rolloutPercent: parsed.data.rolloutPercent ?? 0,
      },
    });

    // Log the action
    await prisma.auditLog.create({
      data: {
        userId: (session.user as any).id,
        action: "FEATURE_FLAG_TOGGLE",
        resource: `feature:${feature.name}`,
        details: { 
          name: feature.name,
          enabled: feature.enabled,
          rolloutPercent: feature.rolloutPercent,
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: feature,
      message: "Feature flag updated successfully",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to toggle feature flag",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
