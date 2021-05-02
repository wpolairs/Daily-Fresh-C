<template>
    <div class="like">
      <h4 class="tabTitle">猜你喜欢</h4>
      <div class="list">
        <shop-card v-for="item in productData" :key="item.id" :data='item'></shop-card>
      </div>
    </div>
</template>

<script>
import api from '@/api/index';
import shopCard from './shopCard.vue';

export default {
  props: {

  },
  components: {
    shopCard,
  },
  data() {
    return {
      productData: [],
    };
  },
  methods: {
    getGoodsList() {
      api.getGoodsList({
        type: 2,
        page: 1,
        size: 10,
        sort: 'all',
      }).then((res) => {
        this.productData = res.list;
      }).catch((error) => {
        console.log(error);
      });
    },
  },
  created() {
    this.getGoodsList();
  },
};
</script>

<style scoped lang='less'>
.like{
  background-color: #eeeeee8a;
  box-sizing: border-box;
  border-radius: 10px;
  margin: 0 10px;
  margin-bottom: 55px;
  .tabTitle{
    text-align: left;
    padding: 5px 20px;
  }
  .list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 15px;
  }
}
</style>
