const state = {
    text: '',
    color: '',
    show: false,
  };
  
  const mutations = {
    SHOW_TOASTR(state, payload) {
      state.text = payload.text;
      state.color = payload.color || 'success'; // 'success' como padrão
      state.show = true;
    },
    HIDE_TOASTR(state) {
      state.show = false;
    },
  };
  
  const actions = {
    showToastr({ commit }, payload) {
      commit('SHOW_TOASTR', payload);
    },
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
  };