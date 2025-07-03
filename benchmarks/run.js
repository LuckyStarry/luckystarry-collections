const { performance } = require('perf_hooks');

// Simple benchmark function
function benchmark(name, fn, iterations = 10000) {
  // Warmup
  for (let i = 0; i < 1000; i++) {
    fn();
  }
  
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  
  const totalTime = end - start;
  const avgTime = totalTime / iterations;
  
  console.log(`${name}: ${totalTime.toFixed(2)}ms total, ${avgTime.toFixed(4)}ms avg (${iterations} iterations)`);
  return { totalTime, avgTime, iterations };
}

// Test data
const smallArray = Array.from({ length: 100 }, (_, i) => i);
const largeArray = Array.from({ length: 10000 }, (_, i) => i);

console.log('Performance Benchmarks');
console.log('===================');

// Array method benchmarks
console.log('\nArray Methods:');
benchmark('Native filter', () => {
  smallArray.filter(x => x % 2 === 0);
});

benchmark('Native map', () => {
  smallArray.map(x => x * 2);
});

benchmark('Native reduce', () => {
  smallArray.reduce((a, b) => a + b, 0);
});

console.log('\nLarge Array (10k elements):');
benchmark('Large filter', () => {
  largeArray.filter(x => x % 2 === 0);
}, 1000);

benchmark('Large map', () => {
  largeArray.map(x => x * 2);
}, 1000);

benchmark('Large reduce', () => {
  largeArray.reduce((a, b) => a + b, 0);
}, 1000);

console.log('\nMemory Usage:');
const memBefore = process.memoryUsage();
console.log(`Initial memory: ${(memBefore.heapUsed / 1024 / 1024).toFixed(2)}MB`);

// Stress test
const results = [];
for (let i = 0; i < 1000; i++) {
  results.push(largeArray.filter(x => x % 2 === 0));
}

const memAfter = process.memoryUsage();
console.log(`After operations: ${(memAfter.heapUsed / 1024 / 1024).toFixed(2)}MB`);
console.log(`Memory increase: ${((memAfter.heapUsed - memBefore.heapUsed) / 1024 / 1024).toFixed(2)}MB`);

console.log('\nBenchmark completed.');