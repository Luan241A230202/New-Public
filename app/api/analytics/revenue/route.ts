import { NextRequest, NextResponse } from 'next/server';
import { advancedAnalytics } from '@/lib/analytics/advanced';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({
        success: false,
        error: 'Admin access required'
      }, { status: 403 });
    }
    
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'monthly';
    
    const analytics = await advancedAnalytics.getRevenueAnalytics(period);
    
    return NextResponse.json({
      success: true,
      data: analytics,
      period
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to get revenue analytics'
    }, { status: 500 });
  }
}
