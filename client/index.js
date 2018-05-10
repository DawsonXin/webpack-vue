import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import Vuex from 'vuex'

/* var root = document.createElement('div')
document.body.appendChild(root) */
import createRouter from './config/router'
import createStore from './store/store'
import Notification from './components/notifitation'
// import mutations from './store/mutations/mutations'

Vue.use(Vuex)

Vue.use(VueRouter)
Vue.use(Notification)
const router = createRouter()
const store = createStore()

store.registerModule('c', { // 动态加载模块
  state: {
    text: 3
  }
})

// store.unregisterModule('c') // 解除加载

/* store.watch((state) => state.count + 1, (newCount) => {
  console.log('newCount watched:' + newCount)
}) */
/* store.subscribe((mutation, state) => {
  console.log(mutation.type)
  console.log(mutation.payload)
}) */
store.subscribeAction((action, state) => {
  console.log(action.type)
  console.log(action.payload)
})

// 导航守卫
router.beforeEach((to, from, next) => {
  console.log('before each invoked')
  if (to.fullPath === '/login') { // 做一些校验，比如用户登陆才能进入页面
    next({path: '/login'})
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')

router.beforeResolve((to, from, next) => {
  console.log('before resolve invoked')
  next()
})

router.afterEach((to, from, next) => {
  console.log('after each invoked')
})
