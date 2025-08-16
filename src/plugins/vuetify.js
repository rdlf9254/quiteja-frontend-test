import Vue from 'vue';
import Vuetify from 'vuetify';
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true, 
    themes: {
      light: {
        primary: '#1976D2',
        accent: '#82B1FF',
        secondary: '#424242',
      },
      dark: {
        primary: '#2196F3',
        accent: '#FF4081',
      },
    },
  },
});