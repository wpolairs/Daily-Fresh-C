import axios from '../axios';

export default {
  // 获取二级导航
  getsidebar(params) {
    return axios.get('/getsidebar', { params });
  },
  // 获取商品列表
  getGoodsList(params) {
    return axios.get('/getGoodsList', { params });
  },
  // 模糊搜索
  likeSearch(params) {
    return axios.get('/likeSearch', { params });
  },
  // 搜索
  searchGoods(params) {
    return axios.get('/search', { params });
  },
  // 根据商品列表进行搜素
  getGoodsByIds(params) {
    return axios.get('/getGoodsByIds', params);
  },
};
