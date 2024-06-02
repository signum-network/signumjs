module.exports = {
  input: "./src/index.ts",
  output: {
    moduleName: "sig$crypto",
    fileName: "signumjs.crypto[min].js",
    format: ["umd", "umd-min"],
    dir: "./dist"
  },
  env: {
    NODE_ENV: "production"
  },
  plugins: {
    commonjs: {
      namedExports: {
        'crypto': [
          'subtle',
          'getRandomValues'
        ],
        'pako': [
            'inflate',
            'gzip'
        ]
      }
    }
  }
};
