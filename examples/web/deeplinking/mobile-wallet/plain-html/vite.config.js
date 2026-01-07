import {defineConfig} from 'vite'

export default defineConfig({
    server: {
        host: true, // Listen on all addresses (0.0.0.0)
        allowedHosts: ['.ngrok-free.app']
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
    },
})
