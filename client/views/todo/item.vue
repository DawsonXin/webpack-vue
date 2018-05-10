<template>
    <div id="item" v-bind:class="[todo.complated ? 'complated':'']">
        <input type="checkbox" v-model = 'todo.complated'>
        <span>{{todo.content}}</span>
        <input type="button" @click="deleteTodo" value="X">
    </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteTodo () {
      this.$emit('del', this.todo.id)
    }
  }
}
</script>

<style>
    .complated{
        color: #aaa;
    }
</style>