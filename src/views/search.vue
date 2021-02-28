<template>
  <div class="search">
    <div class="search-head">
    <van-icon name="arrow-left" size="40px"/>
      <form action="/" class="search-content">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @input="onInput">
          <template #action>
            <div @click="onSearch(value)">搜索</div>
          </template>
        </van-search>
      </form>
    </div>
    <div class="search-res" v-show="isShow">
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check='false'
        >
          <van-cell
          v-for="item in searchList"
          :key="item"
          @click="onSearch(item)">
            <template>
                <span class="custom-title" v-html="searchText(item)"></span>
            </template>
          </van-cell>
        </van-list>
    </div>
    <div class="list-content" v-show="!isShow">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check='false'
            >
              <div class="goods-card van-hairline--bottom"
                   v-for="(item, index) in goodsList"
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
import api from '@/api';

export default {
  data() {
    return {
      value: '',
      timer: null,
      searchList: [],
      loading: false,
      finished: false,
      page: 1,
      size: 10,
      goodsList: [],
      total: '',
      goodsCount: this.$store.state.goodsCount,
      isShow: true,
    };
  },
  methods: {
    onSearch(val) {
      if (!val) {
        return;
      }
      this.value = val;
      console.log('搜索', val);
      api.searchGoods({ type: val, page: this.page, size: this.size }).then((res) => {
        this.isShow = false;
        this.goodsList = [...this.goodsList, ...res.list];
        if (this.goodsList.length >= res.total) {
          this.finished = true;
        }
        console.log(res);
      });
    },
    onInput(val) {
      if (val === '') {
        this.goodsList = [];
        this.page = 1;
        this.value = '';
        return;
      }
      console.log(val);
      clearInterval(this.timer);
      this.isShow = true;
      this.timer = setTimeout(() => {
        console.log(val, '输入');
        api.likeSearch({ likeValue: val }).then((res) => {
          this.searchList = res.result;
          this.loading = false;
          // this.finished = true;
          console.log(this.searchList);
        });
      }, 500);
    },
    searchText(text) {
      const reg = new RegExp(this.value, 'g');
      return text.replace(reg, this.value.fontcolor('red'));
    },
    // 添加商品
    countChange(id, num, index) {
      this.$store.dispatch('setGoodsCount', { id, num });
      if (num === -1) {
        return;
      }
      // 商品飞入购物车动画
      console.log(index);
    //   Animate(this.getImgPosition(index));
    },
    onLoad() {
      this.loading = true;
      this.page += 1;
      this.onSearch(this.value);
    },
  },
};
</script>

<style scoped lang='less'>
.search {
  height: 100vh;
  background: #fff;
  position: relative;
  z-index: 1001;
  .search-head {
    display: flex;
    align-items: center;
    justify-content: center;
    .search-content {
      flex: 1;
    }
  }
  .search-res{
    .van-cell{
        padding-left: 1rem;
    }
  }
    .list-content{
    position: fixed;
    bottom: 50px;
    top: 55px;
    left: 0;
    right: 0;
    overflow: auto;
    .goods-card{
        height: 100px;
        display: flex;
        justify-content: center;
        .goods-img img{
        width: 90px;
        height: 90px;
        }
        .info{
        width: 170px;
        margin-left: 40px;
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
