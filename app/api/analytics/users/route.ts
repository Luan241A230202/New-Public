import { NextRequest, NextResponse } from 'next/server';
import { advancedAnalytics } from '@/lib/analytics/advanced';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30d';
    
    const analytics = await advancedAnalytics.getUserAnalytics(period);
    
    return NextResponse.json({
      success: true,
      data: analytics,
      period
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to get user analytics'
    }, { status: 500 });
  }
}
