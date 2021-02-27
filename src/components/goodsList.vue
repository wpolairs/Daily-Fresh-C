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
        :class="{ active: sort === 'price-up' || sort === 'price-down' }"
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
            :immediate-check='false'
            >
              <div class="goods-card van-hairline--bottom"
                   v-for="(item, index) in goodsList.list"
                   :key="item.id">
                <div class="goods-img">
                  <img :src="item.images[0]" alt="" ref="img">
                </div>
                <div class="info">
                  <div class="title overflow-hidden">{{ item.title }}</div>
                  <div class="desc overflow-hidden">{{ item.desc }}</div>
                  <div class="tags" v-for="(tag, i) in item.tags" :key="i">{{ tag }}</div>
                  <div><span class="price">￥{{ item.price }}</span>
                  <div class="count">
                    <div class="muins"
                    v-show="goodsCount[item.id]"
                    @touchend='countChange(item.id, -1)'>-</div>
                    <div class="num"
                    v-show="goodsCount[item.id]">{{ goodsCount[item.id] }}</div>
                    <div class="add" @touchend='countChange(item.id, 1, index)'>+</div>
                  </div>
                </div>
              </div>
          </van-list>
        </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import Animate from '@/tools/';

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
      page: 1, // 当前页面
      // oldGoodsList: [],
      timer: null,
      t: null,
      goodsCount: this.$store.state.goodsCount,
    };
  },
  watch: {
    goodsList: {
      handler(data) {
        this.finished = false;
        if (data.list !== undefined) {
          this.loading = false;
          if (data.total <= data.list.length) {
            console.log('数据全部拿到');
            this.finished = true;
            this.loading = true;
          }
          return;
        }
        this.loading = true;
      },
      deep: true,
    },
  },
  methods: {
    // 商品筛选
    handleChange(type) {
      this.loading = true;
      if (type === 'price') {
        this.isUp = !this.isUp;
        this.sort = this.isUp ? 'price-up' : 'price-down';
      } else {
        this.sort = this.typeObj[type];
      }
      this.$store.dispatch('setRequestInfo', {
        sort: this.sort,
        page: 1,
      });
      this.$emit('clearGoodsList');
      this.$emit('getGoodsList');
    },
    // 商品列表懒加载
    onLoad() {
      // true表示正在加载数据
      this.loading = true;
      console.log('发送了');
      this.$store.dispatch('setRequestInfo', {
        page: this.page + 1,
      });
      console.log(this.$store.state.goodsList.page);
      this.$emit('getGoodsList');
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
    // 下拉刷新
    onRefresh() {
      this.loading = true;
      // 清空列表数据
      this.$emit('clearGoodsList');
      this.$store.state.goodsList.page = 1;
      // 重新加载数据
      this.$emit('getGoodsList');
      this.refreshing = false;
      this.finished = false;
    },
    // 添加商品
    countChange(id, num, index) {
      this.$store.dispatch('setGoodsCount', { id, num });
      if (num === -1) {
        return;
      }
      // 商品飞入购物车动画
      Animate(this.getImgPosition(index));
    },
    // 获取图片位置
    getImgPosition(index) {
      // 当前点击商品图片位置
      const { img } = this.$refs;
      const {
        top: imgTop, left: imgLeft, width, height,
      } = img[index].getBoundingClientRect();
      const { top: carTop, left: carLeft } = document.getElementById('shopCar').getBoundingClientRect();
      const disx = carLeft - imgLeft;
      const disy = carTop - imgTop;
      return {
        imgLeft,
        imgTop,
        width,
        height,
        disx,
        disy,
        src: img[index].src,
      };
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
        .count{
          float: right;
          font-size: 14px;
          display: flex;
          div{
            width: 30px;
            text-align: center;
          }
          &:not(.num){
            color: #ff1a90;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
