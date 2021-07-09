const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
    clean: true,
    assetModuleFilename: "img/[name][ext]",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new ESLintPlugin(),
  ],
  module: {
    rules: [
      {
        // JavaScript files
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env"] },
          },
        ],
      },
      {
        // Stylus files
        test: /\.styl/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              esModule: false,
            },
          },
          "postcss-loader",
          "stylus-loader",
        ],
      },
      {
        // Image files
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};
