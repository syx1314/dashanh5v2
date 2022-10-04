<template>
  <!--主页-->
  <div>
    <div class="content me_box">
        <div class="my_header van-clearfix">
          <van-image class="fl" :src="require('@/assets/icon_home_new_customer.png')"
                     round width="50" height="50"/>
          <div class="fl" style="margin-left: 15px">
            <p class="nick_name">我是一只小小小鸟</p>
            <p>手机号</p>
          </div>
        </div>
        <div class="menu_box">
          <p @click="toMyAddress">
            我的地址
            <span class="fr"> > </span>
          </p>
          <p>
            帮助中心
            <span class="fr"> > </span>
          </p>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'My',
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    toMyAddress() {
      this.$router.push({ name: 'MyAddress' })
    },
  }
}
</script>

<style lang="less" scoped>
.content {
  background-color: white;
  height: 100%;
}
.place_older_box {
  height: 45px;
}
.me_box {
  background-color: #Fbfbfb;
  height: 100%;

  .my_header {
    padding: 30px 20px;
    background-color: white;

    .nick_name {
      margin-top: 5px;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 5px;
    }
  }

  .menu_box {
    margin: 10px;
    border-radius: 20px;

    p {
      display: block;
      padding: 15px;
      background-color: white;
    }
  }
}
</style>
