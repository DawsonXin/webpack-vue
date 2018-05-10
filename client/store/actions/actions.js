// 异步的操作的数据改变放actions，例如数据请求。实时的数据改变放mutation里面
export default {
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', {
        num: data.num
      })
    }, data.time)
  }
}
