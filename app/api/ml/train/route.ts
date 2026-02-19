import { NextRequest, NextResponse } from 'next/server';
import { modelTrainer } from '@/lib/ml/modelTrainer';
import { auth } from '@/lib/auth';
import { z } from 'zod';

const trainSchema = z.object({
  modelType: z.enum(['collaborative', 'content', 'trending', 'hybrid']),
  dataRange: z.string().default('30d')
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({
        success: false,
        error: 'Admin access required'
      }, { status: 403 });
    }
    
    const body = await request.json();
    const { modelType, dataRange } = trainSchema.parse(body);
    
    const job = await modelTrainer.trainModel(modelType, dataRange);
    
    return NextResponse.json({
      success: true,
      data: job,
      message: 'Model training started'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Training failed'
    }, { status: 400 });
  }
}

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
    const jobId = searchParams.get('jobId');
    
    if (jobId) {
      const job = modelTrainer.getJobStatus(jobId);
      return NextResponse.json({
        success: true,
        data: job
      });
    }
    
    return NextResponse.json({
      success: false,
      error: 'jobId required'
    }, { status: 400 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get job status'
    }, { status: 400 });
  }
}
