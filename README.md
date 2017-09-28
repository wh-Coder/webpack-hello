## WebPack-guide

> WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Sass，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。在3.0出现后，Webpack还肩负起了优化项目的责任。

### 第01节：认识WebPack的作用

```
npm init
npm i -D webpack
./node_modules/.bin/webpack -v

// 或者全局
npm i -g webpack
webpack -v
```


### 第02节：让你快速上手一个Demo

第一条命令

webpack {entry file} {destination for bundled file}

webpack src/entry.js dist/bundle.js

### 第03节：配置文件：入口和出口

编写 webpack.config.js

```
module.exports={

    //入口文件的配置项，可以是单一入口，也可以是多入口。
    entry:{},

    //出口文件的配置项
    output:{},

    //模块：例如解读CSS,图片如何转换，压缩
    module:{},

    //插件，用于生产模版和各项功能
    plugins:[],

    //配置webpack开发服务功能
    devServer:{}
}

```

配置好，执行 webpack 

同时支持多入口，多出口配置

```
output: {
    filename: '[name].js'
}
```


### 第04节：配置文件： 服务和热更新

- 设置 webpack-dev-server

npm install webpack-dev-server –save-dev

在 webpack.config.js 中配置服务参数

```
devServer:{

    //设置基本目录结构，用于找到程序打包地址。
    contentBase:path.resolve(__dirname,'dist'),
    
    //服务器的IP地址，可以使用IP也可以使用localhost
    host:'localhost',
    
    //服务端压缩是否开启
    compress:true,
    
    //配置服务端口号
    port:1717
}
```

本地的 webpack-dev-server 不能直接执行

```
"scripts": {
    "server":"webpack-dev-server",
    "webpack":"webpack"
 },

 ```

 执行 npm run server , 并打开浏览器 localhost:1717

 - 支持热更新

 webpack 3.6之前的热更新不是默认的，需要额外配置

 ## 第05节：模块：CSS文件打包

> Loaders是Webpack最重要的功能之一，他也是Webpack如此盛行的原因。通过使用不同的Loader，Webpack可以的脚本和工具，从而对不同的文件格式进行特定处理。

作用：
- SASS --> CSS
- ES6/7  -->  ES5
- JSX --> JS

配置写在 webpack.config.js 中的 module.rules 属性中

```
module:{
    rules: [
        {
            // 用于匹配处理文件的扩展名的表达式，这个选项是必须进行配置的；
            test: /\.css$/,

            // loader名称，就是你要使用模块的名称，这个选项也必须进行配置，否则报错；
            use: [ 'style-loader', 'css-loader' ],

            手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）
            include/exclude:,

            为loaders提供额外的设置选项（可选）
            query：,
        }.
        ...ohters
    ]
}
```
配置css-loader 和 style-loader 就可以使用

import css from './css/index.css';

npm i -D style-loader 
所有的计算后的样式加入页面中

npm i -D css-loader
css-loader使你能够使用类似@import和url（...）的方法实现require的功能

