import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getRedis } from "@/lib/redis";

export async function GET() {
  const checks: Record<string, any> = {};
  let overall = "healthy";

  // Check database
  try {
    if (prisma) {
      await prisma.$queryRaw`SELECT 1`;
      checks.database = { status: "healthy", timestamp: new Date().toISOString() };
    } else {
      checks.database = { status: "not_configured", timestamp: new Date().toISOString() };
    }
  } catch (error) {
    checks.database = { 
      status: "unhealthy", 
      error: (error as Error).message,
      timestamp: new Date().toISOString() 
    };
    overall = "unhealthy";
  }

  // Check Redis
  try {
    const redis = getRedis();
    if (redis) {
      await redis.ping();
      checks.redis = { status: "healthy", timestamp: new Date().toISOString() };
    } else {
      checks.redis = { status: "not_configured", timestamp: new Date().toISOString() };
    }
  } catch (error) {
    checks.redis = { 
      status: "unhealthy", 
      error: (error as Error).message,
      timestamp: new Date().toISOString() 
    };
    overall = "degraded";
  }

  // Check API
  checks.api = { 
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  };

  return NextResponse.json({
    success: true,
    data: {
      overall,
      checks,
      timestamp: new Date().toISOString()
    }
  }, { status: overall === "healthy" ? 200 : 503 });
}
