import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { queues } from "@/lib/queues";

const bodySchema = z.object({
  sources: z.array(z.object({
    url: z.string().url(),
    platform: z.enum(["YOUTUBE", "VIMEO"]).optional(),
    metadata: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }).optional(),
  })).max(10), // Max 10 videos per import
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
    const userId = (session.user as any).id;

    // Create batch job for import
    const batchJob = await prisma.batchJob.create({
      data: {
        type: "IMPORT",
        status: "PENDING",
        totalItems: parsed.data.sources.length,
        params: { sources: parsed.data.sources },
        createdBy: userId,
      },
    });

    // Queue import job (in real implementation, this would be processed by worker)
    // For MVP, we mark it as pending
    await queues.syncApiSource.add("import-videos", {
      batchJobId: batchJob.id,
      userId,
      sources: parsed.data.sources,
    });

    // Log the action
    await prisma.auditLog.create({
      data: {
        userId,
        action: "VIDEO_IMPORT",
        resource: `batch:${batchJob.id}`,
        details: { count: parsed.data.sources.length },
      },
    });

    return NextResponse.json({
      success: true,
      data: { 
        batchJobId: batchJob.id,
        status: "PENDING",
        totalItems: parsed.data.sources.length,
      },
      message: "Import job created successfully",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to create import job",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
