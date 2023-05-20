<template>
  <!--主页-->
  <div>
    <div class="content">
      <div class="main_box" >
        <div class="banner">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <img v-lazy="image" style="height: 150px;width: 100%"/>
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="tips_box">
          <van-notice-bar left-icon="volume-o" :scrollable="true" >
            <van-swipe
                vertical
                class="notice-swipe"
                :autoplay="15000"
                :show-indicators="false">
              <van-swipe-item v-for="(notice,index) in noticeList" :key="index">{{ notice.content }}
              </van-swipe-item>
            </van-swipe>
          </van-notice-bar>
        </div>
        <div class="recomed_hd_box">
          <div class="recomend_title">
            <img src="../assets/hot.png">
            <span>热门推荐</span>
          </div>
          <div class="recomend_box ">
            <div class="van-clearfix" @click="jumpMoudle('Bianming')">
              <span><img :src="bianming" width="50"/></span>
              <span>生活缴费</span>
            </div>
            <div class="van-clearfix" @click="jumpMoudle('yule')">
              <span> <img :src="yule" width="50"/></span>
              <span>娱乐</span>
            </div>
            <div class="van-clearfix" @click="jumpMoudle('shenghuo')">
              <span><img :src="shenghuo" width="50"/></span>
              <span>同城</span>
            </div>
          </div>
        </div>
        <div class="express_item" style="background-color: white;padding-top: 10px">
          <p class="sub_title">快递优选</p>
          <van-grid square :column-num="2" class="van-clearfix">
            <div class="grid_box" @click="toCreate(express)"
                 v-for="(express,index) in expressList" :key="index">
              <van-image :src="express.icon" class="fl"/>
              <div class="fl right_content">
                <p>{{express.name}}</p>
                <p>{{express.desc}}</p>
              </div>
            </div>
          </van-grid>
        </div>
        <div class="article_box">
          <img :src="require('@/assets/icon_home_new_customer.png')"/>
        </div>
      </div>
      <div class="place_holder_box"/>
    </div>
  </div>
</template>

<script>
import local from '../utils/storage'
import { Dialog, Toast } from 'vant'

import bianming from '../assets/bianming.png'
import shenghuo from '../assets/shenghuo.png'
import yule from '../assets/yule.png'

export default {
  name: 'Home',
  data() {
    return {
      noticeList: [],
      images: [],
      expressList: [],
      bianming,
      shenghuo,
      yule
    }
  },
  components: {
    // order,
  },
  created() {
    // this.getNotice()
    // 获取配置的 公众号信息
    // 获取公众号授权
    // https://open.weixin.qq.com/connect/oauth2/authorize?
    // eslint-disable-next-line max-len
    // appid=wx0d994eb4e6d18b96&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
    // window.location ='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0d994eb4e6d18b96&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    // 第一步判断openid 是不是还存在
    //
    // 判断是不是回调code redirect_uri/?code=CODE&state=STATE。
    const user = local.getUser()
    if (user) {
      // 说明此时登陆着
      console.dir(user)
      this.getIndex()
    } else {
      // 未登录  去请求授权登录
      const getParam = window.location.href
      if (getParam.indexOf('code') > -1) {
        const code = this.getQueryVariable('code')
        this.$post(`weixin/getOauthAccessToken?code=${code}`, '')
          .then((res) => {
            // 返回拼接好的授权地址
            console.dir(res.data)
            Dialog.alert(
              {
                message: JSON.stringify(res),
              },
            )
            if (res.errno === 0) {
              // 登录成功 保存用户信息
              local.saveUser(res.data)
              this.getIndex()
            } else {
              Dialog.alert(
                {
                  message: res.errmsg,
                },
              )
            }
          })
      } else {
        // 请求后台接口 获取授权登录
        // eslint-disable-next-line camelcase
        const redirect_uri = encodeURIComponent(window.location.href)
        console.log(encodeURIComponent(redirect_uri))
        // eslint-disable-next-line camelcase
        this.$fetch(`weixin/getOauthRedirect?redirect_uri=${redirect_uri}`, '')
          .then((res) => {
            // 返回拼接好的授权地址
            console.dir(res.data)
            Dialog.alert(
              {
                message: JSON.stringify(res),
              },
            )
            if (res.errno === 0) {
              window.location.href = res.data
            }
          })
      }
    }
  },
  methods: {
    toCreate($e) {
      // 1 京东  2 京东得物 3德邦 4申通 5 圆通 6 极兔 7 顺丰
      console.log(`点击了我${$e}`)
      if (!$e.isEnable) {
        Dialog.alert({
          message: '暂时不支持线上下单,请联系人工'
        })
        return
      }
      this.$router.push({ path: '/sendPost', query: { type: $e.id, name: $e.name } })
    },
    getIndex() {
      this.$fetch('Index/getIndex', '')
        .then((res) => {
          console.dir(res.data)
          if (res.errno === 0) {
            this.noticeList = res.data.noticeList
            this.images = res.data.bannerList
            this.expressList = res.data.expressList
          }
        }).catch(() => {})
    },
    getQueryVariable($e) {
      const query = window.location.href.split('?')[1]
      const vars = query.split('&')
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=')
        if (pair[0] === $e) {
          return pair[1]
        }
      }
      return (false)
    },
    toMyAddress() {
      this.$router.push({ path: 'MyAddress' })
    },
    getNotice() {
      this.$fetch('Index/getNotice', '')
        .then((res) => {
          console.dir(res.data)
          if (res.errno === 0) {
            this.noticeList = res.data
          }
        }).catch((e) => {
          console.log(`catch${e}`)
        })
    },
    jumpMoudle($module) {
      if ($module === 'Bianming') {
        this.$router.push({ name: 'Bianming' })
      } else {
        Toast('敬请期待！！！')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
}
.place_older_box {
  height: 45px;
}
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
.recomed_hd_box {
  background-image: url("../assets/bg_personal_balance.png");
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 10px;
  .recomend_title {
    padding:10px;
    img {
      vertical-align: middle;
      width: 20px;
    }
    span {
      font-size: 14px;
      margin-left: 5px;
      font-weight: 700;
    }
  }
  .recomend_box {
    display: flex;
    overflow: hidden;
    padding-top: 10px;
    padding-bottom: 15px;
    margin-bottom: 10px;
    justify-content:space-evenly;

    div:nth-child(n) {
      width: 29.9%;
      text-align: center;
      color: black;
      background-size: cover;
      background: url("../assets/bg_item_recommendation.png") no-repeat -9px -25px;
      border-radius: 8px;
      padding-top: 10px;
      padding-bottom: 10px;
      font-size: 11px;
      span:first-child {
        display: block;
        margin-bottom: 10px;
        img {
          height: 47px;
        }
      }
    }
  }

}

.sub_title {
  color: black;
  font-size: 18px;
  margin: 18px;
  font-weight: 700;
  display: none;
}
.tips_box {
  margin-bottom: 15px;
}
.grid_box {
  float: left;
  width: 44%;
  padding: 2%;
  margin-bottom: 10px;
  margin-left: 1%;
  background-color: white;
  border: 1px solid #ccc;

  .van-image {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }

  p:nth-child(1) {
    color: black;
    font-size: 16px;
    margin-top: 5px;
  }

  p:nth-child(2) {
    color: gray;
    font-size: 10px;
    margin-top: 5px;
  }

}

.article_box {
  margin-top: 10px;
  height: 50px;
     img {
       width: 100%;
       height: 88px;
       background-position: 0 92px;
       background-size: cover;
     }
}
</style>
