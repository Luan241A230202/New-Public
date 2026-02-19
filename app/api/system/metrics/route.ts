import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import { getRedis } from "@/lib/redis";

export async function GET() {
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Forbidden - Admin only" }, { status: 403 });
  }

  const metrics: Record<string, any> = {};

  // Process metrics
  const memUsage = process.memoryUsage();
  metrics.process = {
    uptime: process.uptime(),
    memory: {
      rss: memUsage.rss,
      heapTotal: memUsage.heapTotal,
      heapUsed: memUsage.heapUsed,
      external: memUsage.external,
    },
    cpu: process.cpuUsage(),
  };

  // Database metrics
  if (prisma) {
    try {
      const [userCount, videoCount, progressCount] = await Promise.all([
        prisma.user.count(),
        prisma.video.count(),
        prisma.videoProgress.count(),
      ]);
      
      metrics.database = {
        users: userCount,
        videos: videoCount,
        videoProgress: progressCount,
      };
    } catch (error) {
      metrics.database = { error: "Failed to fetch database metrics" };
    }
  }

  // Redis metrics
  const redis = getRedis();
  if (redis) {
    try {
      const info = await redis.info();
      const dbSize = await redis.dbsize();
      metrics.redis = {
        connected: true,
        dbSize,
        info: info.split('\n').slice(0, 10).join('\n'), // First few lines
      };
    } catch (error) {
      metrics.redis = { error: "Failed to fetch Redis metrics" };
    }
  }

  return NextResponse.json({
    success: true,
    data: metrics,
    timestamp: new Date().toISOString()
  });
}
