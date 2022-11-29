<template>
  <!--主页-->
  <div>
    <van-sticky>
      <title-view title="便民缴费"/>
    </van-sticky>
      <div class="banner" style="height: 150px">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" style="height: 150px;width: 100%"/>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="content van-clearfix" >
        <van-tabs v-model="active" title-active-color="#00000f" color="#1989fa"
                  @change="onClickTab" >
          <van-tab title="话费充值" >
           <div style="background: white;padding: 15px 0 10px">
             <div class="account_box">
               <van-field
                   class="account_value_box"
                   v-model="phonevalue"
                   placeholder="输入手机号自动匹配运营商"
                   left-icon = "discount"
                   label-align="top"
                   size ="15"
               />
               <span class="isp_box">{{isp}}</span>
             </div>
             <!--套餐选择-->
             <div class="taocan_box" v-for="(taoCan , index) in taoCanList"
                  :key="index">
               <span class="sub_title">{{taoCan.cate}}</span>
               <van-radio-group v-model="checked" direction="horizontal"
                                icon-size="0px" class="van-clearfix">
                 <van-radio @:name="product.id" v-for="(product,keyIndex) in taoCan.products"
                            :key="keyIndex" v-on:click="radioClick(product)">
                   <div class="radio_title">{{product.name}}</div>
                   <div style="color: #317ee7">仅售￥{{product.y_price}}</div>
                 </van-radio>
               </van-radio-group>
             </div>
           </div>
           <!--说明-->
            <div class="remark">
              <p style="white-space: normal;">话费（移动）售后为到账3日内，过时不候！！！</p>
              <p style="white-space: normal;">话费（电信、联通）售后为到账后10 日内<br/></p>
              <p style="white-space: normal;"><strong>话费以下情形无售后：</strong></p>
              <p style="white-space: normal;">1、空号错号虚拟号，携号转网</p>
              <p style="white-space: normal;">2、主副卡&nbsp;&nbsp;</p>
              <p style="white-space: normal;">3、一卡多号&nbsp;</p>
              <p style="white-space: normal;">4、公司集团号</p>
              <p style="white-space: normal;">5、在本渠道下单的同时在其他任意渠道（包括官方）充值成功</p>
            </div>
          </van-tab>
          <van-tab title="电费充值">
            <div style="background: white;padding: 15px 0 10px">
            <div class="account_box">
              <van-field
                  class="account_value_box"
                  v-model="dianvalue"
                  placeholder="请输入电费户号"
                  left-icon = "discount"
                  label-align="top"
              />
            </div>
            <div class="account_box">
              <van-field
                  v-model="area"
                  placeholder="请选择省份城市"
                  right-icon = "arrow"
                  readonly
                  @click="showArea = !showArea"
              />
            </div>
            <van-popup v-model:show="showArea"  position="bottom" round>
              <van-area
                  title="省份城市选择"
                  :area-list="areaList1"
                  columns-num="2"
                  @change = "selectArea"
                  @confirm ="showArea = false"
                  @cancel = "showArea = false"
                  :columns-placeholder="['请选择', '请选择']"
              />
            </van-popup>

            <!--套餐选择-->
            <div class="taocan_box" v-for="(taoCan , index) in taoCanList" :key="index">
              <span class="sub_title">{{taoCan.cate}}</span>
              <van-radio-group v-model="checked" direction="horizontal"
                               icon-size="0px" class="van-clearfix" >
                <van-radio @:name="product.id" v-for="(product,keyIndex) in taoCan.products"
                           :key="keyIndex" v-on:click="radioClick(product)">
                  <div class="radio_title">{{product.name}}</div>
                  <div style="color: #317ee7">仅售￥{{product.y_price}}</div>
                </van-radio>
              </van-radio-group>
            </div>
            </div>
            <!--说明-->
            <div class="remark">
              <p><span style="color: rgb(79, 129, 189);">电费充值规则：</span></p>
              <p><span style="color: rgb(79, 129, 189);">
                1、南网：广东/广西/云南/贵州/海南</span></p>
              <p><span style="color: rgb(79, 129, 189);">
                <span style="color: rgb(79, 129, 189);">&nbsp; &nbsp; &nbsp;</span>
                <span style="color: rgb(79, 129, 189);">
                  冀北：</span>承德/秦皇岛/张家口/廊坊/唐山</span></p><p>
              <span style="color: rgb(79, 129, 189);"><span style="color: rgb(79, 129, 189);">
                &nbsp; &nbsp; &nbsp;其他区域为国网区域</span>
              </span></p><p><span style="color: rgb(79, 129, 189);">
              2、<span style="color: rgb(79, 129, 189);">不支持上海/新疆
              <span style="color: rgb(79, 129, 189);">/西藏</span></span></span></p><p>
              <span style="color: rgb(79, 129, 189);">
              3、南网区域需选择验证方式并填写</span></p><p><span style="color: rgb(79, 129, 189);">
              <span style="color: rgb(79, 129, 189);">
              4、<span style="color: rgb(79, 129, 189);">国网区域需选择城市（地级市）</span></span>
                </span></p><p><span style="color: rgb(79, 129, 189);">
                <span style="color: rgb(79, 129, 189);">
              5、</span>一个号码只能在上次订单完成后才能再次提单</span></p><p><span style="color: rgb(79, 129, 189);">
                 <span style="color: rgb(79, 129, 189);">
              6、小额面值叠加：</span><span style="color: rgb(79, 129, 189);">国网区域
                 </span><span style="color: rgb(79, 129, 189);">
                 10-500元，欠费不超过300元；南网区域100-1000，欠费不超过500元；冀北欠费可充，但需先缴清已出账单的欠费</span></span>
                 </p><p><span style="color: rgb(79, 129, 189);">
              7、72小时未充完自动回调</span></p><p><span style="color: rgb(79, 129, 189);">
              8、部分充值中的订单不会继续充值（冀北例外），我们统一于23:00 以后进行结算部分退款，此前您可重新下单</span></p>
            </div>
          </van-tab>
        </van-tabs>
      </div>
  </div>
</template>

<script>

// 便民缴费

// eslint-disable-next-line import/extensions
import titleView from '../components/CommonTitle'

import { Dialog, Toast } from 'vant'
import onWeixinBridgeReady from '../utils/PayUtils'
import { areaList } from '@vant/area-data'
import b1 from '../assets/b1.png'
import b2 from '../assets/b2.png'

export default {
  name: 'Bianming',
  data() {
    return {
      active: 0, // 1   1, 3
      checked: 1, // 套餐选择
      taoCanList: [],
      phonevalue: null,
      dianvalue: null,
      isp: '',
      province: '',
      city: '',
      area: '',
      showArea: false,
      areaList1: areaList,
      images: [b1, b2]
    }
  },
  components: {
    titleView
  },
  created() {
    this.loadTaocan()
    this.getCity()
  },
  methods: {
    selectArea($e, $selectedValues) {
      console.dir($selectedValues)
      this.province = $selectedValues[0].name
      this.city = $selectedValues[1].name
      this.area = `${this.province}-${this.city}`
    },
    loadTaocan() {
      const type = this.active === 0 ? 1 : 3
      this.$fetch(`Index/get_product?type=${type}`).then((res) => {
        console.log(res)
        if (res && res.errno === 0) {
          this.taoCanList = res.data
        } else {
          console.log(res.errmsg)
        }
      })
    },
    get_product_mobile() {
      this.$post('Index/get_product_mobile', {
        mobile: this.phonevalue
      }).then((res) => {
        console.log(res)
        if (res && res.errno === 0) {
          this.taoCanList = res.data.lists
          this.isp = res.data.guishu.city + res.data.guishu.ispstr
        } else {
          console.log(res.errmsg)
        }
      })
    },
    getCity() {
      this.$fetch('Open/get_city').then((res) => {
        console.log(res)
      })
    },
    onClickTab() {
      this.loadTaocan()
    },
    radioClick($product) {
      if (!this.phonevalue && !this.dianvalue) {
        Toast('请输入充值号码')
        return
      }
      console.log($product.id)
      if (this.active === 0) {
        // 话费
        this.createOrder(this.phonevalue, $product.id, null)
      } else {
        // 电费
        // eslint-disable-next-line no-lonely-if
        if (!this.province || !this.city) {
          Toast('请选择省份城市')
        } else {
          this.createOrder(this.dianvalue, $product.id, this.area)
        }
      }
    },
    // eslint-disable-next-line camelcase
    createOrder($mobile, $product_id, $area) {
      this.$post('Porder/create_order', {
        mobile: $mobile,
        product_id: $product_id,
        area: $area
      }).then((res) => {
        // {"errno":0,"errmsg":"ok","data":{"id":"1095"}}
        console.log(res)
        if (res.errno === 0) {
          this.toPay(res.data.id)
        } else {
          Toast(res.errmsg)
        }
      })
    },
    // eslint-disable-next-line camelcase
    toPay($order_id) {
      this.$post('Porder/topay', {
        order_id: $order_id,
        paytype: 1
      }).then((res) => {
        // 生成支付
        if (res.errno === 0) {
          // eslint-disable-next-line import/no-named-as-default-member
          onWeixinBridgeReady(res.data).then(() => {
            // 成功
            Dialog.confirm({
              title: '支付成功',
              message: '是否继续下单,还是返回首页',
              confirmButtonText: '继续下单',
              cancelButtonText: '取消'
            }).then(() => {
              // 刷新页面
              this.$router.go(0)
            }).catch(() => {
              // this.$router.push({ path: '/HomePage' })
            })
          }).catch(() => {
            // 支付失败
            Dialog.confirm({
              title: '支付失败',
              message: '是否继续支付,还是返回首页',
              confirmButtonText: '继续支付',
              cancelButtonText: '取消'
            }).then(() => {
              // 继续支
              this.topay($order_id)
            }).catch(() => {
              // this.$router.push({ path: '/HomePage' })
            })
          })
        } else {
          Toast(res.errmsg)
        }
      })
    }

  },
  watch: {
    phonevalue() {
      if (this.phonevalue.length === 11) {
        // 发起请求 拿到手机号对应的套餐
        this.get_product_mobile()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  background-color: #f2f3f5;
}
.place_older_box {
  height: 45px;
}
.account_box {
   margin: 15px;
   padding: 0px;
   border-radius: 8px;
   background: #f2f3f5;
   overflow: hidden;
  .account_value_box {
    width: 70%;
    float: left;
    .van-icon {
      margin-right: 5px;
    }
    background: #f2f3f5;
    padding: 20px;
    border-radius: 5px;
    font-size: 15px;
  }
  .isp_box {
    float: right;
    margin-top: 21px;
    margin-right: 15px;
  }
}
.taocan_box {
  margin-top: 15px;
  .sub_title {
    margin: 15px;
    font-size: 15px;
  }
  .van-radio-group {
    width: 100%;
    margin-left: 15px;
    margin-bottom: 15px;
    .van-radio {
      margin-top: 15px;
      border: #317ee7 solid 1px;
      border-radius: 5px;
      margin-right: 10px;
      padding-bottom: 15px;
      text-align: center;
      vertical-align: center;
      display: inline-block;
      width: 29%;
      .radio_title {
        font-weight: 700;
        color: #317ee7;
      }
    }
  }
}

.remark {
 margin-top: 15px;
 padding: 10px;
 background: white;
}

</style>
