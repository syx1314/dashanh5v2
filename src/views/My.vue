<template>
  <!--主页-->
  <div>
    <div class="content me_box">
        <div class="my_header van-clearfix">
          <van-image class="fl" :src="headerUrl"
                     round width="50" height="50"/>
          <div class="fl" style="margin-left: 15px">
            <p class="nick_name">{{username}}</p>
            <p>手机号:{{mobile}}</p>
          </div>
        </div>
        <div class="menu_box">
          <p @click="toMyAddress">
            我的地址
            <span class="fr"> > </span>
          </p>
          <p>
            充值订单
            <span class="fr"> > </span>
          </p>
          <p>
            联系客服
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
import loaclStorage  from '../utils/storage'
export default {
  name: 'My',
  data() {
    return {
      headerUrl: '../assets/icon_home_new_customer.png',
      username: '我是一只小小小鸟',
      mobile: '未知',
    }
  },
  created() {
    const user = loaclStorage.getUser()
    if (user) {
      const customer = user.customer
      this.username = customer.username
      this.headerUrl = customer.headimg
      this.mobile = customer.mobile
    }
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
