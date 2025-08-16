import usersService from '@/services/UsersService';

const state = {
  users: [],
  isLoading: false,
  error: null,
};

const getters = {
  allUsers: (state) => state.users,
  isLoading: (state) => state.isLoading,
  error: (state) => state.error,
};

const actions = {
  async fetchUsers({ commit }) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    try {
      const response = await usersService.getUsers();
      commit('SET_USERS', response.data.data);
    } catch (error) {
      commit('SET_ERROR', 'Erro ao carregar os usuários.');
      console.error(error);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async updateUser({ commit }, { id, userData }) {
    try {
      const response = await usersService.updateUser(id, userData);
      commit('UPDATE_USER_IN_LIST', response.data);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  },

  async deleteUser({ commit }, userId) {
    try {
      await usersService.deleteUser(userId);
      commit('REMOVE_USER_FROM_LIST', userId);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  },
};

const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
  SET_LOADING(state, status) {
    state.isLoading = status;
  },
  SET_ERROR(state, message) {
    state.error = message;
  },
  UPDATE_USER_IN_LIST(state, updatedUser) {
    const index = state.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      state.users.splice(index, 1, updatedUser);
    }
  },
  REMOVE_USER_FROM_LIST(state, userId) {
    state.users = state.users.filter(user => user.id !== userId);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};