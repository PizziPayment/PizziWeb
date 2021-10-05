import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        background: '#eee'
      },
      dark: {
        background: '#121212'
      }
    },
    options: {
      customProperties: true
    },
  }
});
