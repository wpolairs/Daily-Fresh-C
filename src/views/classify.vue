<template>
    <div class="classify">
        <router-link class="searchBtn" tag="div" to="/search">
            <van-icon name="search" />
            <div class="text">香蕉10元一斤</div>
        </router-link>
        <top-nav @getSideList="getSideList"/>
        <template v-if="isShow">
          <side-bar :sideList="sideList" @getGoodsList="getGoodsList"
          @clearGoodsList='clearGoodsList'/>
          <goods-list
          @getGoodsList="getGoodsList"
          @clearGoodsList='clearGoodsList'
          :goodsList='goodsList'/>
        </template>
        <van-loading v-else type="spinner" color="#1989fa" />
    </div>
</template>

<script>
import topNav from '@/components/topNav.vue';
import sideBar from '@/components/sideBar.vue';
import goodsList from '@/components/goodsList.vue';
import api from '@/api/index';

export default {
  components: {
    topNav,
    sideBar,
    goodsList,
  },
  data() {
    return {
      sideList: [],
      isShow: false,
      goodsList: [],
    };
  },
  methods: {
    // 获取侧边导航数据
    getSideList(params) {
      this.isShow = false;
      console.log(params);
      api.getsidebar({ type: params }).then((res) => {
        this.sideList = res;
        this.isShow = true;
      }).catch((error) => {
        console.log(error);
      });
    },
    // 获取商品列表数据
    getGoodsList() {
      console.log(this.$store.state.goodsList);
      api.getGoodsList(this.$store.state.goodsList).then(async (res) => {
        console.log(res);
        if (this.goodsList.length === 0) {
          this.goodsList = res;
        } else {
          this.goodsList.list.push(...res.list);
        }
        return true;
      }).catch((error) => {
        console.log(error);
      });
    },
    // 清空商品列表
    clearGoodsList() {
      this.goodsList = [];
    },
  },
  created() {
    this.getSideList('时令水果');
  },
};
</script>

<style scoped lang='less'>
.classify{
    .searchBtn{
        margin: 11px auto;
        width: 355px;
        height: 33px;
        background-color: #eee;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        color: #a1a1a1;
    }
    .van-loading{
      margin-top: 150px;
    }
}
</style>
