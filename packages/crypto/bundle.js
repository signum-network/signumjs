const esbuildPluginTsc  = require('esbuild-plugin-tsc');
const esbuild = require('esbuild');

function createBuildSettings(options) {
    return {
        entryPoints: ['./src/web-bundle.ts'],
        outfile: './dist/signumjs.crypto.min.js',
        globalName: 'sig$crypto',
        external: ["crypto"],
        minify: true,
        sourcemap: true,
        platform: "browser",
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
}).catch( (reason) => {
    console.error("Bundling failed:", reason);
    process.exit(1)
});
