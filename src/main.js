import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'
import TranslationPlugin from '@/plugins/Translation.js'


Vue.config.productionTip = false
Vue.use(TranslationPlugin)


Bugsnag.start({
  apiKey: process.env.VUE_APP_BUGSNAG_KEY,
  plugins: [new BugsnagPluginVue()]
})

const bugsnagVue = Bugsnag.getPlugin('vue')
bugsnagVue.installVueErrorHandler(Vue)

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
