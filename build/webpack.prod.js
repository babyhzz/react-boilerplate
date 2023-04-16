const { merge } = require("webpack-merge");
const base = require("./webpack.base.js");

const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(base, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
    usedExports: true,
    runtimeChunk: "single",
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // 第三方模块
        vendor: {
          name: "vendor",
          test: /node_modules/,
          priority: 1,
          minSize: 0, // 按照需求进行调整
          minChunks: 1
        },
        // 公共模块
        common: {
          name: 'common',
          priority: 0,
          minSize: 0, // 按照需求进行调整，太小不进行打包
          minChunks: 2
        }
      },
    },
  },
  plugins: [
  ],
});
