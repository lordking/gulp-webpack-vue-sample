'use strict';

const path = require('path');

module.exports = {
  src: path.resolve(__dirname, '**/*.jade'),
  dest: path.resolve(__dirname, '../dist')
}
