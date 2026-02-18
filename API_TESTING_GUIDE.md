# API Testing, Benchmarking & Monitoring Guide

**Version**: 1.0  
**Date**: 2026-02-18  
**Status**: Production Ready

---

## Overview

This guide covers the comprehensive API testing infrastructure including:
1. Unit & Integration Testing
2. Performance Benchmarking
3. API Usage Analytics
4. OpenAPI/Swagger Documentation
5. Stability Verification

---

## 1. Testing Suite

### Running Tests

```bash
# Install dependencies (if not already installed)
npm install

# Run all tests
npm test

# Run tests in watch mode (during development)
npm run test:watch

# Run specific test file
npm test tests/api/health.test.ts
```

### Test Structure

```
tests/
├── utils/
│   └── testHelpers.ts          # Test utilities and helpers
├── api/
│   ├── health.test.ts          # System health endpoint tests
│   └── [endpoint].test.ts      # Other endpoint tests
└── benchmark/
    ├── APIBenchmark.ts         # Benchmarking utilities
    └── runBenchmarks.ts        # Benchmark runner
```

### Writing New Tests

```typescript
import { describe, it, expect } from 'vitest';
import { GET } from '@/app/api/your-endpoint/route';
import { createMockRequest, extractJSON } from '../utils/testHelpers';

describe('Your Endpoint', () => {
  it('should return expected data', async () => {
    const request = createMockRequest({
      url: 'http://localhost:3000/api/your-endpoint',
    });

    const response = await GET(request);
    const data = await extractJSON(response);

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('success', true);
  });
});
```

---

## 2. Performance Benchmarking

### Running Benchmarks

```bash
# Start the dev server first
npm run dev

# In another terminal, run benchmarks
npm run benchmark
```

### Benchmark Results

Results are saved to `benchmark-results.txt` with:
- Average response time
- Min/Max response times
- Success rate
- Iterations count

### Adding Endpoints to Benchmark

Edit `tests/benchmark/runBenchmarks.ts`:

```typescript
await benchmark.benchmarkEndpoint({
  name: '/api/your-endpoint',
  endpoint: '/api/your-endpoint',
  method: 'GET',
  iterations: 50,
  requestFn: async () => {
    return fetch(`${baseUrl}/api/your-endpoint`);
  },
});
```

---

## 3. API Usage Analytics

### Viewing Analytics Dashboard

```bash
# Requires admin authentication
curl -X GET "http://localhost:3000/api/analytics/dashboard?hours=24" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response Example**:
```json
{
  "success": true,
  "data": {
    "timeRange": {
      "hours": 24,
      "since": "2026-02-17T00:00:00.000Z"
    },
    "stats": {
      "totalRequests": 1000,
      "averageResponseTime": 45.23,
      "errorRate": 2.5,
      "requestsByMethod": {
        "GET": 800,
        "POST": 150,
        "PUT": 30,
        "DELETE": 20
      },
      "requestsByStatus": {
        "200": 950,
        "400": 20,
        "401": 15,
        "500": 15
      }
    },
    "recentRequests": [...]
  }
}
```

### Exporting Analytics Data

```bash
# Export as JSON
curl -X POST "http://localhost:3000/api/analytics/export" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"format": "JSON", "hours": 24}'

# Export as CSV
curl -X POST "http://localhost:3000/api/analytics/export" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"format": "CSV", "hours": 24}' \
  --output analytics-export.csv
```

---

## 4. OpenAPI/Swagger Documentation

### Accessing Documentation

1. **OpenAPI Spec Files**:
   - JSON: `http://localhost:3000/docs/openapi.json`
   - YAML: `http://localhost:3000/docs/openapi.yaml`

2. **Interactive Documentation**:
   - Visit: `http://localhost:3000/api-docs`
   - Browse all 364+ endpoints
   - View request/response schemas
   - Test endpoints directly (when using full Swagger UI)

### Updating OpenAPI Spec

Edit `docs/openapi.yaml` or `docs/openapi.json` to:
- Add new endpoints
- Update request/response schemas
- Add examples
- Update descriptions

---

## 5. API Stability Check

### Quick Stability Verification

```bash
# Check critical endpoints
node scripts/check-api-stability.js
```

**Output Example**:
```
🔍 API Stability Check
📍 Target: http://localhost:3000
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Testing System Health... ✅ OK
Testing Categories... ✅ OK
Testing Trending Videos... ✅ OK
Testing Feature Flags... ✅ OK

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Summary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: 4
✅ Passed: 4
❌ Failed: 0
Success Rate: 100.00%

✅ All checks passed!
```

### Customizing Stability Checks

Edit `scripts/check-api-stability.js` to add more endpoints:

```javascript
const endpoints = [
  { method: 'GET', path: '/api/your-endpoint', name: 'Your Endpoint', auth: false },
  // ... more endpoints
];
```

---

## 6. Continuous Integration

### CI/CD Pipeline Integration

```yaml
# Example GitHub Actions workflow
name: API Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: node scripts/check-api-stability.js
```

---

## 7. Performance Targets

### Response Time Goals

| Endpoint Type | Target (p95) | Status |
|--------------|--------------|--------|
| Health/Status | < 50ms | ✅ |
| Simple GET | < 100ms | ✅ |
| Complex Queries | < 200ms | ⚠️ Monitor |
| POST/PUT/DELETE | < 300ms | ⚠️ Monitor |
| Batch Operations | < 1000ms | ⚠️ Monitor |

### Success Rate Targets

- Critical endpoints: > 99.9%
- Standard endpoints: > 99.5%
- Experimental endpoints: > 95%

---

## 8. Troubleshooting

### Tests Failing

1. Check database connection
2. Ensure Redis is running (if required)
3. Verify environment variables
4. Check for port conflicts

### Benchmarks Showing Slow Performance

1. Check system resources (CPU, memory)
2. Review database indexes
3. Check for n+1 queries
4. Consider caching strategies

### Analytics Not Tracking

1. Verify analytics middleware is active
2. Check memory limits
3. Review analytics collector configuration

---

## 9. Best Practices

### Testing

- Write tests for all new endpoints
- Test both success and error cases
- Mock external dependencies
- Keep tests fast and isolated

### Performance

- Monitor response times regularly
- Set up alerts for degraded performance
- Optimize slow endpoints proactively
- Use caching where appropriate

### Documentation

- Update OpenAPI spec when adding endpoints
- Include request/response examples
- Document error codes
- Keep changelog updated

---

## 10. Quick Reference

```bash
# Testing
npm test                          # Run all tests
npm run test:watch                # Watch mode

# Benchmarking
npm run benchmark                 # Run performance benchmarks

# Stability Check
npm run check:api                 # Check API stability

# Analytics (requires auth)
GET  /api/analytics/dashboard     # View analytics
POST /api/analytics/export        # Export data

# Documentation
/api-docs                         # Swagger UI
/docs/openapi.json                # OpenAPI spec
```

---

## Support

For issues or questions:
1. Check this guide
2. Review existing tests for examples
3. Check OpenAPI documentation
4. Review benchmark results for performance issues

---

**Last Updated**: 2026-02-18  
**Maintained By**: Platform Team  
**Version**: 1.0
