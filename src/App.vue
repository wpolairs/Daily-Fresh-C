<template>
  <div id="app">
    <router-view/>
    <tab-bar />
  </div>
</template>

<script>
import tabBar from '@/components/tabBar.vue';

export default {
  components: {
    tabBar,
  },
};
</script>

<style lang="less">
body{
  margin:0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
