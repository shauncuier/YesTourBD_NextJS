import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Mirrors the `@/*` -> repo root mapping in tsconfig.json.
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    include: ['test/**/*.test.{ts,tsx,js,jsx}'],
    css: false,
    // The form tests type field by field through userEvent against jsdom, which is slow
    // enough to trip the 5s default on a loaded machine. The work is real, not a hang.
    testTimeout: 20_000,
  },
});
