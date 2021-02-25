import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    goodsList: {
      type: '',
      page: '',
      size: '10',
      sort: 'all',
    },
  },
  mutations: {
    setRequestInfo(state, info) {
      state.goodsList = { ...state.goodsList, ...info };
    },
  },
  actions: {
    setRequestInfo({ commit }, info) {
      commit('setRequestInfo', info);
    },
  },
  modules: {
  },
});
