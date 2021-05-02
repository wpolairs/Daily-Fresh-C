<template>
  <div class="search">
    <router-link class="searchBtn" to="/search" custom v-slot="{ navigate }">
      <div @click="navigate" role="link">
        <van-icon name="search" />
        <div class="text">香蕉10元一斤</div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped clalng="less">
.searchBtn {
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
</style>
