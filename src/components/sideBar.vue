<template>
  <div class="side-bar">
    <van-sidebar v-model="activeKey" @change="handleChange">
      <van-sidebar-item
      :title="typeof item === 'number' ? '全部' : item"
      v-for="(item, index) in sideList"
      :key="index"/>
    </van-sidebar>
  </div>
</template>

<script>
export default {
  props: ['sideList'],
  data() {
    return {
      activeKey: 0,
      goodsList: {
        type: '',
        page: 1,
        size: 10,
        sort: 'all',
      },
    };
  },
  methods: {
    handleChange() {
      console.log(this.activeKey);
      this.goodsList.type = this.sideList[this.activeKey];
      this.$store.dispatch('setGoodList', this.goodsList);
      this.$emit('getGoodsList');
    },
  },
  created() {
    this.handleChange();
  },
};
</script>

<style scoped lang='less'>
.side-bar{
  position: fixed;
  top: 135px;
  bottom: 50px;
  overflow: auto;
  &::-webkit-scrollbar{
      width: 0;
  }
}
</style>
