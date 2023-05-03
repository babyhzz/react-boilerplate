const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const srcDir = path.resolve(__dirname, "../src");
const themeConfig = require(path.join(srcDir, "styles/theme"));

module.exports = {
  target: "web",
  entry: {
    app: "./src/index.tsx",
  },
  output: {
    clean: true,
    filename: "[name].[contenthash:5].js",
    chunkFilename: "[name].[contenthash:5].js",
    publicPath: "/",
    path: path.resolve(__dirname, "../dist"),
    // TODO: 路径问题
    assetModuleFilename: "images/[hash][ext][query]",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    alias: {
      "@": srcDir,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        // exclude: /node_modules/,
        include: srcDir,
        use: ["babel-loader"],
      },
      // node_modules导入的css处理解析器
      {
        test: /\.css$/i,
        include: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      // 自己的样式文件加载器
      {
        test: /\.(less|css)$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            // https://webpack.docschina.org/loaders/css-loader/#root
            loader: "css-loader",
            options: {
              modules: {
                mode: (resourcePath) => {
                  if (/global.less$/i.test(resourcePath)) {
                    return "global";
                  }
                  return "local";
                },
                localIdentContext: path.resolve(__dirname, "src"),
                // name: 文件名，local：class名
                localIdentName: "[name]__[local]__[hash:base64:5]",
              },
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
      // webpack通过内置asset处理资源类型，不需要url-loader和file-loader
      // webpack5: https://webpack.docschina.org/guides/asset-modules/
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    // 多入口需要多个 HtmlWebpackPlugin
    new HtmlWebpackPlugin({
      title: "Production",
      filename: "index.html",
      template: path.join(__dirname, "../public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:5].css",
    }),
    new webpack.ProvidePlugin({
      // 添加变量和模块的对应关系，避免每次导入模块
      // "$": "jquery"
    }),
    // 忽略moment多语言
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new ESLintPlugin({
      files: "src",
    }),
  ],
};
