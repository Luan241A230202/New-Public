import { NextRequest, NextResponse } from 'next/server';
import { advancedAnalytics } from '@/lib/analytics/advanced';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('videoId');
    
    if (!videoId) {
      return NextResponse.json({
        success: false,
        error: 'videoId required'
      }, { status: 400 });
    }
    
    const analytics = await advancedAnalytics.getVideoAnalytics(videoId);
    
    return NextResponse.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to get video analytics'
    }, { status: 500 });
  }
}
