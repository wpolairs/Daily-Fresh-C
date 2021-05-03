<template>
    <div class="me">
        <div class="head">
            <div class="userInfo">
                <van-image
                round
                width="100px"
                height="100px"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
                />
                <div class="userName">{{ userName }}</div>
            </div>
            <div class="prompt">
                <van-icon class="service" name="service" size="50px" />
                <van-icon name="bell" size="50px" />
            </div>
        </div>
        <div class="pointCard">
            <div>
                <p class="money"><span>￥</span>{{ balance }}</p>
                <p>余额</p>
            </div>
            <div>
                <p>{{ coupon }}</p>
                <p>优惠券</p>
            </div>
            <div>
                <p>{{ fruitCurrency }}</p>
                <p>果币</p>
            </div>
            <div>
                <p>{{ point }}</p>
                <p>积分兑换</p>
            </div>
        </div>
        <div class="order">
            <div class="title">
                <h2>我的订单</h2>
                <h5>全部订单<van-icon name="arrow"/></h5>
            </div>
            <div class="orderInfo">
                <div>
                <van-icon name="card" size="35px" color="#db1974"/>
                <p>待支付</p>
            </div>
            <div>
                <van-icon name="gift-card" size="35px" color="#db1974"/>
                <p>待配送</p>
            </div>
            <div>
                <van-icon name="goods-collect" size="35px" color="#db1974"/>
                <p>配送中</p>
            </div>
            <div>
                <van-icon name="more" size="35px" color="#db1974"/>
                <p>待评价</p>
            </div>
            <div>
                <van-icon name="send-gift" size="35px" color="#db1974"/>
                <p>售后/退款</p>
            </div>
            </div>
        </div>
        <div class="myService">
            <div class="title">
                <h2>我的服务</h2>
            </div>
            <div class="serviceInfo">
              <div @click="setAddress">
                  <van-icon name="map-marked" size="35px" color="#08c4c4bd"/>
                  <p>收货地址</p>
              </div>
              <div>
                  <van-icon name="service" size="35px" color="#08c4c4bd"/>
                  <p>客服和帮助</p>
              </div>
              <div>
                  <van-icon name="setting" size="35px" color="#08c4c4bd"/>
                  <p>设置</p>
              </div>
              <div>
                  <van-icon name="share" size="35px" color="#08c4c4bd"/>
                  <p>推荐有礼</p>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      money: '5200000',
      userName: 'wpolairs',
      coupon: '100',
      fruitCurrency: '1314',
      point: '9999',
    };
  },
  methods: {
    // 设置收货地址
    setAddress() {
      this.$router.push({ path: '/address' });
    },
  },
  computed: {
    balance() {
      return this.money > 9999 ? `${this.money / 10000}万` : this.money;
    },
  },
};
</script>
<style scoped lang='less'>
.me{
    height: 100vh;
    background-color: rgb(233, 229, 229);
  .head{
    height: 100px;
    background-color: rgb(221, 208, 190);
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 20px;
    .prompt{
      display: flex;
      width: 50%;
      justify-content: flex-end;
      .service{
          margin-right: 20px;
      }
    }
    .userInfo{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 50%;
        .userName{
            font-size: 20px;
            font-weight: 500;
            margin-left: 20px;
        }
    }
  }
  .pointCard{
    margin: 10px auto;
    display: flex;
    border-radius: 5px;
    background-color: #fff;
    width: 95%;
    .money{
        margin: 14px 0 10px;
    }
    >div{
        width: 25%;
        font-size: 16px;
    }
  }
  .order{
    margin: 0 auto;
    padding-bottom: 10px;
    width: 95%;
    background-color: #fff;
    border-radius: 5px;
    .title{
        display: flex;
        justify-content: space-between;
        padding: 0 8px;
        h2,h5{
            height: 15px;
            line-height: 15px;
            vertical-align: middle;
        }
    }
    .orderInfo{
        display: flex;
        >div{
          width: 20%;
        }
    }
  }
  .myService{
      background-color: #fff;
      border-radius: 5px;
      margin: 0 auto;
      padding-bottom: 10px;
      width: 95%;
      margin-top: 10px;
      .title{
          display: flex;
          padding: 0 8px;
      }
      .serviceInfo{
          display: flex;
          >div{
              width: 25%;
              flex-wrap: wrap;
          }
      }
  }
}
</style>
