const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.production.min.js",
    publicPath: "/"
  },
});