import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS(
  {
    encodingType: "aes",
    encryptionSecret: process.env.VUE_APP_ENCRYPTION_SECRET,
    isCompression: false
  }
);

// import stores
import defaultStore from './default'

Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    defaultStore,
  },
  // enable strict mode (adds overhead!)
  // for dev mode and --debug builds only
  // strict: process.env.DEBUGGING,
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ]
})

export default function (/* { ssrContext } */) {
  return Store
}

export { Store }
