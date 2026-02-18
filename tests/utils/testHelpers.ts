/**
 * Test Helpers for API Testing
 * Provides utilities for mocking, request simulation, and assertions
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * Create a mock NextRequest for testing API routes
 */
export function createMockRequest(options: {
  method?: string;
  url?: string;
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}): NextRequest {
  const {
    method = 'GET',
    url = 'http://localhost:3000/api/test',
    body,
    headers = {},
  } = options;

  const requestInit: RequestInit = {
    method,
    headers: new Headers(headers),
  };

  if (body && method !== 'GET' && method !== 'HEAD') {
    requestInit.body = JSON.stringify(body);
    if (!headers['content-type']) {
      (requestInit.headers as Headers).set('content-type', 'application/json');
    }
  }

  return new NextRequest(url, requestInit);
}

/**
 * Extract JSON from NextResponse
 */
export async function extractJSON(response: NextResponse): Promise<any> {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/**
 * Assert response status
 */
export function assertStatus(response: NextResponse, expectedStatus: number) {
  if (response.status !== expectedStatus) {
    throw new Error(
      `Expected status ${expectedStatus}, got ${response.status}`
    );
  }
}

/**
 * Assert response has JSON content-type
 */
export function assertJSON(response: NextResponse) {
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error(`Expected JSON response, got ${contentType}`);
  }
}

/**
 * Performance timer for benchmarking
 */
export class PerformanceTimer {
  private startTime: number = 0;
  private endTime: number = 0;

  start() {
    this.startTime = performance.now();
  }

  stop() {
    this.endTime = performance.now();
  }

  duration(): number {
    return this.endTime - this.startTime;
  }

  reset() {
    this.startTime = 0;
    this.endTime = 0;
  }
}
