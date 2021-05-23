import Vue from 'vue';
import VueRouter from 'vue-router';

const home = () => import('@/views/home.vue');
const classify = () => import('@/views/classify.vue');
const shoping = () => import('@/views/shoping.vue');
const me = () => import('@/views/me.vue');
const search = () => import('@/views/search.vue');
const address = () => import('@/components/address.vue');
const edit = () => import('@/components/edit.vue');
const customerService = () => import('@/views/customerService.vue');
const pay = () => import('@/views//pay.vue');

VueRouter.prototype.back = false;
VueRouter.prototype.goBack = function goBack() {
  this.back = true;
  this.go(-1);
};
Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'home',
    component: home,
  },
  {
    path: '/classify',
    name: 'classify',
    component: classify,
  },
  {
    path: '/search',
    name: 'search',
    component: search,
  },
  {
    path: '/shoping',
    name: 'shoping',
    component: shoping,
  },
  {
    path: '/me',
    name: 'me',
    component: me,
  },
  {
    path: '/address',
    name: 'address',
    meta: {
      title: '选择地址',
    },
    component: address,
  },
  {
    path: '/edit',
    name: 'edit',
    meta: {
      title: '编辑地址',
    },
    component: edit,
  },
  {
    path: '/customerService',
    name: 'customerService',
    meta: {
      title: '客服服务',
    },
    component: customerService,
  },
  {
    path: '*',
    redirect: '/home',
  },
  {
    path: '/pay',
    name: 'pay',
    meta: {
      title: '支付订单',
    },
    component: pay,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
