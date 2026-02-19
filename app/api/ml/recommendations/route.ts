import { NextRequest, NextResponse } from 'next/server';
import { recommendationEngine } from '@/lib/ml/recommendationEngine';
import { z } from 'zod';

const querySchema = z.object({
  userId: z.string().optional(),
  videoId: z.string().optional(),
  type: z.enum(['personalized', 'trending', 'similar', 'collaborative']).default('personalized'),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 10)
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = querySchema.parse({
      userId: searchParams.get('userId') || undefined,
      videoId: searchParams.get('videoId') || undefined,
      type: searchParams.get('type') || 'personalized',
      limit: searchParams.get('limit') || undefined
    });
    
    const recommendations = await recommendationEngine.getRecommendations({
      userId: params.userId,
      videoId: params.videoId,
      type: params.type,
      limit: params.limit
    });
    
    return NextResponse.json({
      success: true,
      data: recommendations,
      count: recommendations.length
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get recommendations'
    }, { status: 400 });
  }
}
