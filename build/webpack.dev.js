const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");

console.log('object', process.env.BUILD_ENV);
module.exports = merge(common, {
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
