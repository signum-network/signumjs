const esbuildPluginTsc  = require('esbuild-plugin-tsc');
const esbuild = require('esbuild');

function createBuildSettings(options) {
    return {
        entryPoints: ['./src/index.ts'],
        outfile: './dist/signumjs.util.min.js',
        globalName: 'sig$util',
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
}).catch( (reason) => {
    console.error("Bundling failed:", reason);
    process.exit(1)
});
