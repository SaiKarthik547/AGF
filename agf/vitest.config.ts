import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    // Tests must never touch the real spreadsheet — env stubs are
    // automatically restored after every test.
    unstubEnvs: true,
    unstubGlobals: true,
  },
});
