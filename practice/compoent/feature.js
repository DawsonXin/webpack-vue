import Vue from 'vue'

const ChildComponent = {
  template: `
    <div>child component: {{data.value}}</div>
  `,
  inject: ['yeye', 'data'],
  mounted () {
    console.log(this.$parent.$options.name)
    console.log(this.yeye)
    console.log(this.value)
  }
}

const component = {
  name: 'comp',
  components: {
    ChildComponent
  },
  /*  template: `
  <div :style="style">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="body">
      <slot name="body"></slot>
    </div>
  </div>
  `, */
  template: `
    <div :style="style">
      <slot :value="value" aaa="111"></slot>
      <child-component></child-component>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: '1222'
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  provide () { // 将数据传给子代组件
    const data = {}
    Object.defineProperty(data, 'value', { // 强行让子组件联动数据变动，不支持使用hick方法
      get: () => this.value,
      enumerable: true
    })
    return {
      yeye: this,
      // value: this.value
      data
    }
  },
  el: '#root',
  data () {
    return {
      value: '123'
    }
  },
  mounted () {
    console.log(this.$refs.comp.value, this.$refs.span)
  },
  /*  template: `
    <comp-one>
      <span slot="header">this is header</span>
      <span slot="body">this is body</span>
    </comp-one>
  ` */
  // 插槽会展示调用时的data,使用slot-scope可以使用传入的数据
  template: `
    <div>
      <comp-one ref="comp">
        <span slot-scope="props" ref="span">{{props.value}}-{{props.aaa}} - {{value}}</span>
      </comp-one>
      <input type="text" v-model="value" />
    </div>
    
  `
})
