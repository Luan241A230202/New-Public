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
    const isAdmin = (session.user as any).role === "ADMIN";

    // Non-admin users can only see enabled features
    const where = isAdmin ? {} : { enabled: true };

    const features = await prisma.featureFlag.findMany({
      where,
      orderBy: { name: "asc" },
    });

    return NextResponse.json({
      success: true,
      data: { features },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to fetch feature flags",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
