module.exports = {
    input: "./src/index.ts",
    output: {
        moduleName: "sig$wallets",
        fileName: "signumjs.wallets[min].js",
        format: ["umd", "umd-min"],
        dir: "./dist"
    },
    extendRollupConfig: (conf) => {
        conf.inputConfig.preserveSymlinks = true;
        return conf
    },
    env: {
        NODE_ENV: "production"
    },
    plugins: {
        ['node-resolve']: {
            jsnext: true,
            preferBuiltins: true,
            browser: true
        },
        commonjs: {
            namedExports: {
                '@signumjs/util': [
                    'Amount',
                    'createDeeplink',
                    'FeeQuantPlanck'
                ]
            },
        },
    }
};
