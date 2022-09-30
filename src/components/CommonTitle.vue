<template>
    <div class='bd'>
        <div class="title">
          <van-nav-bar
              :title="title"
              left-text="返回"
              left-arrow
              @click-left="onClickLeft"
          />
        </div>
      <div class="place_holder_box"/>
    </div>
</template>

<script>
export default {
  name: 'CommonTitle',
  props: ['title'],
  methods: {
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  position: fixed;
  width: 100%;
  z-index: 100;
}
.place_holder_box {
  height: 45px;
}
</style>
