import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const userId = (session.user as any).id;

    const sessions = await prisma.userSession.findMany({
      where: { 
        userId,
        expiresAt: { gte: new Date() }, // Only active sessions
      },
      orderBy: { lastActiveAt: "desc" },
      select: {
        id: true,
        deviceInfo: true,
        ipAddress: true,
        userAgent: true,
        lastActiveAt: true,
        expiresAt: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: { sessions },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to fetch sessions",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
