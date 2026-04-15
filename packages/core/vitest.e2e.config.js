// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        setupFiles: ['./vitest.setup.ts'],
        include: ['src/**/*.spec.e2e.ts'],
        testTimeout: 30000,
    }
})
