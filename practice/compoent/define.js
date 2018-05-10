import Vue from 'vue'

const compoent = {
  props: { // 不希望在组件里面修改值，从父节点传值过来
    active: {
      type: Boolean,
      required: true,
      default: true, // 一般不和required同时出现
      validator (value) { // 正则验证？
        return typeof value === 'boolean'
      }
    },
    propOne: String
  },
  template: `
    <div>
    <p>{{propOne}}</p>
      <input @click="onChange">
      <input type="text" v-model.number = "text">
      <span v-show="active">see me if active</span>
    </div>`,
  data () {
    return {
      text: 0
    }
  },
  methods: {
    onChange () {
      this.$emit('change')
    }
  }
}

new Vue({
  components: {
    CompOne: compoent
  },
  el: '#root',
  template: `
    <div>
      <comp-one :active="true" :prop-one="props" @change = "handleChange"></comp-one>
      <comp-one :active="123"></comp-one>
    </div>`,
  data: {
    props: 'text'
  },
  methods: {
    handleChange () {
      this.props += 1
    }
  }
})
