const esbuildPluginTsc  = require('esbuild-plugin-tsc');
const esbuild = require('esbuild');

function createBuildSettings(options) {
    return {
        entryPoints: ['./src/index.ts'],
        outfile: './dist/signumjs.crypto.min.js',
        globalName: 'sig$crypto',
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
// esbuild.build({
//     entryPoints: ['./src/index.ts'], // Adjust as per your project structure
//     bundle: true,
//     outfile: './dist/signumjs.crypto[min].js',
//     format: 'umd',
//     minify: true,
//     sourcemap: true,
//     external: [], // List any external dependencies here
//     plugins: [
//         {
//             name: 'commonjs-plugin',
//             setup(build) {
//                 build.onResolve({ filter: /@rollup\/plugin-commonjs$/ }, args => {
//                     return { path: require.resolve('@rollup/plugin-commonjs'), external: true };
//                 });
//             }
//         }
//     ]
// }).catch(() => process.exit(1));
