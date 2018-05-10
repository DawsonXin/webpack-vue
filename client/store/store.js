import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_env === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev, // 不能从外部去修改vuex的参数，不要在生产环境使用
    state: defaultState,
    mutations,
    getters,
    actions,
    plugins: [
      (store) => {
        console.log('my plugin invoked')
      }
    ],
    modules: {
      a: {
        namespaced: true,
        state: {
          text: 1
        },
        mutations: {
          updateText (state, text) {
            console.log('a.state', state)
            state.text = text
          }
        },
        getters: {
          textPlus (state, getters, rootState) {
            return state.text + rootState.count
          }
        },
        actions: {
          add ({ state, commit, rootState }) {
            // commit('updateText', rootState.count)
            commit('updateCount', {num: 56789}, {root: true}) // root:true 会去调用全局的updateCount
          }
        }
      },
      b: {
        namespaced: true,
        state: {
          text: 2
        },
        actions: {
          testAction ({ commit }) {
            commit('a/updateText', 'test text', {root: true})
          }
        }

      }
    }
  })

  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        actions: newActions,
        getters: newGetters
      })
    })
  }
  return store
}
