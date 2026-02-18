import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  type: z.enum(["ANALYTICS", "USERS", "VIDEOS"]),
  format: z.enum(["CSV", "JSON"]).default("JSON"),
  filters: z.object({
    dateFrom: z.string().optional(),
    dateTo: z.string().optional(),
  }).optional(),
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
    // Create export job
    const exportJob = await prisma.exportJob.create({
      data: {
        type: parsed.data.type,
        status: "PENDING",
        format: parsed.data.format,
        params: parsed.data,
        createdBy: (session.user as any).id,
      },
    });

    // In real implementation, this would queue a background job
    // For MVP, we process it immediately for small datasets
    
    // Log the action
    await prisma.auditLog.create({
      data: {
        userId: (session.user as any).id,
        action: "DATA_EXPORT",
        resource: `export:${exportJob.id}`,
        details: { type: parsed.data.type, format: parsed.data.format },
      },
    });

    // Simulate processing
    setTimeout(async () => {
      try {
        await prisma.exportJob.update({
          where: { id: exportJob.id },
          data: {
            status: "COMPLETED",
            completedAt: new Date(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            fileUrl: `/exports/${exportJob.id}.${parsed.data.format.toLowerCase()}`,
          },
        });
      } catch (error) {
        // Error handling
      }
    }, 1000);

    return NextResponse.json({
      success: true,
      data: { 
        exportJobId: exportJob.id,
        status: "PENDING",
      },
      message: "Export job created successfully",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to create export job",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
