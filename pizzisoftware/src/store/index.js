import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

// import stores
import defaultStore from './default'

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  key: 'DeepblooFront',
  storage: localStorage,
  modules: ['defaultStore']
})

const Store = new Vuex.Store({
  modules: {
    defaultStore,
  },
  // enable strict mode (adds overhead!)
  // for dev mode and --debug builds only
  // strict: process.env.DEBUGGING,
  plugins: [vuexLocal.plugin]
})

export default function (/* { ssrContext } */) {
  return Store
}

export { Store }
