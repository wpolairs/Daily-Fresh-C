<template>
  <div id="app">
    <transition :name='transitionName' :mode="modeType">
      <keep-alive>
        <router-view class="view"/>
      </keep-alive>
    </transition>
    <tab-bar />
  </div>
</template>

<script>
import tabBar from '@/components/tabBar.vue';

export default {
  components: {
    tabBar,
  },
  data() {
    return {
      transitionName: 'left',
      modeType: '',
    };
  },
  watch: {
    $route(to, from) {
      if (to.name === 'classify' && from.name === 'search') {
        this.$router.back = true;
      }
      if ((to.name === 'classify' && from.name === 'search')
      || (to.name === 'search' && from.name === 'classify')) {
        if (this.$router.back) {
          this.modeType = 'out-in';
          this.transitionName = 'right';
        } else {
          this.modeType = 'in-out';
          this.transitionName = 'left';
        }
        this.$router.back = false;
      } else {
        this.modeType = 'out-in';
        this.transitionName = '';
      }
    },
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
.view{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  transition: transform .3s linear;
  background-color: #fff;
}
.overflow{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.left-enter, .right-leave-to{
  transform: translate(100%, 0);
}
</style>
