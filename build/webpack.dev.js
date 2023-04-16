const { merge } = require("webpack-merge");
const base = require("./webpack.base.js");

console.log('object', process.env.BUILD_ENV);
module.exports = merge(base, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    open: true,
    port: 9000,
    hot: true,
  },
  plugins: [
  ],
});
