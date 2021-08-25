const webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: './main.js',
  devtool: 'source-map',
  devServer: {
    static: __dirname,
  },
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
};