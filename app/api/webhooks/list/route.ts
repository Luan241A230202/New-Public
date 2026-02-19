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
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 100);
  const skip = (page - 1) * limit;

  try {
    const userId = (session.user as any).id;
    const isAdmin = (session.user as any).role === "ADMIN";

    const where = isAdmin ? {} : { createdBy: userId };

    const [webhooks, total] = await Promise.all([
      prisma.webhook.findMany({
        where,
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
      prisma.webhook.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        webhooks,
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
      error: "Failed to fetch webhooks",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
