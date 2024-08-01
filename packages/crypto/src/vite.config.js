// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'sig$crypto',
        },
        rollupOptions: {
            // Make sure to externalize any dependencies here if needed
            external: [],
            output: {
                dir: 'dist',
                format: 'umd',
                name: "sig$crypto",
                sourcemap: true,
                // Modify the output file name as needed
                // Vite automatically adds `.min` for minified output in production
                minify: 'esbuild',
                entryFileNames: 'signumjs.crypto[min].js',
            },
        },
    },
});
