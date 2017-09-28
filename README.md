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

## 第06节：插件配置：配置JS压缩

loader 有三种写法：

```
module:{
    rules:[
        {
            test:/\.css$/,

            // 1)
            use:['style-loader','css-loader']

            // 2)
            loader:['style-loader','css-loader']

            // 3)
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }]
        }
    ]
}

```

uglifyjs-webpack-plugin(JS压缩插件，简称uglify)
注意：虽然uglifyjs是插件，但是webpack版本里默认已经集成，不需要再次安装。

直接引入 
const uglify = require('uglifyjs-webpack-plugin');

plugins:[  new uglify()  ],

## 第07节：插件配置：HTML文件的发布

移动 index.html 去掉 js 的引入

取而代之的 html-webpack-plugin 插件

npm install --save-dev html-webpack-plugin

```
new htmlPlugin({
    // 是对html文件进行压缩，removeAttrubuteQuotes是却掉属性的双引号。
    minify:{
        removeAttributeQuotes:true
    },
    // 为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS
    hash:true,
    // 是要打包的html模版路径和文件名称
    template:'./src/index.html'
    
})WE
```

npm run server 不会在生成任何文件了

## 第08节：图片迈坑：CSS中的图片处理

css 中的图片

npm install --save-dev file-loader url-loader

file-loader：解决引用路径的问题，拿background样式用url引入背景图来说，我们都知道，webpack最终会将各个模块打包成一个文件，因此我们样式中的url路径是相对入口html页面的，而不是相对于原始css文件所在的路径的。这就会导致图片引入失败。这个问题是用file-loader解决的，file-loader可以解析项目中的url引入（不仅限于css），根据我们的配置，将图片拷贝到相应的路径，再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件。

url-loader：如果图片较多，会发很多http请求，会降低页面性能。这个问题可以通过url-loader解决。url-loader会将引入的图片编码，生成dataURl。相当于把图片数据翻译成一串字符。再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了。当然，如果图片较大，编码会消耗性能。因此url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURl，大于limit的还会使用file-loader进行copy。

```
{
    test:/\.(png|jpg|gif)/ ,
    use:[{
        loader:'url-loader',
        options:{
            // 是把小于500000B的文件打成Base64的格式，写入JS
            limit:500000
        }
    }]
}
```

## 第09节：图片迈坑：CSS分离与图片路径处理

有些场合得把CSS分开

npm install --save-dev extract-text-webpack-plugin

new extractTextPlugin("/css/index.css")

使用 http://0.0.0.0:1717 可以代替 localhost:1717
