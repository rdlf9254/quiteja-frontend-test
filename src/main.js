import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AppToast from "@/components/AppToast.vue"; // Nome atualizado


import vuetify from '@/plugins/vuetify'

const toastInstance = new Vue(AppToast).$mount();
document.body.appendChild(toastInstance.$el);

Vue.prototype.$toast = (options) => {
  toastInstance.showToast(options);
};


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
