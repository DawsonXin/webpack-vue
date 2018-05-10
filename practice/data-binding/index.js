import Vue from 'vue'

new Vue({
  el: '#root',
  // template: `
  //   <div :id="aaa" v-on:click="handleClick">
  //     {{isActive ? 'active' : 'not active'}}
  //     {{arr.join(' ')}}
  //     {{Date.now()}}
  //     {{html}}
  //     <p v-html="html"></p>
  //   </div>
  // `,
  template: `
    <div :class="[{active: !isActive}]">
      <p v-html="html"></p>
      <p>{{getJoinArr(arr)}}</p>
    </div>
  `,
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: '<span>123</span>',
    aaa: 'main'
  },
  methods: {
    handleClick () {
      console.log('clicked')
    },
    getJoinArr (arr) {
      return arr.join(' ')
    }
  }
})
