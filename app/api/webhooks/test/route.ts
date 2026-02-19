import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  webhookId: z.string(),
  payload: z.record(z.any()).optional(),
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
    const webhook = await prisma.webhook.findUnique({
      where: { id: parsed.data.webhookId },
    });

    if (!webhook) {
      return NextResponse.json({ error: "Webhook not found" }, { status: 404 });
    }

    // Check ownership
    const isAdmin = (session.user as any).role === "ADMIN";
    const isOwner = webhook.createdBy === (session.user as any).id;
    
    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Send test webhook
    const testPayload = parsed.data.payload || {
      event: "test",
      timestamp: new Date().toISOString(),
      data: { message: "This is a test webhook" },
    };

    try {
      const response = await fetch(webhook.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(webhook.secret ? { "X-Webhook-Secret": webhook.secret } : {}),
        },
        body: JSON.stringify(testPayload),
      });

      const success = response.ok;
      const status = response.status;

      // Log the test
      await prisma.auditLog.create({
        data: {
          userId: (session.user as any).id,
          action: "WEBHOOK_TEST",
          resource: `webhook:${webhook.id}`,
          details: { 
            success, 
            status,
            url: webhook.url,
          },
        },
      });

      return NextResponse.json({
        success: true,
        data: {
          webhookId: webhook.id,
          testResult: {
            success,
            status,
            message: success ? "Webhook test successful" : "Webhook test failed",
          },
        },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      return NextResponse.json({
        success: false,
        data: {
          webhookId: webhook.id,
          testResult: {
            success: false,
            error: (error as Error).message,
          },
        },
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to test webhook",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
