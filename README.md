# 一个简单的gulp+webpack+jade+vue的例子

## 快速开始

介绍如何快速熟悉本样例

### 下载
```
$ git clone https://github.com/lordking/gulp-webpack-jade-vue-sample.git
```

### 编译调试的时候用得到的命令
```
$ npm install webpack@2.2.0-rc.1 -g
$ npm install jade -g
$ npm install http-server -g
```

### 安装依赖库
```
$ cd gulp-webpack-jade-vue-sample
$ npm install
```

### 编译

生产方式编译
```
$ export NODE_ENV=production
$ npm run build
```

开发方式编译
```
$ export NODE_ENV=development
$ npm run build
```

### 查看结果
```
$ http-server dist
```

## 工程说明

### 项目目录结构
```
|- src/ ------------------------- 源代码结构
    |- assets/ ------------------ 图片等资源文件
    |- webpack.dev.config.js ---- webpack开发环境配置
    |- webpack.prod.config.js --- webpack生产环境配置
    |- jade.config.js ----------- jade配置
    |- app.js ------------------- 程序入口
    |- app.vue ------------------ 主页面模板
    |- app.jade ----------------- 主页面
```


### 单独编译

编译网页模板
```
$ jade *.jade -o dist
```


### 编译js、图片、字体等
```
$ webpack --debug --config=webpack.dev.config.js
```

### 多页面问题

多页面情况下，应该把第三方、通用js库分离出来，用于每个页面缓存相同的库文件。

范例是通过将第三方库生成公共文件的方式分离代码。我们也可以使用CDN的方式，将第三方库缓存起来。

在webpack配置文件中，通过配置externals实现。

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
