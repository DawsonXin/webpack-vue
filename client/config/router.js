import Router from 'vue-router'
import routes from './routes'

export default () => { // 服务端渲染会缓存，每次会新增，导致内存溢出
  return new Router({
    routes,
    mode: 'history',
    // base: '/base/',
    linkActiveClass: 'active-link', // 给部分重合标签加class
    linkExactActiveClass: 'exact-active-link', // 给当前所在页面标签加class
    scrollBehavior (to, from, savedPosition) { // 跟页面跳转滚动有关，到原来滚动的位置
      if (savedPosition) {
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    },
    parseQuery (query) { // 地址栏？后面的参数转换

    },
    stringifyQuery (obj) {},
    fallback: true // 如果浏览器不支持history跳转自动转换hash跳转
  })
}
