const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === "development"

const config = {
    target:"web", //编译目标
    entry:path.join(__dirname,'./src/index.js'),
    output:{
        path: path.join(__dirname,'dist'),
        filename: 'test.js'
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.(png|jpg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'[name].[ext]'
                        }
                    }
                ]
            },
            {
                test:/\.jsx$/,
                use:['babel-loader']
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{ //页面判断环境可以引用
                NODE_ENV:isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
}
if(isDev){
    config.devServer = {
        port:'8000',
        host:'0.0.0.0',
        overlay:{
            errors:true //编译错误显示在网页中
        },
        hot:true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )
}

module.exports = config;