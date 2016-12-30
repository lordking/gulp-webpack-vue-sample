'use strict';

const webpack = require('webpack');

module.exports = require('./webpack.base.config.js');
module.exports.devtool = '#eval-source-map';

module.exports.plugins = (module.exports.plugins || []).concat([

]);
