<template>
  <!--主页-->
  <div>

    <div class="content">
      <div class="main_box" v-show="active==0">
        <div class="banner">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <img v-lazy="image" style="height: 200px;width: 100%"/>
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="tips_box">
          <van-notice-bar left-icon="volume-o" :scrollable="false">
            <van-swipe
              vertical
              class="notice-swipe"
              :autoplay="3000"
              :show-indicators="false"
            >
              <van-swipe-item>内容 1</van-swipe-item>
              <van-swipe-item>内容 2</van-swipe-item>
              <van-swipe-item>内容 3</van-swipe-item>
            </van-swipe>
          </van-notice-bar>
        </div>
        <div class="express_item">
          <van-grid square :column-num="3">
            <van-grid-item @click="toCreate(1)">
              <van-image src="https://www.yunyangwl.com/static/img/jd.49cebbd7.png"
                         width="70"
                         height="70"/>
            </van-grid-item>
            <van-grid-item @click="toCreate(2)">
              <van-image src="https://www.yunyangwl.com/static/img/dewu.b5730518.png"
                         width="70"
                         height="70"/>
            </van-grid-item>
            <van-grid-item @click="toCreate(3)">
              <van-image src="https://www.yunyangwl.com/static/img/db.2f23ac3c.png"
                         width="70"
                         height="70"/>
            </van-grid-item>
            <van-grid-item @click="toCreate(4)">
              <van-image src="https://www.yunyangwl.com/static/img/sto.a4d50e66.png"
                         width="70"
                         height="70"/>
            </van-grid-item>
            <van-grid-item @click="toCreate(5)">
              <van-image src="https://www.yunyangwl.com/static/img/yto.42d7d066.png"
                         width="70"
                         height="70"/>
            </van-grid-item>
            <van-grid-item @click="toCreate(6)">
              <van-image
                width="70"
                height="70"
                src="https://www.yunyangwl.com/static/img/jt.a62ce4f0.png"/>
            </van-grid-item>
            <van-grid-item @click="toCreate(7)">
              <van-image
                width="70"
                height="70"
                src="https://www.yunyangwl.com/static/img/sf.c0b4d72e.png"/>
            </van-grid-item>

          </van-grid>
        </div>
      </div>
      <div class="order_box" v-show="active==1">
           <order></order>
      </div>
      <div class="me_box" v-show="active==2">

      </div>
    </div>
    <div class="tool_bar">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o">寄快递</van-tabbar-item>
        <van-tabbar-item icon="search">订单</van-tabbar-item>
        <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import order from './Order'

export default {
  name: 'HomePage',
  data () {
    return {
      active: 0,// 0 主页   1 订单  2  我的
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg'
      ]
    }
  },
  components: {
    order
  },
  created () {
    // 获取配置的 公众号信息
    // 获取公众号授权
    //https://open.weixin.qq.com/connect/oauth2/authorize?
    // appid=wx0d994eb4e6d18b96&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
    // window.location ='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0d994eb4e6d18b96&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
  },
  methods: {
    toCreate ($e) {
      // 1 京东  2 京东得物 3德邦 4申通 5 圆通 6 极兔 7 顺丰
      console.log('点击了我' + $e)
      this.$router.push({path: 'sendPost', query: { type: $e }})
    }
  },
  watch: {
    active ( ) {
      console.log(this.active)
    }
  }
}
</script>

<style lang="less" scoped>
  .notice-swipe {
    height: 40px;
    line-height: 40px;
  }
</style>
