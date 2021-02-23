<template>
    <div class="classify">
        <div class="searchBtn">
            <van-icon name="search" />
            <div class="text">香蕉10元一斤</div>
        </div>
        <top-nav @getSideList="getSideList"/>
        <side-bar :sideList="sideList"/>
    </div>
</template>

<script>
import topNav from '@/components/topNav.vue';
import sideBar from '@/components/sideBar.vue';
import axios from '@/api/index';

export default {
  components: {
    topNav,
    sideBar,
  },
  data() {
    return {
      sideList: [],
    };
  },
  methods: {
    getSideList(params) {
      console.log(params);
      axios.getsidebar(params).then((res) => {
        this.sideList = res.slice(1);
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
}
</style>
