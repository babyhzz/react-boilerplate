const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const srcDir = path.resolve(__dirname, "../src");
const themeVars = require(path.join(srcDir, "styles/themeVars"));

module.exports = {
  target: "web",
  entry: {
    app: "./src/index.js",
  },
  output: {
    clean: true,
    filename: "[name].[contenthash:5].js",
    // chunkFilename: "[id].[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
    // TODO: 路径问题
    assetModuleFilename: "images/[hash][ext][query]",
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
    alias: {
      "@": srcDir,
    },
  },
  plugins: [
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
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      // CSS文件默认都不做模块化，仅对less文件生效
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/i,
        // antd less 变量支持覆盖
        include: /node_modules\/antd/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                modifyVars: themeVars,
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.less$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
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
      {
        test: /\.svg$/i,
        type: "asset/inline",
      },
      // webpack5: https://webpack.docschina.org/guides/asset-modules/
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)/i,
        type: "asset/resource",
      },
    ],
  },
};
