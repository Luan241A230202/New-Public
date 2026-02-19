import { NextRequest, NextResponse } from 'next/server';
import { multiRegionManager } from '@/lib/regions/manager';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const regions = multiRegionManager.getRegions();
    
    return NextResponse.json({
      success: true,
      data: regions,
      count: regions.length
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to get regions'
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
    const { code, ...updates } = body;
    
    if (!code) {
      return NextResponse.json({
        success: false,
        error: 'Region code required'
      }, { status: 400 });
    }
    
    const updated = multiRegionManager.updateRegion(code, updates);
    
    if (!updated) {
      return NextResponse.json({
        success: false,
        error: 'Region not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: updated,
      message: 'Region updated'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to update region'
    }, { status: 400 });
  }
}
