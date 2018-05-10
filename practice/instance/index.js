import Vue from 'vue'

/* new Vue({
  el: '#root',
  template: '<div>this is content</div>'
}) */

const app = new Vue({
  template: '<div ref="div" id="div1">{{text}}</div>',
  data: {
    text: 0
  }
})
setInterval(() => {
  // app.text += 1
  app.$data.text += 1
}, 1000)
app.$mount('#root')

/* console.log(app.$data)
console.log(app.$el)
console.log(app.$options)
console.log(app.$root === app)
console.log(app.$children)
console.log(app.$slots)
console.log(app.$scopedSlots)
console.log(app.$refs)
console.log(app.$isServer) */
const unWatch = app.$watch('text', (newtext, oldtext) => {
  console.log(`${newtext} : ${oldtext}`)
})
setTimeout(() => {
  unWatch()
}, 3000)

app.$on('test', (a, b) => {
  console.log(`test emited ${a} ${b}`)
})
app.$emit('test', 1, 2)

// app.$forceUpdate() // 强制更新

/* app.$set()
app.$delete() */
