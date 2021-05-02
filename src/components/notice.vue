<template>
  <div class="notice">
    <van-notice-bar left-icon="volume-o" :scrollable="false">
      <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
        <van-swipe-item v-for="(item, index) in noticeText" :key="index">{{ item }}</van-swipe-item>
      </van-swipe>
    </van-notice-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeText: ['新上架的新疆无子瓜现在降价了!', '618专享夏日优惠!!!', '新人特惠，先到先得!'],
    };
  },
};
</script>

<style scoped lang="less">
.notice-swipe {
  text-align: left;
  height: 15px;
  line-height: 15px;
}
</style>
