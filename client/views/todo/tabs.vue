<template>
  <div id="tabs">
      <span class="left">{{leftNum}} todos left</span>
      <span class="tabs">
        <span
            :class='[filter == state ? "active":"" ]'
            v-for="state in states"
            :key="state"
            v-on:click="selected(state)"
        >{{state}}
        </span>
      </span>
      <span class="right">
          <input type="button" @click='clearComplated' value="clear complated">
      </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      states: ['all', 'active', 'complated']
    }
  },
  props: {
    todos: {
      type: Array,
      required: true
    },
    filter: {
      type: String,
      required: true
    }
  },
  computed: {
    leftNum () {
      return this.todos.filter(todo => !todo.complated).length
    }
  },
  methods: {
    selected (state) {
      this.$emit('toggle', state)
    },
    clearComplated () {
      this.$emit('clear')
    }
  }
}
</script>
<style>
#tabs:after{
  content: '';
  height: 0;
  display: none;
  clear: both;

}
    .left{
        float: left;
    }
    .tabs{
        float: left;
        margin-left: 5rem;

    }
    .tabs span{
            cursor: pointer;
        }
    .right{
        float: left;
        margin-left: 3rem;
    }
    .active{
        background-color: red;
    }
</style>

