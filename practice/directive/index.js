import Vue from 'vue'

new Vue({
  el: '#root',
  template: `<div>
    <p>text: {{text}}</p>
    <p v-pre>text: {{text}}</p>
    <div v-show="active">{{text}}</div>
    <div v-if="active">{{text}}</div>
    <div v-else-if="text === 0">{{text}}</div>
    <div v-else>else content</div>
    <ul>
      <li v-for="(item, index) in arr" :key="item">{{item}} : {{index}}</li>
    </ul>
    <ul>
      <li v-for="(val, key, index) in obj" :key = "key">{{val}} - {{key}} - {{index}}</li>
    </ul>
    <input type="checkbox" v-model = "active"/>
    <div>
      <input type="checkbox" v-bind:value="1" v-model = "arr"/>
      <input type="checkbox" v-bind:value="2" v-model = "arr"/>
      <input type="checkbox" v-bind:value="'a'" v-model = "arr"/>
    </div>
    <input type="text" v-model.lazy = "text">
  </div>`,
  data: {
    arr: [],
    obj: {
      a: '123',
      b: '456',
      c: '789'
    },
    text: 0,
    active: false
  }
})
// v-if 不成立会删除节点;
// v-once 展示静态内容，不再解析，可以节省性能
