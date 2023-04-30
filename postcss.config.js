module.exports = {
  plugins: [
    [
      "postcss-preset-env",
      // 相关配置：https://www.npmjs.com/package/postcss-preset-env
      {
        browsers: ["last 2 versions", "> 1%", "not dead"],
      },
    ],
  ],
};
