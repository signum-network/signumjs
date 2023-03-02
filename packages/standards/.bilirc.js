module.exports = {
  input: "./src/index.ts",
  output: {
    moduleName: "sig$standards",
    fileName: "signumjs.standards[min].js",
    format: ["umd", "umd-min"],
    dir: "./dist"
  },
  env: {
    NODE_ENV: "production"
  },
  plugins: {
    ['node-resolve'] : {
      jsnext: true,
      preferBuiltins: true,
      browser:true
    },
    commonjs: {
      namedExports: {
        'ajv': [
          'ucs2length',
          'equal',
        ]
      }
    }
  }
};
