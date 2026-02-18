#!/usr/bin/env node
/**
 * API Stability Checker
 * Tests critical API endpoints to verify they're working
 */

const baseUrl = process.env.API_URL || 'http://localhost:3000';

const endpoints = [
  { method: 'GET', path: '/api/system/health', name: 'System Health', auth: false },
  { method: 'GET', path: '/api/categories', name: 'Categories', auth: false },
  { method: 'GET', path: '/api/trending', name: 'Trending Videos', auth: false },
  { method: 'GET', path: '/api/features/list', name: 'Feature Flags', auth: false },
];

async function checkEndpoint(endpoint) {
  try {
    const response = await fetch(`${baseUrl}${endpoint.path}`, {
      method: endpoint.method,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const isOk = response.ok || response.status < 500;
    
    return {
      name: endpoint.name,
      path: endpoint.path,
      status: response.status,
      ok: isOk,
      message: isOk ? '✅ OK' : `❌ FAILED (${response.status})`,
    };
  } catch (error) {
    return {
      name: endpoint.name,
      path: endpoint.path,
      status: 0,
      ok: false,
      message: `❌ ERROR: ${error.message}`,
    };
  }
}

async function runStabilityCheck() {
  console.log('🔍 API Stability Check');
  console.log(`📍 Target: ${baseUrl}`);
  console.log('━'.repeat(60));

  const results = [];

  for (const endpoint of endpoints) {
    process.stdout.write(`\nTesting ${endpoint.name}...`);
    const result = await checkEndpoint(endpoint);
    results.push(result);
    console.log(` ${result.message}`);
  }

  console.log('\n' + '━'.repeat(60));
  console.log('📊 Summary');
  console.log('━'.repeat(60));

  const passed = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok).length;
  const total = results.length;

  console.log(`Total: ${total}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`Success Rate: ${((passed / total) * 100).toFixed(2)}%`);

  if (failed > 0) {
    console.log('\n⚠️  Failed endpoints:');
    results.filter((r) => !r.ok).forEach((r) => {
      console.log(`  - ${r.name} (${r.path}): ${r.message}`);
    });
  }

  console.log('\n' + (failed === 0 ? '✅ All checks passed!' : '⚠️  Some checks failed'));

  // Exit with error if any failed
  process.exit(failed > 0 ? 1 : 0);
}

runStabilityCheck().catch((error) => {
  console.error('❌ Stability check failed:', error);
  process.exit(1);
});
