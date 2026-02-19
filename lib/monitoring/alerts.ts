/**
 * Monitoring and Alerting Configuration
 */

export interface MonitoringConfig {
  healthCheck: {
    enabled: boolean;
    interval: number;
    timeout: number;
    endpoints: string[];
  };
  performance: {
    responseTimeThreshold: number;
    errorRateThreshold: number;
    cpuThreshold: number;
    memoryThreshold: number;
  };
  alerts: {
    enabled: boolean;
    channels: AlertChannel[];
  };
}

export interface AlertChannel {
  type: 'email' | 'slack' | 'webhook';
  config: Record<string, any>;
}

export const monitoringConfig: MonitoringConfig = {
  healthCheck: {
    enabled: true,
    interval: 60000,
    timeout: 5000,
    endpoints: [
      '/api/system/health',
      '/api/categories',
      '/api/trending',
    ],
  },
  performance: {
    responseTimeThreshold: 1000,
    errorRateThreshold: 5,
    cpuThreshold: 80,
    memoryThreshold: 85,
  },
  alerts: {
    enabled: true,
    channels: [
      {
        type: 'email',
        config: {
          to: process.env.ALERT_EMAIL || 'admin@example.com',
          from: 'monitoring@example.com',
        },
      },
    ],
  },
};

export async function runHealthCheck(): Promise<any> {
  const results = await Promise.all(
    monitoringConfig.healthCheck.endpoints.map(async (endpoint) => {
      const start = Date.now();
      try {
        const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}${endpoint}`, {
          signal: AbortSignal.timeout(monitoringConfig.healthCheck.timeout),
        });

        const duration = Date.now() - start;

        return {
          endpoint,
          status: response.ok ? 'healthy' : 'unhealthy',
          responseTime: duration,
          statusCode: response.status,
        };
      } catch (error) {
        return {
          endpoint,
          status: 'unhealthy',
          responseTime: Date.now() - start,
          statusCode: 0,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    })
  );

  const healthyCount = results.filter((r) => r.status === 'healthy').length;
  const overallStatus = healthyCount === results.length ? 'healthy' : healthyCount > 0 ? 'degraded' : 'unhealthy';

  return {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    checks: results,
  };
}

export async function checkPerformanceMetrics(): Promise<any> {
  const metrics = {
    cpu: process.cpuUsage(),
    memory: process.memoryUsage(),
    uptime: process.uptime(),
  };

  const memoryUsagePercent = (metrics.memory.heapUsed / metrics.memory.heapTotal) * 100;

  return {
    cpu: metrics.cpu,
    memory: {
      heapUsed: metrics.memory.heapUsed,
      heapTotal: metrics.memory.heapTotal,
      external: metrics.memory.external,
      usagePercent: memoryUsagePercent,
    },
    uptime: metrics.uptime,
    timestamp: new Date().toISOString(),
  };
}

export async function sendAlert(alert: any): Promise<void> {
  console.log('Alert:', alert);
}
