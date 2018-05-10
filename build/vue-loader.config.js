// const docsLoader = require.resolve('./doc-loader')

module.exports = (isDev) => {
  return {
    preserveWhitepace: true, // 去掉空格
    extractCSS: !isDev, // 将vue中的css单独打包到一个css文件
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hase:base64:5]' : '[hase:base64:5]', // 生产唯一名字
      camelCase: true // 转化成驼峰命名
    },
    // hotReload: isDev // 根据环境变量生存，没什么用
    /*  loaders:{ //自定义组件
            'docs':docsLoader,
            js:"coffe-loader",

        } */
    preLoader: { // 先用这里面的loader解析

    },
    postLoader: { // 后面解析

    }

  }
}
