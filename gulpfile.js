'use strict';

const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const jade = require('gulp-jade');
const webpack = require('webpack');


/*===== 自动化编译的项目配置 =====*/

const SOURCE_PATH = './src/';
const DEST_PATH = './dist/';

const production_env = process.env.NODE_ENV == 'production' ? true : false;

//监听jade
const jade_src = [
  path.resolve(__dirname, SOURCE_PATH, '**/*.jade')
];
const webpack_src = [
  path.resolve(__dirname, SOURCE_PATH, '**/*.vue'),
  path.resolve(__dirname, SOURCE_PATH, '**/*.js')
];

/*===== 自动化编译的运行脚本 =====*/

gulp.task("default", ["jade", "webpack"]);
gulp.task("jade", buildWithJade);
gulp.task("webpack", buildWithWebpack);

if (!production_env) {
  console.log('Start development mode!');


  gutil.log('[watch]', jade_src);

  let jadeWatcher = gulp.watch(jade_src, ["jade"]);
  jadeWatcher.on('change', function(event) {
    gutil.log('[watch]', 'File ' + event.path + ' was ' + event.type + ', running tasks...');
  });

  //监听webpack
  gutil.log('[watch]', webpack_src);

  let webpackWatcher = gulp.watch(webpack_src, ["webpack"]);
  webpackWatcher.on('change', function(event) {
    gutil.log('[watch]', 'File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
}

/*===== 自动化编译的函数定义 =====*/

//使用Bug编译网页
function buildWithJade() {

  gulp.src(jade_src)
    .pipe(jade({
      pretty: !production_env
    }))
    .pipe(gulp.dest(DEST_PATH));

  gutil.log('[jade]', 'build: ', jade_src);

}

//使用webpack编译js、css、png
function buildWithWebpack(callback) {

  let configPath;
  if (production_env) {
    configPath = path.resolve(__dirname, SOURCE_PATH, 'webpack.prod.config.js');
  } else {
    configPath = path.resolve(__dirname, SOURCE_PATH, 'webpack.dev.config.js');
  }

  const config = require(configPath);
  config.output.path = path.resolve(__dirname, DEST_PATH);
  webpack(config, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', 'build: ', config.entry);

    return callback();
  });
}
