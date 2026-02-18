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
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 100);
  const skip = (page - 1) * limit;

  try {
    const [backups, total] = await Promise.all([
      prisma.backup.findMany({
        take: limit,
        skip,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          type: true,
          status: true,
          size: true,
          location: true,
          createdAt: true,
          completedAt: true,
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.backup.count(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        backups: backups.map(b => ({
          ...b,
          size: b.size ? Number(b.size) : null,
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to fetch backups",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
