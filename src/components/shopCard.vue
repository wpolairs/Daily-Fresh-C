<template>
  <div class="card">
    <img :src="data.images[0]" alt="" />
    <p class="title overflow" :title="data.title">{{ data.title }}</p>
    <p class="desc overflow" :title="data.desc">{{ data.desc }}</p>
    <p class="tags"><span v-for="(tag, i) in data.tags" :key="i">{{ tag }}</span></p>
    <p class="control">
      <span class="price">￥{{ data.price }}</span>
      <span @click="addShop(data.id)">+ {{ count || '' }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    // 添加商品
    addShop(id) {
      this.count += 1;
      this.$store.dispatch('setGoodsCount', { id, num: 1 });
    },
  },
};
</script>

<style scoped lang="less">
.card {
  width: 150px;
  img {
    width: 100%;
    border-radius: 10px;
  }
  .title {
    font-weight: bold;
    text-align: left;
  }
  .desc {
    text-align: left;
    color: rgb(6, 180, 6);
  }
  .tags {
    text-align: left;
    color: rgb(153, 151, 151);
    span {
      padding-right: 4px;
    }
  }
  .control {
    padding: 0 8px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    .price {
      color: #f00;
      font-weight: bold;
    }
  }
}
</style>
