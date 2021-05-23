<template>
  <div class="pay">
    <nav-bar />
    <div class="payInfo">
      <p>支付剩余时间 <van-count-down :time="time" /></p>
      <p class="price">￥{{ totalPrice }}</p>
      <p>每日优选——订单编号{{ orderNum }}</p>
    </div>
    <div class="payMethod">
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell title="微信支付" clickable @click="radio = '1'">
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
          <van-cell title="支付宝支付" clickable @click="radio = '2'">
            <template #right-icon>
              <van-radio name="2" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <van-button
      @click="onSubmit"
      :loading='loading'
      loading-text="支付中..."
      type="primary"
      round>免密支付</van-button>
  </div>
</template>
<script>
import { Dialog, Toast } from 'vant';
import navBar from '@/components/navBar.vue';

export default {
  components: {
    navBar,
  },
  data() {
    return {
      time: 30 * 60 * 60 * 1000,
      radio: '1',
      loading: false,
    };
  },
  computed: {
    orderNum() {
      return Date.now();
    },
    totalPrice() {
      return (this.$route.query.totalPrice / 100).toFixed(2);
    },
  },
  methods: {
    onSubmit() {
      Dialog.confirm({
        title: '订单支付',
        message: `共计 ${this.totalPrice}`,
      })
        .then(() => {
          // on confirm
          this.loading = true;
          setTimeout(() => {
            Toast('支付成功');
            this.loading = false;
          }, 1500);
        })
        .catch(() => {
          // on cancel
          Toast('取消支付');
        });
    },
  },
};
</script>

<style scoped lang="less">
.pay {
  .payInfo {
    margin-top: 40px;
    .van-count-down {
      display: inline-block;
      font-size: 12px;
    }
    .price {
      font-size: 16px;
      font-weight: bold;
    }
  }
  .payMethod {
    margin-top: 50px;
  }
  .van-button--round {
    width: 80%;
    min-width: 300px;
    margin-top: 50px;
  }
}
</style>
