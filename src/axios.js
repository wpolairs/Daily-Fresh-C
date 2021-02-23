import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/goods/',
});
// 请求拦截
instance.interceptors.request.use((config) => ({
  ...config,
  params: {
    ...config.params,
    appkey: 'polairs_1608176762956',
  },
}), (error) => Promise.reject(error));
// 响应拦截
instance.interceptors.response.use((response) => {
  if (response.statusText !== 'OK') {
    return Promise.reject(response.statusText);
  }
  return Promise.resolve(response.data);
}, (error) => Promise.reject(error));

export default instance;
