<template>
  <!--主页-->
  <div>
    <router-view></router-view>
    <div class="place_older_box"></div>
      <van-tabbar route>
        <van-tabbar-item replace to="/HomePage/" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/HomePage/Order" icon="search">订单</van-tabbar-item>
        <van-tabbar-item replace to="/HomePage/My" icon="friends-o">我的</van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'HomePage',
}
</script>

<style lang="less" scoped>
.content {
}
.place_older_box {
  height: 45px;
}


</style>
