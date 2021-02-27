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
    goodsCount: JSON.parse(window.localStorage.getItem('goodsCount')) || {},
  },
  mutations: {
    setRequestInfo(state, info) {
      state.goodsList = { ...state.goodsList, ...info };
    },
    setGoodsCount(state, { id, num }) {
      console.log(JSON.parse(window.localStorage.getItem('goodsCount')), state.goodsCount);
      if (!state.goodsCount[id]) {
        Vue.set(state.goodsCount, id, 1);
        return;
      }
      state.goodsCount[id] += num;
      window.localStorage.setItem('goodsCount', JSON.stringify(state.goodsCount));
    },
  },
  actions: {
    setRequestInfo({ commit }, info) {
      commit('setRequestInfo', info);
    },
    setGoodsCount({ commit }, obj) {
      commit('setGoodsCount', obj);
    },
  },
  modules: {
  },
});
