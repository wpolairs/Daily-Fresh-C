<template>
  <div id="app">
    <van-button type="primary">主要按钮</van-button>
    <router-view/>
  </div>
</template>

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
  .box{
    width: 750px;
    height: 100px;
    background: rgb(247, 0, 0);
  }
}

</style>
