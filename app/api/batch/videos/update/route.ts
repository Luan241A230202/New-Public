import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

const videoUpdateSchema = z.object({
  id: z.string(),
  data: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(["DRAFT", "PROCESSING", "PUBLISHED", "HIDDEN", "ERROR", "DELETED"]).optional(),
    isSensitive: z.boolean().optional(),
  }),
});

const bodySchema = z.object({
  videos: z.array(videoUpdateSchema).max(100),
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
    // Create batch job
    const batchJob = await prisma.batchJob.create({
      data: {
        type: "VIDEO_UPDATE",
        status: "PROCESSING",
        totalItems: parsed.data.videos.length,
        params: { videos: parsed.data.videos },
        createdBy: (session.user as any).id,
        startedAt: new Date(),
      },
    });

    let processedItems = 0;
    let failedItems = 0;
    const results: any[] = [];

    // Process each video update
    for (const videoUpdate of parsed.data.videos) {
      try {
        const updated = await prisma.video.update({
          where: { id: videoUpdate.id },
          data: videoUpdate.data,
        });
        
        processedItems++;
        results.push({ id: videoUpdate.id, success: true });
      } catch (error) {
        failedItems++;
        results.push({ 
          id: videoUpdate.id, 
          success: false, 
          error: (error as Error).message 
        });
      }
    }

    // Update batch job
    await prisma.batchJob.update({
      where: { id: batchJob.id },
      data: {
        status: failedItems === 0 ? "COMPLETED" : failedItems === processedItems ? "FAILED" : "COMPLETED",
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
        action: "BATCH_VIDEO_UPDATE",
        resource: `batch:${batchJob.id}`,
        details: { total: parsed.data.videos.length, processed: processedItems, failed: failedItems },
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
      message: "Batch update completed",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to process batch update",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
