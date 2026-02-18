/**
 * Benchmark Runner Script
 * Run performance benchmarks on critical API endpoints
 */

import { APIBenchmark } from './APIBenchmark';

async function runBenchmarks() {
  const benchmark = new APIBenchmark();
  const baseUrl = process.env.BENCHMARK_URL || 'http://localhost:3000';

  console.log('🚀 Starting API Performance Benchmarks');
  console.log(`📍 Target: ${baseUrl}`);
  console.log('⏱️  This may take a few minutes...\n');

  try {
    // Benchmark: Health endpoint (Public)
    await benchmark.benchmarkEndpoint({
      name: '/api/system/health',
      endpoint: '/api/system/health',
      method: 'GET',
      iterations: 50,
      requestFn: async () => {
        return fetch(`${baseUrl}/api/system/health`);
      },
    });

    // Benchmark: Categories (Public)
    await benchmark.benchmarkEndpoint({
      name: '/api/categories',
      endpoint: '/api/categories',
      method: 'GET',
      iterations: 50,
      requestFn: async () => {
        return fetch(`${baseUrl}/api/categories`);
      },
    });

    // Benchmark: Trending videos (Public)
    await benchmark.benchmarkEndpoint({
      name: '/api/trending',
      endpoint: '/api/trending',
      method: 'GET',
      iterations: 50,
      requestFn: async () => {
        return fetch(`${baseUrl}/api/trending`);
      },
    });

    // Print and save report
    console.log(benchmark.generateReport());
    benchmark.saveReportToFile('benchmark-results.txt');

    console.log('\n✅ Benchmarks completed successfully!');
  } catch (error) {
    console.error('\n❌ Benchmark failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runBenchmarks();
}

export { runBenchmarks };
