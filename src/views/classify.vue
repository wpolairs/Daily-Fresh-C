<template>
    <div class="classify">
        <div class="searchBtn">
            <van-icon name="search" />
            <div class="text">香蕉10元一斤</div>
        </div>
        <top-nav @getSideList="getSideList"/>
        <template v-if="isShow">
          <side-bar :sideList="sideList"/>
          <goods-list />
        </template>
        <van-loading v-else type="spinner" color="#1989fa" />
    </div>
</template>

<script>
import topNav from '@/components/topNav.vue';
import sideBar from '@/components/sideBar.vue';
import goodsList from '@/components/goodsList.vue';
import axios from '@/api/index';

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
    };
  },
  methods: {
    getSideList(params) {
      this.isShow = false;
      console.log(params);
      axios.getsidebar({ type: params }).then((res) => {
        this.sideList = res;
        this.isShow = true;
      }).catch((error) => {
        console.log(error);
      });
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
