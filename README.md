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