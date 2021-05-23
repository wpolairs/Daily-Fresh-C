<template>
  <div class="edit">
    <nav-bar></nav-bar>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      :address-info="currentAddress"
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';
import navBar from './navBar.vue';

export default {
  components: {
    navBar,
  },
  data() {
    return {
      areaList,
      searchResult: [],
      currentAddress: {},
    };
  },
  watch: {
  },
  methods: {
    // 判断是新增地址还是编辑地址
    initAddress() {
      const { path, query } = this.$route;
      if (path === '/edit') {
        if (query.type === 'edit') {
          this.currentAddress = query.address;
        } else this.currentAddress = {};
      }
    },
    onSave(content) {
      const { query } = this.$route;
      const address = JSON.parse(localStorage.getItem('address')) || [];
      if (query.type === 'edit') {
        address[parseInt(query.index, 10)] = content;
        localStorage.setItem('address', JSON.stringify(address));
      } else {
        address.push(content);
        localStorage.setItem('address', JSON.stringify(address));
      }
      Toast('保存成功');
    },
    // 删除地址
    onDelete() {
      Toast('delete');
      const { query } = this.$route;
      const address = JSON.parse(localStorage.getItem('address'));
      address.splice(parseInt(query.index, 10), 1);
      localStorage.setItem('address', JSON.stringify(address));
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
  activated() {
    this.initAddress();
  },
};
</script>

<style scoped lang="less">
.edit {
  height: 100%;
  background-color: #fff;
  z-index: 2;
}
</style>
<style lang='less'>
.van-picker-column__item{
  // height: 22px!important;
  font-size: 14px !important;
}
</style>
