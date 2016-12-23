'use strict';

const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const jade = require('gulp-jade');

/*===== 自动化编译的项目配置 =====*/

const SOURCE_PATH = './src/';
const DEST_PATH = './dist/';

const production_env = process.env.NODE_ENV == 'production' ? true : false;

/*===== 自动化编译的运行脚本 =====*/

gulp.task("default", ["jade", "webpack"]);
gulp.task("jade", buildWithJade);
gulp.task("webpack", buildWithWebpack);

if (!production_env) {
  console.log('Start development mode!');

  //监听jade
  let watchPath = [
    path.resolve(__dirname, SOURCE_PATH, '**/*.jade')
  ];
  gutil.log('[watch]', watchPath);

  let jadeWatcher = gulp.watch(watchPath, ["jade"]);
  jadeWatcher.on('change', function(event) {
    gutil.log('[watch]', 'File ' + event.path + ' was ' + event.type + ', running tasks...');
  });

  //监听webpack
  watchPath = [
    path.resolve(__dirname, SOURCE_PATH, '**/*.vue'),
    path.resolve(__dirname, SOURCE_PATH, '**/*.js')
  ];
  gutil.log('[watch]', watchPath);

  let webpackWatcher = gulp.watch(watchPath, ["webpack"]);
  webpackWatcher.on('change', function(event) {
    gutil.log('[watch]', 'File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
}

/*===== 自动化编译的函数定义 =====*/

//使用Bug编译网页
function buildWithJade(callback) {

  let configPath = path.resolve(__dirname, SOURCE_PATH, 'jade.config.js');
  let config = require(configPath);

  if (config.options) {
    config.options.pretty = !production_env
  } else {
    config.options = {
      pretty: !production_env
    }
  }

  gulp.src(config.src)
    .pipe(jade(config.options))
    .pipe(gulp.dest(config.dest));

  gutil.log('[jade]', 'build: ', config.src);

  return callback();
}

//使用webpack编译js、css、png
function buildWithWebpack(callback) {

  let configPath;
  if (production_env) {
    configPath = path.resolve(__dirname, SOURCE_PATH, 'webpack.prod.config.js');
  } else {
    configPath = path.resolve(__dirname, SOURCE_PATH, 'webpack.dev.config.js');
  }

  let config = require(configPath);
  webpack(config, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', config.entry);

    callback();
  });
}
