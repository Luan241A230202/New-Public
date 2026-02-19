import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const sessionId = params.id;
    const userId = (session.user as any).id;

    // Find the session
    const userSession = await prisma.userSession.findUnique({
      where: { id: sessionId },
    });

    if (!userSession) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Check ownership
    const isAdmin = (session.user as any).role === "ADMIN";
    const isOwner = userSession.userId === userId;
    
    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Delete the session
    await prisma.userSession.delete({
      where: { id: sessionId },
    });

    // Log the action
    await prisma.auditLog.create({
      data: {
        userId,
        action: "SESSION_DELETE",
        resource: `session:${sessionId}`,
        details: { sessionId, targetUserId: userSession.userId },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Session deleted successfully",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to delete session",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
