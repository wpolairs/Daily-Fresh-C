<template>
  <div class="good-list">
    <div class="list-header van-hairline--top">
        <div
        :class="{ active: type === 'all' }"
        @touchend='handleChange("all")'
        >综合</div>
        <div
        :class="{ active: type === 'sale' }"
        @touchend='handleChange("sale")'
        >销量</div>
        <div
        :class="{ active: type === 'price' }"
        @touchend='handleChange("price")'
        >价格<van-icon :name="isUp ? 'arrow-up' : 'arrow-down'" /></div>
    </div>
    <div class="list-content">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
              <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isUp: true,
      type: 'all',
      typeObj: Object.freeze({
        all: 'all',
        sale: 'sale',
        price: 'price',
      }),
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  methods: {
    handleChange(type) {
      this.type = this.typeObj[type];
      if (this.type === 'price') {
        this.isUp = !this.isUp;
      }
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i += 1) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
  created() {

  },
};
</script>

<style scoped lang='less'>
.good-list{
  position: fixed;
  left: 80px;
  right: 0px;
  top: 140px;
  bottom: 50px;
  .list-header{
    font-size: 12px;
    color: #cecece;
    font-weight: 500;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    div{
        margin: 0 15px;
    }
    .active{
        color: #ff1a90;
        font-weight: bold;
    }
  }
  .list-content{
    position: fixed;
    bottom: 50px;
    top: 170px;
    left: 80px;
    right: 0;
    overflow: auto;
  }
}
</style>
