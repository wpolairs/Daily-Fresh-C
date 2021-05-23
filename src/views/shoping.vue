<template>
  <div class="shoping">
    <div class="shop-head">
      <van-nav-bar title="购物车" right-text="删除" fixed @click-right="OnRemove" />
    </div>
    <div class="shop-list">
        <van-checkbox-group v-model="result" ref="checkboxGroup">
          <van-checkbox
          :name="item.id"
          v-for="(item, index) in goodsList"
          label-disabled
          :key="item.id">
            <div class="goods-card van-hairline--bottom">
        <div class="goods-img">
          <img :src="item.images[0]" alt="" ref="img" />
        </div>
        <div class="info">
          <div class="title overflow-hidden">{{ item.title }}</div>
          <div class="desc overflow-hidden">{{ item.desc }}</div>
          <div class="tags" v-for="(tag, i) in item.tags" :key="i">
            {{ tag }}
          </div>
          <div>
            <span class="price">￥{{ item.price }}</span>
            <div class="count">
              <div
                class="muins"
                v-show="shopInfo[item.id]"
                @touchend="countChange(item.id, -1)"
              >
                -
              </div>
              <div class="num" v-show="shopInfo[item.id]">
                {{ shopInfo[item.id] }}
              </div>
              <div class="add" @touchend="countChange(item.id, 1, index)">
                +
              </div>
            </div>
          </div>
        </div>
      </div>
          </van-checkbox>
          <van-empty
          v-if="goodsList.length === 0"
          class="custom-image"
          image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
          description="空空如也"
        />
        </van-checkbox-group>
    </div>
    <div class="shop-submit">
      <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import { Dialog, Toast } from 'vant';

export default {
  data() {
    return {
      checked: true,
      totalPrice: 0,
      shopInfo: this.$store.state.goodsCount,
      goodsList: [],
      result: [],
    };
  },
  watch: {
    result: {
      handler(data) {
        if (this.goodsList.length) {
          this.getTotalPrice();
        }
        if (!data.length) {
          this.checked = false;
        }
      },
    },
  },
  methods: {
    getSelectedShop() {
      const shopsID = Object.keys(this.shopInfo).join();
      this.result = Object.keys(this.shopInfo).map(Number);
      api.getGoodsByIds({ value: shopsID }).then((res) => {
        this.goodsList = res.list;
        this.getTotalPrice();
      });
    },
    // 添加商品
    countChange(id, num) {
      this.$store.dispatch('setGoodsCount', { id, num });
      // this.shopInfo = JSON.parse(window.localStorage.getItem('goodsCount'));
      this.getTotalPrice();
    },
    // 计算总价格
    getTotalPrice() {
      this.totalPrice = 0;
      this.result.forEach((id) => {
        this.goodsList.forEach((item) => {
          if (item.id === id) {
            this.totalPrice += this.shopInfo[id] * item.price * 100;
          }
        });
      });
    },
    // 是否全选
    checkAll() {
      this.$refs.checkboxGroup.toggleAll(this.checked);
    },
    // 移出购物车选中的商品
    OnRemove() {
      Dialog.confirm({
        title: '',
        message: '确定要删除选中商品',
      })
        .then(() => {
          this.$store.dispatch('removeGoodsCount', this.result);
          this.result.forEach((id) => {
            this.goodsList = this.goodsList.filter((item) => item.id !== id);
          });
          this.getTotalPrice();
        // on confirm
        })
        .catch(() => {
        // on cancel
        });
    },
    // 提交订单
    onSubmit() {
      if (!this.totalPrice > 0) {
        if (this.goodsList.length === 0) {
          Toast('购物车是空的，快去挑选商品吧');
          return;
        }
        Toast('请选择要下单的商品');
        return;
      }
      this.$router.push({
        path: '/pay',
        query: {
          totalPrice: this.totalPrice,
        },
      });
    },
  },
  activated() {
    this.getSelectedShop();
  },
};
</script>

<style scoped lang='less'>
.shoping {
  height: 100vh;
  background-color: #fff;
  .van-submit-bar {
    bottom: 50px;
  }
  .shop-list {
    position: absolute;
    top: 46px;
    bottom: 100px;
    left: 0;
    right: 0;
    .van-checkbox-group{
      height: 95%;
      width: 100%;
      overflow: auto;
      padding: 20px 0;
    }
    .van-checkbox{
      display: flex;
      justify-content: center;
    }
    .goods-card {
      height: 100px;
      display: flex;
      justify-content: center;
      .goods-img img {
        width: 90px;
        height: 90px;
      }
      .info {
        width: 170px;
        margin-left: 40px;
        text-align: left;
        .overflow-hidden {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .title {
          font-size: 13px;
          margin: 5px 0;
        }
        .desc {
          font-size: 11px;
          color: #cecece;
        }
        .tags {
          display: inline-block;
          border: 1px solid #cececc;
          border-radius: 4px;
          margin: 4px;
          font-size: 10px;
          color: #cecece;
          padding: 2px;
        }
        .price {
          color: #ff1a90;
          font-size: 14px;
          float: left;
        }
        .count {
          float: right;
          font-size: 14px;
          display: flex;
          div {
            width: 30px;
            text-align: center;
          }
          &:not(.num) {
            color: #ff1a90;
            font-size: 16px;
          }
        }
      }
    }
    /deep/.custom-image .van-empty__image {
      width: 90px;
      height: 90px;
    }
  }
}
</style>
