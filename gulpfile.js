'use strict';

const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const jade = require('gulp-jade');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const exec = require('child_process').exec;

/*===== 自动化编译的项目配置 =====*/

var global_setting = {
  src_path: './src/',
  dest_path: './dist/',
  jade: {
    src: path.resolve(__dirname, './src/**/*.jade')
  },
  webpack: {
    server_host: '0.0.0.0',
    server_port: 8181,
    dev_config_file: 'webpack.dev.config.js',
    prod_config_file: 'webpack.prod.config.js'
  }
};


//缺省任务，警告必须输入命令
gulp.task('default', function(callback) {
  gutil.log('Error:', 'Please input some commands for example that is `gulp dev` or `gulp prod`.');
});

//运行开发环境
gulp.task('dev', ['dev:setting', 'dev:jade', 'dev:server'], function() {
  console.log("All done!")
});

//生产环境输出
gulp.task('prod', ['prod:setting', 'prod:jade', 'prod:webpack'], function() {
  console.log("All done!")
});

//生产环境输出
gulp.task('prod:run', ['prod:setting', 'prod:jade', 'prod:server'], function() {
  console.log("All done!")
});

//开发环境设置
gulp.task('dev:setting', function(callback) {
  console.log('Start development mode!');

  return callback();
});

//生产环境设置
gulp.task('prod:setting', function(callback) {
  console.log('Start production mode!');

  return callback();
});

//使用jade编译网页
gulp.task('prod:jade', function(callback) {

  var stream = gulp.src(global_setting.jade.src)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(global_setting.dest_path));

  gutil.log('[jade]', 'build: ', global_setting.jade.src);

  return callback();
});

//开发环境下，使用gulp监视源文件，自动编译输出
gulp.task('dev:jade', ['prod:jade'], function(callback) {
  if (!global_setting.production_env) {
    var wather = gulp.watch(global_setting.jade.src, ['prod:jade']);
    wather.on('change', function(event) {
      gutil.log('[watch]', 'File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    gutil.log('[watch]', global_setting.jade.src);
  }
});

//开发环境下，启动测试服务器，使用webpack监视源文件，并自动编译输出
gulp.task('dev:server', function(callback) {

  var configFilePath = path.resolve(__dirname, global_setting.src_path, global_setting.webpack.dev_config_file);
  var config = require(configFilePath);

  if (Object.prototype.toString.call(config.entry.app) === '[object String]') {
    config.entry.app = [config.entry.app];
  }

  config.entry.app.unshift(
    "webpack-dev-server/client?http://127.0.0.1:" + global_setting.webpack.server_port,
    "webpack/hot/dev-server");

  config.devServer = {
    historyApiFallback: true,
    noInfo: true
  };

  config.performance = {
    hints: false
  };

  var compiler = webpack(config);

  var server = new WebpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    inline: true,
    hot: true,
    stats: {
      colors: true
    },
    contentBase: global_setting.dest_path
  });

  server.listen(global_setting.webpack.server_port, global_setting.webpack.server_host, function(err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    var msg = 'http://' + global_setting.webpack.server_host + ':' + global_setting.webpack.server_port + '/webpack-dev-server/';
    gutil.log('[webpack-dev-server]', msg);
  });
});

//生产环境下，使用gulp编译压缩所有的文件
gulp.task('prod:webpack', function(callback) {

  var configFilePath = path.resolve(__dirname, global_setting.src_path, global_setting.webpack.prod_config_file);
  var config = require(configFilePath);

  webpack(config, function(err, stats) {
    if (err) {
      gutil.log('[webpack]', 'error:', err);
    } else {
      gutil.log('[webpack]', 'build: ', config.entry);
    }

    callback();
  });

});

gulp.task('prod:server', function(callback) {

  var configFilePath = path.resolve(__dirname, global_setting.src_path, global_setting.webpack.prod_config_file);
  var config = require(configFilePath);
  var compiler = webpack(config);

  var server = new WebpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    inline: false,
    hot: false,
    stats: {
      colors: true
    },
    contentBase: global_setting.dest_path
  });

  server.listen(global_setting.webpack.server_port, global_setting.webpack.server_host, function(err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);

    var msg = 'http://' + global_setting.webpack.server_host + ':' + global_setting.webpack.server_port;
    gutil.log('[webpack-dev-server]', msg);
  });

});
