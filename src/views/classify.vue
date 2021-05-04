<template>
    <div class="classify">
        <search></search>
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
import search from '@/components/searchInput.vue';
import topNav from '@/components/topNav.vue';
import sideBar from '@/components/sideBar.vue';
import goodsList from '@/components/goodsList.vue';
import api from '@/api/index';

export default {
  components: {
    search,
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
      api.getsidebar({ type: params }).then((res) => {
        this.sideList = res;
        this.isShow = true;
      });
    },
    // 获取商品列表数据
    getGoodsList() {
      api.getGoodsList(this.$store.state.goodsList).then(async (res) => {
        if (this.goodsList.length === 0) {
          this.goodsList = res;
        } else {
          this.goodsList.list.push(...res.list);
        }
        return true;
      }).catch((error) => {
        throw error;
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
    .van-loading{
      margin-top: 150px;
    }
}
</style>
