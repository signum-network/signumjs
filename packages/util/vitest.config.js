// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        coverage: {
            reporter: [['json', {file : "util-coverage.json"}]],
            include: ["src/**"],
        }
    }
})