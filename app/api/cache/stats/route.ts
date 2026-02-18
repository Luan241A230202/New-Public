import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/authz";
import { getRedis } from "@/lib/redis";

export async function GET() {
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Forbidden - Admin only" }, { status: 403 });
  }

  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ error: "Redis not configured" }, { status: 503 });
  }

  try {
    const info = await redis.info();
    const dbSize = await redis.dbsize();
    const memory = await redis.info("memory");
    
    // Parse info string to get stats
    const stats: Record<string, any> = {
      dbSize,
      connected: true,
    };

    // Parse memory info
    const memoryLines = memory.split("\n");
    for (const line of memoryLines) {
      if (line.includes(":")) {
        const [key, value] = line.split(":");
        if (key.startsWith("used_memory")) {
          stats[key.trim()] = value.trim();
        }
      }
    }

    // Get sample of keys by pattern
    const patterns = [
      "videoshare:ratelimit:*",
      "videoshare:session:*",
      "videoshare:cache:*",
    ];

    const keysByPattern: Record<string, number> = {};
    for (const pattern of patterns) {
      const keys = await redis.keys(pattern);
      keysByPattern[pattern] = keys.length;
    }

    return NextResponse.json({
      success: true,
      data: {
        stats,
        keysByPattern,
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to fetch cache stats",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
