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
    goodsCount: JSON.parse(localStorage.getItem('goodsCount')) || {},
  },
  mutations: {
    setRequestInfo(state, info) {
      state.goodsList = { ...state.goodsList, ...info };
    },
    setGoodsCount(state, { id, num }) {
      if (!state.goodsCount[id]) {
        Vue.set(state.goodsCount, id, 1);
        localStorage.setItem('goodsCount', JSON.stringify(state.goodsCount));
        return;
      }
      state.goodsCount[id] += num;
      localStorage.setItem('goodsCount', JSON.stringify(state.goodsCount));
    },
    // 删除商品
    removeGoodsCount(state, id) {
      id.forEach((item) => {
        // delete state.goodsCount[item];
        Vue.delete(state.goodsCount, item);
      });
      localStorage.setItem('goodsCount', JSON.stringify(state.goodsCount));
    },
  },
  actions: {
    setRequestInfo({ commit }, info) {
      commit('setRequestInfo', info);
    },
    setGoodsCount({ commit }, obj) {
      commit('setGoodsCount', obj);
    },
    removeGoodsCount({ commit }, id) {
      commit('removeGoodsCount', id);
    },
  },
  modules: {
  },
});
