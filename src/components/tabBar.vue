<template>
    <van-tabbar route :fixed='true'>
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/classify" icon="qr-invalid">分类</van-tabbar-item>
      <van-tabbar-item replace to="/shoping" icon="shopping-cart-o"
      :badge="count"
      id="shopCar">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/me" icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      // count: '',
    };
  },
  computed: {
    count() {
      const goodsCountArr = Object.values(this.$store.state.goodsCount);
      const num = goodsCountArr.reduce((pre, item) => pre + item, 0);
      return num >= 99 ? 99 : num;
    },
  },
};
</script>

<style scoped lang='less'>
</style>
