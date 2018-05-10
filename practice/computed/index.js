import Vue from 'vue'

new Vue({
  el: '#root',
  template: `<div>
    <span>name: {{firstName + " " + lastName}}</span>
    <p>{{name}}</p>
    <p>{{getName()}}</p>
    <p>{{number}}</p>
    <p><input type='text' v-model='firstName'/></p>
    <p>fullname: {{fullname}}</p>
  </div>`,
  data: {
    firstName: 'Dawson',
    lastName: 'zhao',
    number: 0,
    fullname: ''
  },
  computed: { // 只有跟他相关的值变化重新计算，不要修改里面的值
    name () {
      console.log(1)
      return `${this.firstName} ${this.lastName}`
    }
  },
  watch: { // 首次不会执行，当他相关的值变化才执行
    firstName (newname, oldname) {
      this.fullname = newname + ' ' + oldname
    }
    // immediate: true // 首次也执行
    // deep: true // 深入观察，性能开销加大
  },
  methods: { // 每次都会调用
    getName () {
      console.log('methods')
      return `${this.firstName} ${this.lastName}`
    }
  }
})
