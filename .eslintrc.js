module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    // Performance-related rules
    'prefer-const': 'error',
    'no-var': 'error',
    'no-unused-vars': 'off',
    
    // Basic TypeScript rules
    'no-undef': 'off', // TypeScript handles this
    'no-console': 'warn'
  },
  env: {
    node: true,
    es6: true,
    jest: true
  },
  ignorePatterns: ['dist/', 'node_modules/', '*.js', '*.d.ts']
};