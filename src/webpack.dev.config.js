'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {

  entry: {
    app: path.resolve(__dirname, './app.js'),
    vender: ['vue']
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: './',
    filename: 'js/[name].js'
  },

  devtool: '#source-map',

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vender'
    })
  ],

  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
      loader: 'file-loader',
      options: {
        name: 'assets/[hash].[ext]'
      }
    }, {
      test: /\.(png|jpe?g|gif)(\?\S*)?$/,
      loader: 'file-loader',
      options: {
        name: 'assets/[name].[ext]?[hash]'
      }
    }]
  },
};
