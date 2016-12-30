'use strict';

const webpack = require('webpack');

module.exports = require('./webpack.base.config.js');
module.exports.devtool = '#source-map';

module.exports.plugins = (module.exports.plugins || []).concat([

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),

  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      warnings: false
    }
  }),

  new webpack.LoaderOptionsPlugin({
    minimize: true
  })
]);
