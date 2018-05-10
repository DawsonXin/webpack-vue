const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

// const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const defaultPlugin = [
  new webpack.DefinePlugin({
    'process.env': { // 页面判断环境可以引用
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new VueClientPlugin()
]

const devServer = {
  port: '8000',
  host: '0.0.0.0',
  overlay: {
    errors: true // 编译错误显示在网页中
  },
  historyApiFallback: { // 直接输地址找不到页面，开发环境用，不然直接请求服务端地址
    index: '/public/index.html' // 跟webpack。config.base.js output的publicPath有关
  },
  hot: true
}
var config

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl$/,
          /* use:ExtractPlugin.extract({
                        fallback:'vue-style-loader', */
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
          /* }) */

        }

      ]
    },
    /* optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    }, */
    devServer,
    plugins: defaultPlugin.concat([
      new webpack.HotModuleReplacementPlugin()
    ])
  })
} else {

}

module.exports = config
