/**
 * API Analytics Export Route
 * POST /api/analytics/export - Export analytics data
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { analyticsCollector } from '@/lib/analytics/apiAnalytics';

function isAdmin(session: any): boolean {
  return session?.user?.role === 'ADMIN';
}

export async function POST(req: NextRequest) {
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

    const body = await req.json();
    const { format = 'JSON', hours = 24 } = body;

    const since = new Date(Date.now() - hours * 60 * 60 * 1000);
    const data = analyticsCollector.export();

    if (format === 'CSV') {
      // Convert to CSV
      const analytics = analyticsCollector.getAnalytics({ since });
      let csv = 'Endpoint,Method,StatusCode,Duration,Timestamp,Error\n';

      analytics.forEach((a) => {
        csv += `"${a.endpoint}","${a.method}",${a.statusCode},${a.duration},"${a.timestamp.toISOString()}","${a.error || ''}"\n`;
      });

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="api-analytics-${Date.now()}.csv"`,
        },
      });
    }

    // JSON format
    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Analytics export error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
