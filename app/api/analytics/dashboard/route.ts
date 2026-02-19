/**
 * API Analytics Dashboard Route
 * GET /api/analytics/dashboard - View API usage statistics
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { analyticsCollector } from '@/lib/analytics/apiAnalytics';

function isAdmin(session: any): boolean {
  return session?.user?.role === 'ADMIN';
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!isAdmin(session)) {
      return NextResponse.json(
        { error: 'Forbidden - Admin only' },
        { status: 403 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get('endpoint') || undefined;
    const hours = parseInt(searchParams.get('hours') || '24');

    const since = new Date(Date.now() - hours * 60 * 60 * 1000);

    // Get analytics data
    const stats = analyticsCollector.getStats({ endpoint, since });
    const recentRequests = analyticsCollector.getAnalytics({
      endpoint,
      since,
      limit: 100,
    });

    return NextResponse.json({
      success: true,
      data: {
        timeRange: {
          hours,
          since: since.toISOString(),
        },
        stats,
        recentRequests: recentRequests.map((r) => ({
          endpoint: r.endpoint,
          method: r.method,
          statusCode: r.statusCode,
          duration: r.duration,
          timestamp: r.timestamp,
        })),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Analytics dashboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
