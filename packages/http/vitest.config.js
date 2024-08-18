// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        include: process.env.TEST_ENV === 'e2e' ? ['**/*.spec.e2e.ts'] : ['**/*.spec.ts'],
    }
})