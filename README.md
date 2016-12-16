# 一个简单的gulp+webpack+jade+vue的例子

## 快速开始

```
# 下载
$ git clone https://github.com/lordking/gulp-webpack-jade-vue-sample.git

# 安装依赖库
$ cd gulp-webpack-jade-vue-sample
$ npm install

# 生产方式编译
$ export NODE_ENV=production
$ npm run build helloworld

# 开发方式运行
$ export NODE_ENV=development
$ npm run build helloworld

# 如果没有http服务，可以安装一个零配置的HTTP服务。
$ npm install http-server -g
$ http-server dist
```

## 配置一个工程

1. 为helloworld工程，在src下创建目录`helloworld`

2. 在`helloworld`目录中，创建`webpack.config.js`，定义webpack的编译配置
```
module.exports = {
  //...webpack配置
}
```

3. 在`helloworld`目录中，创建入口文件`main.js`。main.js，由`webpack.config.js`的entry定义。
```
import Vue from 'vue'
import App from './app.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})
```

4. Vue的书写例子
```
main.js
app.vue
app.jade
assets\logo.png
```

5. 以下的文件，不是必须的。如果不想使用gulp，而是进入目录直接用webpack编译，需要下面文件。
```
.babelrc //babel对es6配置
package.json //npm的package配置
```
