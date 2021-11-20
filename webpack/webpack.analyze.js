const { merge } = require("webpack-merge");
const prodConfig = require("./webpack.prod.js");

// https://github.com/webpack-contrib/webpack-bundle-analyzer
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(prodConfig, {
  plugins: [new BundleAnalyzerPlugin()],
})