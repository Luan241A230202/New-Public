import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const userId = (session.user as any).id;

  try {
    // Gather user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        videos: true,
        comments: true,
        likes: true,
        playlists: true,
        notifications: true,
        starTransactions: true,
        // Add other relations as needed
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create export job
    const exportJob = await prisma.exportJob.create({
      data: {
        type: "GDPR",
        status: "COMPLETED",
        format: "JSON",
        params: { userId },
        createdBy: userId,
        completedAt: new Date(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    // Log the action
    await prisma.auditLog.create({
      data: {
        userId,
        action: "GDPR_DATA_EXPORT",
        resource: `export:${exportJob.id}`,
        details: { exportJobId: exportJob.id },
      },
    });

    // Remove sensitive fields
    const { passwordHash, ...userData } = user;

    const gdprData = {
      exportDate: new Date().toISOString(),
      exportJobId: exportJob.id,
      user: userData,
      note: "This is your complete data package as per GDPR requirements.",
    };

    return NextResponse.json({
      success: true,
      data: gdprData,
      message: "GDPR data export completed",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to export GDPR data",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
