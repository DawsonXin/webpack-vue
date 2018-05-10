import Vue from 'vue'

const compoent = {
  props: { // 不希望在组件里面修改值，从父节点传值过来
    active: Boolean,
    propOne: {
      type: String,
      required: true
    }
  },
  template: `
    <div>
      <input type="text" v-model="text">
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>`,
  data () {
    return {
      text: 0
    }
  },
  mounted () {
    console.log('mounted')
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}

/* const compoent2 = {
  extends: compoent, // 扩展组件
  data () {
    return {
      text: 1
    }
  }
} */
const CompVue = Vue.extend(compoent)

new CompVue({
  el: '#root',
  propsData: {
    propOne: 'xxx'
  },
  data: {
    text: 123
  },
  mounted () {
    console.log('mounted 2')
  }
})
// this.$parent
