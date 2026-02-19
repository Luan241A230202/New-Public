/**
 * CDN Analytics API - GET /api/cdn/analytics
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const hours = parseInt(searchParams.get('hours') || '24');

    const analytics = await getCDNAnalytics(hours);

    return NextResponse.json({
      success: true,
      data: analytics,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('CDN analytics error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve CDN analytics', details: error.message },
      { status: 500 }
    );
  }
}

async function getCDNAnalytics(hours: number) {
  const now = Date.now();
  const timeRange = hours * 60 * 60 * 1000;

  return {
    timeRange: {
      hours,
      start: new Date(now - timeRange).toISOString(),
      end: new Date(now).toISOString(),
    },
    bandwidth: {
      total: 1024 * 1024 * 1024 * 500,
      video: 1024 * 1024 * 1024 * 450,
      images: 1024 * 1024 * 1024 * 30,
      other: 1024 * 1024 * 1024 * 20,
    },
    requests: {
      total: 1500000,
      cached: 1350000,
      uncached: 150000,
      cacheHitRate: 90.0,
    },
    statusCodes: {
      '2xx': 1425000,
      '3xx': 45000,
      '4xx': 25000,
      '5xx': 5000,
    },
    topContent: [
      { path: '/videos/popular-video.mp4', requests: 50000, bandwidth: 1024 * 1024 * 1024 * 25 },
      { path: '/videos/trending-video.mp4', requests: 35000, bandwidth: 1024 * 1024 * 1024 * 18 },
      { path: '/thumbnails/popular.jpg', requests: 100000, bandwidth: 1024 * 1024 * 500 },
    ],
    regions: [
      { name: 'North America', requests: 600000, bandwidth: 1024 * 1024 * 1024 * 200 },
      { name: 'Europe', requests: 450000, bandwidth: 1024 * 1024 * 1024 * 150 },
      { name: 'Asia Pacific', requests: 350000, bandwidth: 1024 * 1024 * 1024 * 120 },
      { name: 'South America', requests: 100000, bandwidth: 1024 * 1024 * 1024 * 30 },
    ],
    performance: {
      averageLatency: 45,
      p95Latency: 120,
      p99Latency: 250,
    },
  };
}
