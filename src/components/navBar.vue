<template>
  <div>
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    },
  },
  methods: {
    onClickLeft() {
      this.$router.goBack();
    },
  },
};
</script>

<style scoped></style>
