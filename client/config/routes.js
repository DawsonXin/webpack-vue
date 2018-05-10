// import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: () => import('../views/todo/todo.vue'), // 异步路由，首屏加载快，需要安装babel-plugin-syntax-dynamic-import,配置babelrc
    /* components: {
      default: Todo,
      a: Login
    }, */
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'this is vue + webapck'
    },
    children: [ // 需要在Todo里面添加router-view
      {
        path: ' test',
        component: Login
      }
    ]
  },
  {
    path: '/login/:id',
    // props: true, // 可以把id传入到组件的props里
    props: (route) => ({ id: route.query }), // 可以传任何值
    component: Login,
    beforeEnter (to, from, next) {
      console.log('before enter')
      next()
    }
  },
  {
    path: '/login/exact',
    component: Login
  }
]
