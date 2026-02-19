/**
 * Monitoring Dashboard API - GET /api/monitoring/dashboard
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { runHealthCheck, checkPerformanceMetrics } from '@/lib/monitoring/alerts';

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

    const [healthCheck, performanceMetrics] = await Promise.all([
      runHealthCheck(),
      checkPerformanceMetrics(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        health: healthCheck,
        performance: performanceMetrics,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Monitoring dashboard error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve monitoring data', details: error.message },
      { status: 500 }
    );
  }
}
