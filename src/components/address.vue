<template>
  <div class="address">
    <nav-bar></nav-bar>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import navBar from './navBar.vue';

export default {
  components: {
    navBar,
  },
  data() {
    return {
      chosenAddressId: '1',
      list: [],
      disabledList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号',
        },
      ],
    };
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.goBack();
    },
    onAdd() {
      this.$router.push({
        name: 'edit',
        query: {
          type: 'add',
        },
      });
    },
    onEdit(item, index) {
      this.$router.push({
        path: '/edit',
        query: {
          type: 'edit',
          address: item,
          index,
        },
      });
    },
    initAddress() {
      const address = JSON.parse(localStorage.getItem('address')) || [];
      this.list = address.map((item, index) => {
        const {
          addressDetail, province, county, isDefault,
        } = item;
        return {
          ...item,
          id: `${index}`,
          address: province + county + addressDetail,
          isDefault,
        };
      });
    },
  },
  activated() {
    this.initAddress();
  },
};
</script>

<style scoped lang="less">
.address {
  background-color: #eeeeee86;
  height: 93vh;
}
</style>
