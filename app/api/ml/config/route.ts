import { NextRequest, NextResponse } from 'next/server';
import { modelConfigManager } from '@/lib/ml/modelTrainer';
import { auth } from '@/auth';

export async function GET() {
  try {
    const config = modelConfigManager.getConfig();
    
    return NextResponse.json({
      success: true,
      data: config
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to get ML config'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({
        success: false,
        error: 'Admin access required'
      }, { status: 403 });
    }
    
    const body = await request.json();
    const updated = modelConfigManager.updateConfig(body);
    
    return NextResponse.json({
      success: true,
      data: updated,
      message: 'ML config updated'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to update ML config'
    }, { status: 400 });
  }
}
