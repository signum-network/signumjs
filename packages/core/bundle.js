const esbuildPluginTsc  = require('esbuild-plugin-tsc');
const esbuild = require('esbuild');

function createBuildSettings(options) {
    return {
        entryPoints: ['./src/web-bundle.ts'],
        outfile: './dist/signumjs.min.js',
        globalName: 'sig$',
        minify: true,
        sourcemap: true,
        format: 'iife',
        bundle: true,
        plugins: [
            esbuildPluginTsc({
                force: true
            }),
        ],
        ...options
    };
}

const settings = createBuildSettings();

esbuild.build({
    ...settings,
    external: ["crypto"]
}).catch( (reason) => {
    console.error("Bundling failed:", reason);
    process.exit(1)
});
