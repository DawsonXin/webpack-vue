<template>
  <div id="app">
    <!-- <div>{{text}}</div> -->
    <Header></Header>
    <p>{{fullName}} {{count}}</p>
    <p>{{textC}} {{textPlus}}</p>
   <!-- <Todo /> -->
   <router-link :to="{name: 'app'}">App</router-link>
   <router-link to="/login/123">login</router-link>
    <router-link to="/login/exact">login exact</router-link>
    <transition name="fade">
      <router-view />
    </transition>
    <button @click="notify">notify</button>
    <!-- <Notification content='test notificati'/> -->
    <Footer></Footer>
    <!-- <div style="clear:both">-----------------</div>
    <router-view name="a" /> -->

  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'
// console.log(Header.__docs)
export default {
  data () {
    return {
      text: 'abc111d'
    }
  },
  components: {
    Header,
    Footer,
    Todo
  },
  mounted () {
    this.$notify({
      content: 'test notify',
      btn: 'close'
    })
    this.updateCountAsync({ // updateCountAsync 为mapActions的参数
      num: 5,
      time: 2000
    })
    // this.updateText('123')
    this['b/testAction']()
    // this['a/updateText']('123')
    /* this.$store.dispatch('updateCountAsync', {
      num: 5,
      time: 2000
    }) */
    /* console.log(this.$store)
    let i = 1
    setInterval(() => {
      this.$store.commit('updateCount', {
        num: i++,
        num2: 2
      })
    }, 1000) */
  },
  computed: {
    textB () {
      return this.$store.state.b.text
    },
    // ...mapState(['count']), // 如果不更改state名字，可以直接这样写
    ...mapState({
      // count: 'count' // 后面的字符串是 state 里面的名字
      count: (state) => state.count, // 可以使用这种方法做些计算
      textA: (state) => state.a.text,
      textC: (state) => state.c.text
    }),
    /*  count () {
      return this.$store.state.count
    }, */
    ...mapGetters({
      fullName: 'fullName',
      textPlus: 'a/textPlus'
    })
    /*  fullName () {
      return this.$store.getters.fullName
    } */
  },
  methods: {
    ...mapActions(['updateCountAsync', 'add', 'b/testAction']),
    ...mapMutations(['updateCount', 'updateText']),
    notify () {
      this.$notify({
        content: 'test notify',
        btn: 'close'
      })
    },
    close () {
      this.$notify(false, {
      })
    }
  }
}
</script>

<style>
  body{
    background: url('./assets/images/01.png') no-repeat;
  }
  .fade-enter-active, .fade-leave-active{
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>
