<template>
  <div class="side-bar">
    <van-sidebar v-model="activeKey">
      <van-sidebar-item
      :title="typeof item === 'number' ? '全部' : item"
      v-for="(item, index) in sideList"
      :key="index"
      @touchend.native="handleChange($event)"/>
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
    handleChange(e) {
      console.log(e.target);
    },
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
