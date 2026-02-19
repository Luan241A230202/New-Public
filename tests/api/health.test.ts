/**
 * API Tests: System Health Endpoints
 * Tests for /api/system/health and /api/system/metrics
 */

import { describe, it, expect } from 'vitest';
import { GET as healthGET } from '@/app/api/system/health/route';
import {
  createMockRequest,
  extractJSON,
  assertStatus,
  assertJSON,
} from '../utils/testHelpers';

describe('System Health API', () => {
  describe('GET /api/system/health', () => {
    it('should return healthy status', async () => {
      const request = createMockRequest({
        url: 'http://localhost:3000/api/system/health',
      });

      const response = await healthGET(request);

      assertStatus(response, 200);
      assertJSON(response);

      const data = await extractJSON(response);
      expect(data).toHaveProperty('success', true);
      expect(data).toHaveProperty('data');
      expect(data.data).toHaveProperty('overall');
      expect(['healthy', 'degraded', 'unhealthy']).toContain(
        data.data.overall
      );
    });

    it('should include health checks', async () => {
      const request = createMockRequest({
        url: 'http://localhost:3000/api/system/health',
      });

      const response = await healthGET(request);
      const data = await extractJSON(response);

      expect(data.data).toHaveProperty('checks');
      expect(data.data.checks).toHaveProperty('database');
      expect(data.data.checks).toHaveProperty('redis');
      expect(data.data.checks).toHaveProperty('api');
    });

    it('should include timestamp', async () => {
      const request = createMockRequest({
        url: 'http://localhost:3000/api/system/health',
      });

      const response = await healthGET(request);
      const data = await extractJSON(response);

      expect(data).toHaveProperty('timestamp');
      expect(new Date(data.timestamp).getTime()).toBeGreaterThan(0);
    });
  });
});
