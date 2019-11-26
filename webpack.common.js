const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const {
  REACT_APP_ENDPOINT,
  REACT_APP_API,
  REACT_APP_LOGIN,
  REACT_APP_FEED,
  REACT_APP_THEMES,
  REACT_APP_REVIEWS,
} = require("./config/index");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"],
      },
      {
        test: [/\.css$/, /\.scss$/],
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: "postcss.config.js"
              },
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: "./src/index.html"
    }),
    new webpack.DefinePlugin({
      REACT_APP_ENDPOINT,
      REACT_APP_API,
      REACT_APP_LOGIN,
      REACT_APP_FEED,
      REACT_APP_THEMES,
      REACT_APP_REVIEWS,
    })
  ],
};