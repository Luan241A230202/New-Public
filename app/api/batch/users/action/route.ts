import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  userIds: z.array(z.string()).max(100),
  action: z.enum(["BAN", "UNBAN", "VERIFY", "MUTE_7D", "UNMUTE"]),
  reason: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!isAdmin(session) || !session?.user) {
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
    // Create batch job
    const batchJob = await prisma.batchJob.create({
      data: {
        type: "USER_ACTION",
        status: "PROCESSING",
        totalItems: parsed.data.userIds.length,
        params: parsed.data,
        createdBy: (session.user as any).id,
        startedAt: new Date(),
      },
    });

    let processedItems = 0;
    let failedItems = 0;
    const results: any[] = [];

    // Process each user action
    for (const userId of parsed.data.userIds) {
      try {
        let updateData: any = {};
        
        // Map actions to database updates
        const actionMap: Record<string, any> = {
          BAN: { bannedAt: new Date() },
          UNBAN: { bannedAt: null, mutedUntil: null },
          VERIFY: { emailVerified: new Date() },
          MUTE_7D: { mutedUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
          UNMUTE: { mutedUntil: null },
        };

        updateData = actionMap[parsed.data.action] || {};

        await prisma.user.update({
          where: { id: userId },
          data: updateData,
        });

        // Map actions to moderation types
        const moderationTypeMap: Record<string, any> = {
          BAN: "BAN_USER",
          UNBAN: "UNBAN_USER",
          MUTE_7D: "MUTE_USER_7D",
          UNMUTE: "UNMUTE_USER",
          VERIFY: "STRIKE_USER", // Using existing enum
        };

        // Create moderation action record
        await prisma.moderationAction.create({
          data: {
            actorUserId: (session.user as any).id,
            targetUserId: userId,
            type: moderationTypeMap[parsed.data.action] || "STRIKE_USER",
            reason: parsed.data.reason || "Batch action",
          },
        });
        
        processedItems++;
        results.push({ userId, success: true });
      } catch (error) {
        failedItems++;
        results.push({ 
          userId, 
          success: false, 
          error: (error as Error).message 
        });
      }
    }

    // Update batch job
    await prisma.batchJob.update({
      where: { id: batchJob.id },
      data: {
        status: "COMPLETED",
        processedItems,
        failedItems,
        result: { results },
        completedAt: new Date(),
      },
    });

    // Log the action
    await prisma.auditLog.create({
      data: {
        userId: (session.user as any).id,
        action: "BATCH_USER_ACTION",
        resource: `batch:${batchJob.id}`,
        details: { 
          action: parsed.data.action,
          total: parsed.data.userIds.length, 
          processed: processedItems, 
          failed: failedItems 
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        batchJobId: batchJob.id,
        processedItems,
        failedItems,
        results,
      },
      message: "Batch action completed",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to process batch action",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
