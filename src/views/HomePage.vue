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
import order from '../components/Order'
import local from '../utils/storage'
import { Dialog } from 'vant'

export default {
  name: 'HomePage',
  data() {
    return {
      active: 0, // 0 主页   1 订单  2  我的
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg'
      ]
    }
  },
  components: {
    order
  },
  created() {
    // 获取配置的 公众号信息
    // 获取公众号授权
    // https://open.weixin.qq.com/connect/oauth2/authorize?
    // eslint-disable-next-line max-len
    // appid=wx0d994eb4e6d18b96&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
    // window.location ='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0d994eb4e6d18b96&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    // 第一步判断openid 是不是还存在

    // 判断是不是回调code redirect_uri/?code=CODE&state=STATE。
    const user = local.getUser()
    if (user) {
      // 说明此时登陆着
      console.dir(user)
    } else {
      // 未登录  去请求授权登录
      const getParam = window.location.href
      if (getParam.indexOf('code') > -1) {
        const code = this.getQueryVariable('code')
        this.$post(`weixin/getOauthAccessToken?code=${code}`, '').then((res) => {
          // 返回拼接好的授权地址
          console.dir(res.data)
          Dialog.alert(
            {
              message: JSON.stringify(res)
            }
          )
          if (res.errno === 0) {
            // 登录成功 保存用户信息
            local.saveUser(res.data)
          } else {
            Dialog.alert(
              {
                message: res.errmsg
              }
            )
          }
        })
      } else {
        // 请求后台接口 获取授权登录
        // eslint-disable-next-line camelcase
        const redirect_uri = encodeURIComponent(window.location.href)
        console.log(encodeURIComponent(redirect_uri))
        // eslint-disable-next-line camelcase
        this.$fetch(`weixin/getOauthRedirect?redirect_uri=${redirect_uri}`, '').then((res) => {
          // 返回拼接好的授权地址
          console.dir(res.data)
          Dialog.alert(
            {
              message: JSON.stringify(res)
            }
          )
          if (res.errno === 0) {
            window.location = res['data'];
          }
        })
      }
    }
  },
  methods: {
    toCreate($e) {
      // 1 京东  2 京东得物 3德邦 4申通 5 圆通 6 极兔 7 顺丰
      console.log(`点击了我${$e}`)
      this.$router.push({ path: 'sendPost', query: { type: $e } })
    },
    getQueryVariable($e) {
      const query = window.location.href.split('?')[1]
      const vars = query.split('&')
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=')
        if (pair[0] == $e) { return pair[1] }
      }
      return (false)
    }
  },
  watch: {
    active() {
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
