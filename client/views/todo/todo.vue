<template>
  <div id="item">
      <input type="text" @keyup.enter="addTodo" placeholder="你需要做什么？">
      <Item
        v-bind:todo="todo"
        v-for="todo in filterTodo"
        v-bind:key="todo.id"
        v-on:del="delTodo"
      />
      <Tabs
        :filter='filter'
        :todos='todos'
        @toggle='toggle'
        @clear ='clear'
      />
      <router-view/>
  </div>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
  beforeRouteEnter (to, from, next) {
    console.log('todo before enter')
    next(vm => {
      console.log('after enter:' + vm.filter)
    })
  },
  beforeRouteUpdate (to, from, next) { // 路由更新时触发,用mouted可能不会更新
    console.log('todo before update')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('todo before elave')
    next()
  },
  components: {
    Item, Tabs
  },
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  computed: {
    filterTodo () {
      if (this.filter === 'all') {
        return this.todos
      }
      if (this.filter === 'active') {
        return this.todos.filter(todo => todo.complated === false)
      }
      if (this.filter === 'complated') {
        return this.todos.filter(todo => todo.complated === true)
      }
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift(
        {
          id: id++,
          content: e.target.value,
          complated: false
        }
      )
      e.target.value = ''
    },
    delTodo (id) {
      this.todos.splice(this.todos.findIndex(v => v.id === id), 1)
    },
    toggle (state) {
      this.filter = state
    },
    clear () {
      this.todos = this.todos.filter(todo => !todo.complated)
    }
  }
}
</script>
