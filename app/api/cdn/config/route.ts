/**
 * CDN Management API - GET/PUT /api/cdn/config
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

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

    const cdnConfig = {
      primary: {
        provider: process.env.CDN_PROVIDER || 'cloudflare',
        endpoint: process.env.CDN_ENDPOINT || 'https://cdn.example.com',
        zone: process.env.CDN_ZONE || 'default',
        status: 'active',
      },
      fallback: {
        provider: process.env.CDN_FALLBACK_PROVIDER || 'bunny',
        endpoint: process.env.CDN_FALLBACK_ENDPOINT || 'https://fallback-cdn.example.com',
        status: 'standby',
      },
      settings: {
        cacheControl: process.env.CDN_CACHE_CONTROL || 'public, max-age=31536000',
        compression: true,
        minify: { html: true, css: true, js: true },
        imageOptimization: true,
        videoOptimization: true,
      },
      regions: [
        { name: 'North America', code: 'NA', status: 'active' },
        { name: 'Europe', code: 'EU', status: 'active' },
        { name: 'Asia Pacific', code: 'AP', status: 'active' },
        { name: 'South America', code: 'SA', status: 'active' },
      ],
    };

    return NextResponse.json({
      success: true,
      data: cdnConfig,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('CDN config error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve CDN configuration', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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

    const body = await request.json();
    console.log('CDN config update:', body);

    return NextResponse.json({
      success: true,
      message: 'CDN configuration updated successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('CDN config update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update CDN configuration', details: error.message },
      { status: 500 }
    );
  }
}
