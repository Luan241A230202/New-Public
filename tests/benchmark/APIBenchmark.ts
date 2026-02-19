/**
 * Performance Benchmarking Utilities
 * Tools for measuring API endpoint performance
 */

import { PerformanceTimer } from '../utils/testHelpers';

export interface BenchmarkResult {
  endpoint: string;
  method: string;
  iterations: number;
  totalDuration: number;
  averageDuration: number;
  minDuration: number;
  maxDuration: number;
  successRate: number;
}

export class APIBenchmark {
  private results: BenchmarkResult[] = [];

  async benchmarkEndpoint(options: {
    name: string;
    endpoint: string;
    method: string;
    iterations?: number;
    requestFn: () => Promise<Response>;
  }): Promise<BenchmarkResult> {
    const { name, endpoint, method, iterations = 100, requestFn } = options;

    const durations: number[] = [];
    let successCount = 0;
    const timer = new PerformanceTimer();

    console.log(`\n🔧 Benchmarking: ${method} ${endpoint} (${iterations} iterations)`);

    for (let i = 0; i < iterations; i++) {
      timer.start();
      try {
        const response = await requestFn();
        timer.stop();

        if (response.ok || response.status < 500) {
          successCount++;
        }

        durations.push(timer.duration());
      } catch (error) {
        timer.stop();
        durations.push(timer.duration());
      }

      timer.reset();

      // Progress indicator
      if ((i + 1) % 10 === 0 || i === iterations - 1) {
        process.stdout.write(`\r  Progress: ${i + 1}/${iterations}`);
      }
    }

    const totalDuration = durations.reduce((sum, d) => sum + d, 0);
    const averageDuration = totalDuration / iterations;
    const minDuration = Math.min(...durations);
    const maxDuration = Math.max(...durations);
    const successRate = (successCount / iterations) * 100;

    const result: BenchmarkResult = {
      endpoint: name,
      method,
      iterations,
      totalDuration,
      averageDuration,
      minDuration,
      maxDuration,
      successRate,
    };

    this.results.push(result);

    console.log(`\n  ✓ Average: ${averageDuration.toFixed(2)}ms`);
    console.log(`  ✓ Min: ${minDuration.toFixed(2)}ms`);
    console.log(`  ✓ Max: ${maxDuration.toFixed(2)}ms`);
    console.log(`  ✓ Success Rate: ${successRate.toFixed(2)}%`);

    return result;
  }

  getResults(): BenchmarkResult[] {
    return this.results;
  }

  generateReport(): string {
    let report = '\n' + '='.repeat(80) + '\n';
    report += 'API PERFORMANCE BENCHMARK REPORT\n';
    report += '='.repeat(80) + '\n\n';

    if (this.results.length === 0) {
      report += 'No benchmark results available.\n';
      return report;
    }

    report += `Total Endpoints Tested: ${this.results.length}\n\n`;

    // Sort by average duration
    const sorted = [...this.results].sort(
      (a, b) => a.averageDuration - b.averageDuration
    );

    sorted.forEach((result, index) => {
      report += `${index + 1}. ${result.method} ${result.endpoint}\n`;
      report += `   Average: ${result.averageDuration.toFixed(2)}ms\n`;
      report += `   Min: ${result.minDuration.toFixed(2)}ms\n`;
      report += `   Max: ${result.maxDuration.toFixed(2)}ms\n`;
      report += `   Success Rate: ${result.successRate.toFixed(2)}%\n`;
      report += `   Iterations: ${result.iterations}\n\n`;
    });

    // Summary statistics
    const avgOfAvgs =
      sorted.reduce((sum, r) => sum + r.averageDuration, 0) / sorted.length;

    report += '='.repeat(80) + '\n';
    report += 'SUMMARY\n';
    report += '='.repeat(80) + '\n';
    report += `Average Response Time: ${avgOfAvgs.toFixed(2)}ms\n`;
    report += `Fastest Endpoint: ${sorted[0].endpoint} (${sorted[0].averageDuration.toFixed(2)}ms)\n`;
    report += `Slowest Endpoint: ${sorted[sorted.length - 1].endpoint} (${sorted[sorted.length - 1].averageDuration.toFixed(2)}ms)\n`;

    return report;
  }

  saveReportToFile(filename: string): void {
    const fs = require('fs');
    const report = this.generateReport();
    fs.writeFileSync(filename, report);
    console.log(`\n📊 Benchmark report saved to: ${filename}`);
  }
}
