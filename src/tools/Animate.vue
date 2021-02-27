<template>
  <div
    class="item"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      top: `${imgTop}px`,
      left: `${imgLeft}px`,
      opacity,
      transform: `translate(${disx}px, ${disy}px) scale(${sx}`
    }"
    v-if="destroy"
  >
    <img :src="src" alt="" />
  </div>
</template>

<style scoped lang='less'>
.item {
  position: fixed;
  z-index: 1000;
  transition: all 1s;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>
