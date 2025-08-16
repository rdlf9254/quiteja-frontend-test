import Vue from 'vue';
import Vuetify from 'vuetify';
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      dark: true,
      themes: {
        light: {
          primary: '#3D5AFE',
          secondary: '#616161',
          accent: '#E91E63',
          error: '#D32F2F',
          info: '#1976D2',
          success: '#388E3C',
          warning: '#FBC02D',
        },
        dark: {
          primary: '#536DFE',
          secondary: '#B0BEC5',
          accent: '#F06292',
          error: '#E57373',
          info: '#64B5F6',
          success: '#81C784',
          warning: '#FFD54F',
        },
      },
    },
  });