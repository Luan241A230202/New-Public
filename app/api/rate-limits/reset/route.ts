import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/authz";
import { getRedis } from "@/lib/redis";
import { RATE_LIMIT_KEY_PREFIX } from "@/lib/rateLimit";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  userId: z.string().optional(),
  bucket: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Forbidden - Admin only" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ error: "Redis not configured" }, { status: 503 });
  }

  try {
    const { userId, bucket } = parsed.data;
    let deletedKeys = 0;

    if (userId && bucket) {
      // Reset specific bucket for user
      const key = `${RATE_LIMIT_KEY_PREFIX}${userId}:${bucket}`;
      deletedKeys = await redis.del(key);
    } else if (userId) {
      // Reset all buckets for user
      const keys = await redis.keys(`${RATE_LIMIT_KEY_PREFIX}${userId}:*`);
      if (keys.length > 0) {
        deletedKeys = await redis.del(...keys);
      }
    } else if (bucket) {
      // Reset specific bucket for all users
      const keys = await redis.keys(`${RATE_LIMIT_KEY_PREFIX}*:${bucket}`);
      if (keys.length > 0) {
        deletedKeys = await redis.del(...keys);
      }
    } else {
      // Reset all rate limits (use with caution)
      const keys = await redis.keys(`${RATE_LIMIT_KEY_PREFIX}*`);
      if (keys.length > 0) {
        deletedKeys = await redis.del(...keys);
      }
    }

    // Log the action
    if (prisma) {
      await prisma.auditLog.create({
        data: {
          userId: (session.user as any).id,
          action: "RATE_LIMIT_RESET",
          resource: userId ? `user:${userId}` : bucket ? `bucket:${bucket}` : "all",
          details: { deletedKeys, userId, bucket },
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: { deletedKeys },
      message: "Rate limits reset successfully",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to reset rate limits",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
