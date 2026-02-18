import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(req.url);
  const exportJobId = searchParams.get("id");

  if (!exportJobId) {
    return NextResponse.json({ error: "Export job ID required" }, { status: 400 });
  }

  try {
    const exportJob = await prisma.exportJob.findUnique({
      where: { id: exportJobId },
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

    if (!exportJob) {
      return NextResponse.json({ error: "Export job not found" }, { status: 404 });
    }

    // Check if user owns this export job (or is admin)
    const isAdmin = (session.user as any).role === "ADMIN";
    const isOwner = exportJob.createdBy === (session.user as any).id;
    
    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({
      success: true,
      data: {
        ...exportJob,
        fileSize: exportJob.fileSize ? Number(exportJob.fileSize) : null,
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to fetch export job status",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
