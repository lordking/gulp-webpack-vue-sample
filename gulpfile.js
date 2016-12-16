var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var pug = require('gulp-pug');

/*===== 自动化编译的项目配置 =====*/

const SOURCE_PATH = './src/';
const DEST_PATH = './dist/';

var production_env = process.env.NODE_ENV == 'production' ? true : false;
var project_path = process.argv[2];
var project_name = project_path;

/*===== 自动化编译的运行脚本 =====*/

if (!project_path) {
  console.log('Not found', project_path);
  process.exit(0);
}

gulp.task(project_name, function(callback) {
  buildWithPug(function(){
    buildWithWebpack(callback);
  });
});

if (!production_env) {
  console.log('Start development mode!');

  var watchPath = [
    path.resolve(__dirname, SOURCE_PATH, project_path, '**/*.jade'),
    path.resolve(__dirname, SOURCE_PATH, project_path, '**/*.vue'),
    path.resolve(__dirname, SOURCE_PATH, project_path, '**/*.js')
  ];

  gutil.log('[watch]', 'path:\n', watchPath);

  var watcher = gulp.watch(watchPath, [project_name]);
  watcher.on('change', function(event) {
    gutil.log('[watch]', 'File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
}

/*===== 自动化编译的函数定义 =====*/

//使用Bug编译网页
function buildWithPug(callback) {

  var pugConfig = {
    src: path.resolve(__dirname, SOURCE_PATH, project_path, '**/*.jade'),
    options: {
      pretty: !production_env
    },
    dest: path.resolve(__dirname, DEST_PATH, project_path)
  }

  gulp.src(pugConfig.src)
    .pipe(pug(pugConfig.options))
    .pipe(gulp.dest(pugConfig.dest));

  gutil.log('[pug]', 'build: ' + pugConfig.src);

  return callback();
}

//使用webpack编译js、css、png
function buildWithWebpack(callback) {

  var webpackConfigPath = path.resolve(__dirname, SOURCE_PATH, project_path, 'webpack.config.js');
  var webpackConfig = require(webpackConfigPath);
  webpackConfig.entry = path.resolve(__dirname, SOURCE_PATH, project_path, webpackConfig.entry);
  webpackConfig.output.path = path.resolve(__dirname, DEST_PATH, project_path);

  webpack(webpackConfig, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', 'build: ' + webpackConfig.entry);

    callback();
  });
}
