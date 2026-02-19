import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/authz";
import { getRedis } from "@/lib/redis";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  keys: z.array(z.string()).optional(),
  pattern: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!isAdmin(session) || !session?.user) {
    return NextResponse.json({ error: "Forbidden - Admin only" }, { status: 403 });
  }

  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ error: "Redis not configured" }, { status: 503 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    let deletedKeys = 0;

    if (parsed.data.keys && parsed.data.keys.length > 0) {
      // Clear specific keys
      deletedKeys = await redis.del(...parsed.data.keys);
    } else if (parsed.data.pattern) {
      // Clear by pattern
      const keys = await redis.keys(parsed.data.pattern);
      if (keys.length > 0) {
        deletedKeys = await redis.del(...keys);
      }
    } else {
      // Clear all cache (use with extreme caution)
      await redis.flushdb();
      deletedKeys = -1; // Indicates full flush
    }

    // Log the action
    if (prisma) {
      await prisma.auditLog.create({
        data: {
          userId: (session.user as any).id,
          action: "CACHE_CLEAR",
          resource: parsed.data.pattern || "all",
          details: { deletedKeys, keys: parsed.data.keys, pattern: parsed.data.pattern },
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: { deletedKeys },
      message: deletedKeys === -1 ? "All cache cleared" : `${deletedKeys} keys cleared`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to clear cache",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
