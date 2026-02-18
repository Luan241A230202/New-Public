import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  url: z.string().url(),
  events: z.array(z.enum([
    "video.uploaded",
    "video.published", 
    "user.verified",
    "payment.completed",
    "nft.minted",
    "comment.created",
  ])),
  secret: z.string().min(16).optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    const webhook = await prisma.webhook.create({
      data: {
        url: parsed.data.url,
        events: parsed.data.events,
        secret: parsed.data.secret,
        enabled: true,
        createdBy: (session.user as any).id,
      },
    });

    // Log the action
    await prisma.auditLog.create({
      data: {
        userId: (session.user as any).id,
        action: "WEBHOOK_REGISTER",
        resource: `webhook:${webhook.id}`,
        details: { url: parsed.data.url, events: parsed.data.events },
      },
    });

    return NextResponse.json({
      success: true,
      data: webhook,
      message: "Webhook registered successfully",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to register webhook",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
