import { NextResponse } from 'next/server';
import { multiRegionManager } from '@/lib/regions/manager';

export async function GET() {
  try {
    const health = multiRegionManager.getHealthStatus();
    const regions = multiRegionManager.getRegions();
    
    return NextResponse.json({
      success: true,
      data: {
        overall: health,
        regions: regions.map(r => ({
          code: r.code,
          name: r.name,
          status: r.status,
          replication: r.replication
        }))
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to get regional health'
    }, { status: 500 });
  }
}
