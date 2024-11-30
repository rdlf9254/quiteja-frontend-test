import Vue from "vue";
import Vuex from "vuex";

const users = {
  namespaced: true,
  state: {
    users: [],
    usersInfos:[]
  },
  getters: {
    allUsers: (state) => state.users,
    hasUsers: (state) => state.users.length > 0,
    getUserInfoById: (state) => (userId) => {
      const user = state.usersInfos.find(user => user.id === userId);
      return user || null;
    },

  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    removeUser(state, userId) {
      console.log("remove chamado", userId);
      state.users = state.users.filter((user) => user.id !== userId);
    },
    updateUser(state, updatedUser) {
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) state.users.splice(index, 1, updatedUser);
    },
    addUser(state, newUser) {
      state.users.unshift(newUser);
    },
    addUserInfo(state, newUserInfo) {
      state.usersInfos.push(newUserInfo);  
    },

  },
  actions: {
    removeUserById({ commit }, userId) {
      commit("removeUser", userId);
    },
    updateUserById({ commit }, updatedUser) {
      commit('updateUser', updatedUser);
    },
    addUserToList({ commit }, newUser) {
      commit('addUser', newUser);
    },
    addUserInfoToList({ commit }, newUserInfo) {
      commit('addUserInfo', newUserInfo);
    },

  },
};

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
  },
});
