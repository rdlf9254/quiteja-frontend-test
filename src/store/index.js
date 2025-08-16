import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users';
import toastr from './modules/toastr';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    users,
    toastr,
  }
})