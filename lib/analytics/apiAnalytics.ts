/**
 * API Analytics Middleware
 * Tracks API usage, response times, and errors
 */

import { NextRequest, NextResponse } from 'next/server';

export interface APIAnalytics {
  endpoint: string;
  method: string;
  statusCode: number;
  duration: number;
  timestamp: Date;
  userId?: string;
  error?: string;
}

class APIAnalyticsCollector {
  private analytics: APIAnalytics[] = [];
  private maxEntries = 10000; // Keep last 10k entries in memory

  track(data: APIAnalytics) {
    this.analytics.push(data);

    // Keep only recent entries
    if (this.analytics.length > this.maxEntries) {
      this.analytics = this.analytics.slice(-this.maxEntries);
    }
  }

  getAnalytics(options?: {
    endpoint?: string;
    method?: string;
    since?: Date;
    limit?: number;
  }): APIAnalytics[] {
    let filtered = [...this.analytics];

    if (options?.endpoint) {
      filtered = filtered.filter((a) => a.endpoint === options.endpoint);
    }

    if (options?.method) {
      filtered = filtered.filter((a) => a.method === options.method);
    }

    if (options?.since) {
      filtered = filtered.filter((a) => a.timestamp >= options.since!);
    }

    if (options?.limit) {
      filtered = filtered.slice(-options.limit);
    }

    return filtered;
  }

  getStats(options?: { endpoint?: string; since?: Date }) {
    const analytics = this.getAnalytics(options);

    if (analytics.length === 0) {
      return {
        totalRequests: 0,
        averageResponseTime: 0,
        errorRate: 0,
        requestsByMethod: {},
        requestsByStatus: {},
      };
    }

    const totalRequests = analytics.length;
    const totalDuration = analytics.reduce((sum, a) => sum + a.duration, 0);
    const averageResponseTime = totalDuration / totalRequests;

    const errors = analytics.filter((a) => a.statusCode >= 400).length;
    const errorRate = (errors / totalRequests) * 100;

    // Group by method
    const requestsByMethod: Record<string, number> = {};
    analytics.forEach((a) => {
      requestsByMethod[a.method] = (requestsByMethod[a.method] || 0) + 1;
    });

    // Group by status code
    const requestsByStatus: Record<number, number> = {};
    analytics.forEach((a) => {
      requestsByStatus[a.statusCode] =
        (requestsByStatus[a.statusCode] || 0) + 1;
    });

    return {
      totalRequests,
      averageResponseTime: parseFloat(averageResponseTime.toFixed(2)),
      errorRate: parseFloat(errorRate.toFixed(2)),
      requestsByMethod,
      requestsByStatus,
    };
  }

  clear() {
    this.analytics = [];
  }

  export() {
    return {
      timestamp: new Date(),
      totalEntries: this.analytics.length,
      analytics: this.analytics,
      stats: this.getStats(),
    };
  }
}

// Global singleton
export const analyticsCollector = new APIAnalyticsCollector();

/**
 * Middleware wrapper to track API analytics
 */
export function withAnalytics(
  handler: (req: NextRequest) => Promise<NextResponse>,
  endpoint: string
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const startTime = performance.now();

    try {
      const response = await handler(req);
      const duration = performance.now() - startTime;

      analyticsCollector.track({
        endpoint,
        method: req.method,
        statusCode: response.status,
        duration,
        timestamp: new Date(),
      });

      return response;
    } catch (error) {
      const duration = performance.now() - startTime;

      analyticsCollector.track({
        endpoint,
        method: req.method,
        statusCode: 500,
        duration,
        timestamp: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      throw error;
    }
  };
}
