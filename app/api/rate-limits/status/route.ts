import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getRedis } from "@/lib/redis";
import { RATE_LIMIT_KEY_PREFIX } from "@/lib/rateLimit";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const redis = getRedis();
  
  if (!redis) {
    return NextResponse.json({
      success: true,
      data: {
        limits: {
          general: { limit: 100, remaining: 100, resetAt: Date.now() + 3600000 },
        },
        note: "Rate limiting not configured (Redis unavailable)"
      },
      timestamp: new Date().toISOString()
    });
  }

  try {
    // Check various rate limit buckets for the user
    const keys = await redis.keys(`${RATE_LIMIT_KEY_PREFIX}${userId}:*`);
    const limits: Record<string, any> = {};

    for (const key of keys) {
      const count = await redis.get(key);
      const ttl = await redis.pttl(key);
      const bucketName = key.replace(`${RATE_LIMIT_KEY_PREFIX}${userId}:`, '');
      
      limits[bucketName] = {
        current: parseInt(count || '0', 10),
        resetAt: Date.now() + Math.max(0, ttl)
      };
    }

    return NextResponse.json({
      success: true,
      data: {
        userId,
        limits,
        timestamp: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to fetch rate limit status",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
