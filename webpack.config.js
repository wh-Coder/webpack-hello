var website = {
    publicPath: "http://0.0.0.0:1717"
}

const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    //入口文件的配置项
    entry: {
        entry: './src/entry.js',
        entry2: './src/entry2.js'
    },
    //出口文件的配置项
    output: {
        //输出的路径，用了Node语法
        path: path.resolve(__dirname, 'dist'),
        //输出的文件名称 filename: 'bundle.js'
        filename: '[name].js',
        // 根路径
        // publicPath: website.publicPath
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: [ 'style-loader', 'css-loader' ]
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                    publicPath: '/',   // 注意配置这一部分，根据目录结构自由调整
                })
            }, {
                test: /\.(png|jpg|gif)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // 是把小于 500000 B的文件打成Base64的格式，写入JS。
                        limit: 50,
                        outputPath: 'images/',
                    }
                }]
            }, {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            }, {
                test: /\.less$/,
                // use: [{
                //     loader: "style-loader" // creates style nodes from JS strings
                // }, {
                //     loader: "css-loader" // translates CSS into CommonJS
                // }, {
                //     loader: "less-loader" // compiles Less to CSS
                // }]
                use: extractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    },
    //插件，用于生产模版和各项功能
    plugins: [
        // 混淆代码
        // new uglify(),
        new htmlPlugin({
            // 是对html文件进行压缩，removeAttrubuteQuotes是却掉属性的双引号。
            minify: {
                removeAttributeQuotes: true
            },
            // 为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS
            hash: true,
            // 是要打包的html模版路径和文件名称
            template: './src/index.html'

        }),
        // 把CSS独立出来不打包
        new extractTextPlugin("css/index.css")
    ],
    //配置webpack开发服务功能
    devServer: {
        //设置基本目录结构
        contentBase: path.resolve(__dirname, 'dist'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host: 'localhost',
        //服务端压缩是否开启
        compress: true,
        //配置服务端口号
        port: 1717
    }
}