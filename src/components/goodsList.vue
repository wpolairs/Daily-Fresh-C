<template>
  <div class="good-list">
    <div class="list-header van-hairline--top">
        <div
        :class="{ active: sort === 'all' }"
        @touchend='handleChange("all")'
        >综合</div>
        <div
        :class="{ active: sort === 'sale' }"
        @touchend='handleChange("sale")'
        >销量</div>
        <div
        :class="{ active: sort === 'price' }"
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
              <div class="goods-card van-hairline--bottom"
              v-for="item in oldGoodsList" :key="item.id">
                <div class="goods-img">
                  <img :src="item.images[0]" alt="">
                </div>
                <div class="info">
                  <div class="title overflow-hidden">{{ item.title }}</div>
                  <div class="desc overflow-hidden">{{ item.desc }}</div>
                  <div class="tags" v-for="(tag, i) in item.tags" :key="i">{{ tag }}</div>
                  <div><span class="price">￥{{ item.price }}</span>
                  <van-icon style="float:right" name="add" color="#ff1a90" size="36px"/></div>
                </div>
              </div>
          </van-list>
        </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  props: ['goodsList'],
  data() {
    return {
      isUp: true,
      // 排序方式
      sort: 'all',
      typeObj: Object.freeze({
        all: 'all',
        sale: 'sale',
        price: 'price',
      }),
      loading: false,
      finished: false,
      refreshing: false,
      oldGoodsList: [],
      lock: true,
    };
  },
  methods: {
    handleChange(type) {
      this.sort = this.typeObj[type];
      this.$store.state.goodsList.sort = this.sort;
      if (this.type === 'price') {
        this.isUp = !this.isUp;
      }
      this.$emit('getGoodsList');
    },
    onLoad() {
      // 没有更多数据时
      if (this.finished) {
        return;
      }
      if (this.goodsList.list !== undefined && this.lock) {
        this.oldGoodsList.push(...this.goodsList.list);
      }
      console.log(this.refreshing, this.lock, 'if');
      if (this.refreshing) {
        this.goodsList.list = [];
        this.$emit('getGoodsList');
        this.refreshing = false;
      }
      if (!this.lock) {
        this.lock = true;
        this.$store.state.goodsList.page += 1;
        this.$emit('getGoodsList');
        console.log(this.oldGoodsList, this.goodsList.list, 'res---------------');
        // this.oldGoodsList.push(...this.goodsList.list);
        if (this.goodsList.total <= this.goodsList.list.length) {
          console.log('数据全部拿到');
          this.finished = true;
        }
        this.lock = false;
      }
      this.loading = false;
    },
    onRefresh() {
      console.log('1');
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      // this.onLoad();
    },
  },
  created() {
    // if (this.goodsList.list !== undefined) {
    //   console.log('进来了');
    //   this.oldGoodsList = this.goodsList.list;
    // }
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
    .goods-card{
      height: 100px;
      display: flex;
      .goods-img img{
        width: 90px;
        height: 90px;
      }
      .info{
        width: 170px;
        margin-left: 20px;
        text-align: left;
        .overflow-hidden{
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .title{
          font-size: 13px;
          margin: 5px 0;
        }
        .desc{
          font-size: 11px;
          color: #cecece;
        }
        .tags{
          display: inline-block;
          border: 1px solid #cececc;
          border-radius: 4px;
          margin: 4px;
          font-size: 10px;
          color: #cecece;
          padding: 2px;
        }
        .price{
          color: #ff1a90;
          font-size: 14px;
          float: left;
        }
      }
    }
  }
}
</style>
