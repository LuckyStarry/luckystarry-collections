const resolve = require('@rollup/plugin-node-resolve').default;
const typescript = require('@rollup/plugin-typescript').default;
const terser = require('@rollup/plugin-terser').default;
const analyzer = require('rollup-plugin-analyzer');

const isProduction = process.env.NODE_ENV === 'production';

// Single optimized build for bundle size comparison
const config = {
  input: 'src/enumerable-only.ts', // Use the tree-shakeable version
  output: {
    file: 'dist/enumerable-optimized.js',
    format: 'umd',
    name: 'EnumerableOptimized',
    exports: 'named'
  },
  plugins: [
    resolve(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
      declarationMap: false,
      noEmitOnError: false // Continue despite warnings
    }),
    isProduction && terser({
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2
      },
      mangle: true,
      format: {
        comments: false
      }
    }),
    isProduction && analyzer({
      summaryOnly: true,
      limit: 10
    })
  ].filter(Boolean),
  external: [],
  // Suppress circular dependency warnings for now
  onwarn: (warning, warn) => {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    warn(warning);
  }
};

module.exports = config;