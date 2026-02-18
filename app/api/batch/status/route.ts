import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Forbidden - Admin only" }, { status: 403 });
  }

  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(req.url);
  const batchJobId = searchParams.get("id");

  try {
    if (batchJobId) {
      // Get specific batch job
      const batchJob = await prisma.batchJob.findUnique({
        where: { id: batchJobId },
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (!batchJob) {
        return NextResponse.json({ error: "Batch job not found" }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        data: batchJob,
        timestamp: new Date().toISOString()
      });
    } else {
      // List recent batch jobs
      const page = parseInt(searchParams.get("page") || "1", 10);
      const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 100);
      const skip = (page - 1) * limit;

      const [batchJobs, total] = await Promise.all([
        prisma.batchJob.findMany({
          take: limit,
          skip,
          orderBy: { createdAt: "desc" },
          include: {
            creator: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        }),
        prisma.batchJob.count(),
      ]);

      return NextResponse.json({
        success: true,
        data: {
          batchJobs,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        },
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to fetch batch job status",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
