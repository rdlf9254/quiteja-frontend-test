
import Vue from "vue";
import Vuex from "vuex";


const users = {
  namespaced: true,
  state: {
    users: [],
  },
  getters: {
    allUsers: (state) => state.users,
    hasUsers: (state) => state.users.length > 0,
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    removeUser(state, userId) {
      console.log('remove chamado', userId)
      state.users = state.users.filter(user => user.id !== userId);
    },
  
  },
  actions: {
    removeUserById({ commit }, userId) {
      commit('removeUser', userId);
    }
  
  },
};

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
  },
});
