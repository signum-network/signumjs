const esbuildPluginTsc  = require('esbuild-plugin-tsc');
const esbuild = require('esbuild');

function createBuildSettings(options) {
    return {
        entryPoints: ['src/index.ts'],
        outfile: 'dist/bundle.js',

        bundle: true,
        plugins: [
            esbuildPluginTsc({
                force: true
            }),
        ],
        ...options
    };
}

const settings = createBuildSettings({ minify: true });

esbuild.build({
    ...settings,
    external: ["crypto"]
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
