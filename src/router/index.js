import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '@/views/home.vue';
import classify from '@/views/classify.vue';
import shoping from '@/views/shoping.vue';
import me from '@/views/me.vue';

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
    path: '*',
    redirect: '/home',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
