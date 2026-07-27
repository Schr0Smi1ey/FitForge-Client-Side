/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  // @vitejs/plugin-react injects the react-refresh HMR preamble, which has no
  // meaning in a test run and fails to resolve ("file:///@react-refresh").
  // Vitest sets mode to "test"; esbuild below still transforms JSX there.
  plugins: mode === 'test' ? [] : [react()],
  esbuild: { jsx: 'automatic' },
  test: {
    // Component tests need a DOM; the default node environment has no document.
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    // Without this, Vitest would also try to pick up the server repo's Jest specs.
    include: ['src/**/*.{test,spec}.{js,jsx}'],
  },
}))
