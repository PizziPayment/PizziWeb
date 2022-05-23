import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  theme: {
    dark : true,
    themes: {
      light: {
        background: '#eee'
      },
      dark: {
        background: '#121212'
      },
    },
    options: {
      customProperties: true
    },
  }
});
