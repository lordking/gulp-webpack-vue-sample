# 一个简单的gulp+webpack+jade+vue的例子

## 快速开始

介绍如何快速熟悉本样例

### 下载
```
$ git clone https://github.com/lordking/gulp-webpack-jade-vue-sample.git
```

### 安装依赖库
```
$ cd gulp-webpack-jade-vue-sample
$ npm install
```

### 开发方式运行

采用webpack-dev-server的动态刷新机制，可以自动同步修改的js、vue。

```
$ gulp dev
```

### 编译

```
$ gulp prod
```

### 编译并查看运行结果

编译并运行webpack-dev-server，然后可以查看结果

```
$ gulp prod:run
```

## 工程说明

### 项目目录结构
```
|- src/ ------------------------ 源代码结构
|  |- assets/ ------------------ 图片等资源文件
|  |- webpack.base.config.js --- webpack基础配置
|  |- webpack.dev.config.js ---- webpack开发环境配置
|  |- webpack.prod.config.js --- webpack生产环境配置
|  |- jade.config.js ----------- jade配置
|  |- main.js ------------------ 程序入口
|  |- app.vue ------------------ 主页面模板
|  |- app.jade ----------------- 主页面
|- .babelrc -------------------- babel配置，用于es6兼容旧语法
|- gulpfile.js ----------------- gulp脚本
|- package.json ---------------- npm配置
```

### 单独编译

jade
```
$ gulp prod:jade
$ gulp dev:jade
```

webpack
```
$ gulp prod:webpack
$ gulp dev:webpack
```

### 编译js、图片、字体等
```
$ webpack --debug --config=webpack.dev.config.js
```

### CDN

多页面情况下，可以把第三方、通用js库分离出来，用于每个页面缓存相同的库文件。

范例是通过将第三方库生成公共文件的方式分离代码。我们也可以使用CDN的方式，将第三方库缓存起来。

在`webpack.base.config.js`配置文件中，通过配置externals实现。

webpack配置
```

// 去除第三方库的输出
// vender: ['vue']

// 去除第三方库的合并
// new webpack.optimize.CommonsChunkPlugin({
//   name: 'vender'
// })

// 加入Vue的绑定
externals: {
  "vue": "Vue"
},
```

在HTML中加入
```
<script src="//cdnjs.cloudflare.com/ajax/libs/vue/2.0.7/vue.runtime.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/vue-router/2.0.1/vue-router.min.js"></script>
```
