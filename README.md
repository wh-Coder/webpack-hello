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



