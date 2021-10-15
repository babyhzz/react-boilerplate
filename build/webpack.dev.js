const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    open: true,
    port: 9000,
    hot: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      // 添加DEV环境变量
      // ENV: JSON.stringify("Production"),
    })
  ],
});
