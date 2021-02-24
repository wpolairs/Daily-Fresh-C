import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    goodsList: {
      type: '',
      page: '',
      size: '',
      sort: '',
    },
  },
  mutations: {
    setGoodList(state, goodsList) {
      state.goodsList = goodsList;
    },
  },
  actions: {
    setGoodList({ commit }, goodsList) {
      commit('setGoodList', goodsList);
    },
  },
  modules: {
  },
});
