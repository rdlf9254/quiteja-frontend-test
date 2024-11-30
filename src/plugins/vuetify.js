import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import pt from "vuetify/es5/locale/pt";

Vue.use(Vuetify);

const opts = {
  icons: {
    iconfont: "mdi",
  },
  lang: {
    locales: { pt },
    current: "pt",
  },
};

export default new Vuetify(opts);
