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

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vender'
    })
  ],

  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
         loaders: {
           'scss': 'vue-style-loader!css-loader!sass-loader',
           'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
         }
       }
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
      test: /\.(png|jpg|gif)(\?\S*)?$/,
      loader: 'file-loader',
      options: {
        name: 'assets/[name].[ext]?[hash]'
      }
    }]
  },
};
