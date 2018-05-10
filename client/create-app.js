import Vue from 'vue'
import VueRouter from 'vue-router'
import vuex from 'vuex'

import App from './app.vue'
import createStore from './store/store'
import createRouter from './config/router'
import Notification from './components/notifitation'
import './assets/styles/global.styl'
Vue.use(VueRouter)
Vue.use(vuex)
Vue.use(Notification)
export default () => {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
