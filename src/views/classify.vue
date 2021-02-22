<template>
    <div class="classify">
        <div class="searchBtn">
            <van-icon name="search" />
            <div class="text">香蕉10元一斤</div>
        </div>
        <top-nav />
    </div>
</template>

<script>
import topNav from '@/components/topNav.vue';

export default {
  components: {
    topNav,
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
