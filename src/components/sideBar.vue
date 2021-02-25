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
    };
  },
  methods: {
    handleChange() {
      this.$store.dispatch('setRequestInfo', {
        type: this.sideList[this.activeKey],
        page: 1,
      });
      this.$emit('clearGoodsList');
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
