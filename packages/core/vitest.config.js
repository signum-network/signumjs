// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        setupFiles: ['./vitest.setup.ts'],
        coverage: {
            reporter: [['json', {file : "core-coverage.json"}]],
            include: ["src/**"],
        }
    }
})
