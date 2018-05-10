const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')

// const ExtractPlugin = require('extract-text-webpack-plugin')

const defaultPlugin = [
  new webpack.DefinePlugin({
    'process.env': { // 页面判断环境可以引用
      NODE_ENV: '"development"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html') // 配置模板路径
  })
]

const devServer = {
  port: '8080',
  host: '0.0.0.0',
  overlay: {
    errors: true // 编译错误显示在网页中
  },
  hot: true
}
var config

config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
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
  devServer,
  resolve: {
    alias: { // 指定import vue文件，runtime文件不支持template
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugin.concat([new webpack.HotModuleReplacementPlugin()])
})

module.exports = config
