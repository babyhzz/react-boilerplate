const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");

const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
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
      // cacheGroups: {
      //   vendor: {
      //     test: /[\\/]node_modules[\\/]/,
      //     name: "vendors",
      //     chunks: "all",
      //   },
      // },
    },
  },
  plugins: [
  ],
});
