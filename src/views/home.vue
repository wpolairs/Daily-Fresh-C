<template>
  <div class="home">
    <notice></notice>
    <search class="topSearch"></search>
    <div class="swiper">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="desc">
      <span class="text" v-for="(item, index) in text" :key="index">{{ item }}</span>
    </div>
    <my-like></my-like>
  </div>
</template>
<script>
import Vue from 'vue';
import { Lazyload } from 'vant';
import search from '@/components/searchInput.vue';
import myLike from '@/components/like.vue';
import notice from '../components/notice.vue';

Vue.use(Lazyload);
export default {
  components: {
    search,
    notice,
    myLike,
  },
  data() {
    return {
      images: [
        'https://cdn.pixabay.com/photo/2010/12/13/10/05/berries-2277__340.jpg',
        'https://cdn.pixabay.com/photo/2017/10/17/15/15/knabberzeug-2860948__340.jpg',
        'https://cdn.pixabay.com/photo/2019/01/11/07/30/japan-3926602__340.jpg',
        'https://cdn.pixabay.com/photo/2015/05/30/01/18/vegetables-790022__340.jpg',
      ],
      text: ['质量保证', '专享包邮', '当日到达', '售后无忧'],
    };
  },
};
</script>
<style scoped lang="less">
.home {
  .topSearch{
    position: sticky;
    top: 0px;
    z-index: 2;
    padding: 2px 0;
    background-color: #fff;
  }
  .swiper {
    padding: 5px;
    .van-swipe-item img {
      width: 95%;
      border-radius: 8px;
      height: 150px;
    }
  }
  .desc{
    display: flex;
    background-color: #eeeeee;
    margin: 0 10px;
    padding: 5px;
    justify-content: space-around;
    .text{
      color: #ff1a90;
    }
  }
}
</style>
