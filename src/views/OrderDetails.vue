<template>
    <div id='app'>
        <van-sticky>
        <title-view :title="title"/>
        <div class="header" v-if="order">
            <span class="express_no_box">
                运单号:{{order.trackingNum}}
                <div class="copy_icon" >
                    <img :src="copyIcon" @click="copy(order.trackingNum)"/>
                </div>
            </span>
            <div class="address_box van-clearfix">
                    <div class="left_box fl">
                        <div class="cityName">{{order.senderCity}}</div>
                        <div class="userName">{{ order.sender_name }}</div>
                    </div>
                    <div class="center_box fl">
                        <span>{{order.statusName}}</span>
                        <van-image :src="arrowRight" />
                    </div>
                    <div class="right_box fl">
                        <div class="cityName">{{order.receiveCity }}</div>
                        <div class="userName">{{ order.receiveName }}</div>
                    </div>
                    <span class="address_info_btn" @click="isShowAddress">
                        详情 >
                    </span>


            </div>

        </div>
        </van-sticky>
      <div class="content_box">
        <van-overlay :show="showAddress" z-index="100" @click="isShowAddress" v-if="order">
          <div class="address_info">
            <!--详细的地址信息-->
            <div class="sender_box van-clearfix" >
              <img src="https://cdn.kuaidi100.com/images/m/dispatch/ico_send.png"/>
              <p class="hd">{{ order.sender_name }}{{ order.sender_phone }}  </p>
              <p class="bd">{{ order.senderCity }}{{ order.sender_address }}  </p>
            </div>
            <div class="receive_box van-clearfix">
              <img src="https://cdn.kuaidi100.com/images/m/dispatch/ico_shou.png"/>
              <p class="hd">{{ order.receiveName }}{{ order.receivePhone }}  </p>
              <p class="bd">{{ order.receiveCity }}{{ order.receiveAddress }}  </p>
            </div>
            <div>物品名称：{{order.goods}}</div>
            <div>下单时间：{{order.create_time}}</div>
          </div>
        </van-overlay>
        <div class="content  van-clearfix" v-if="order">
          <div class="card">
            <span class="sub_title">运单信息</span>
            <ul class="van-clearfix">
              <li>物品名称：{{order.goods}}</li>
              <li>包裹数量：1</li>
              <li>物品体积：{{order.volume}}m³</li>
              <li>体积换算：{{order.volumeWeight}}kg</li>
              <li>下单重量：{{order.weight}}kg</li>
              <li>实际重量：{{order.weightActual}}kg</li>
              <li>计费重量：{{order.weightBill}}kg</li>
              <li :style="activityColor">费用状态：{{order.overWeightStatus | weightText}}</li>
            </ul>
          </div>
          <div class="price_info van-clearfix card" v-if="order">
            <span class="sub_title">价格信息</span>
            <ul>
              <li>快递费用：￥{{order.billTotalPrice}}</li>
              <li>已经支付：￥{{order.payTotalPrice}}</li>
              <li>保价费用：￥{{order.insuranceFee}}</li>
              <li>耗材费用：￥{{order.consumeFee}}</li>
              <li v-if="order.changeFee">转寄费用：￥{{order.changeFee}}</li>
              <li v-if="order.otherFee">其它费用：￥{{order.otherFee}}</li>
              <li v-if="order.serviceCharge">服务费：￥{{order.serviceCharge}}</li>
            </ul>
          </div>
          <div class="order_bill card" v-if="order && order.bill">
            <span class="sub_title">账单明细</span>
            <div v-for="(bill,i) in order.bill" :key="i">
              <span>{{bill.type ==1 ? '下单费': '超重/耗材/保价/转寄/加长'}}</span>
              <span>￥{{bill.total_price}}</span>
              <span v-if="bill.pay_status==1"
                    style=" color: red">
                          未支付
                          <strong style="display:inline-block; background-color: red;color: white
                          ;padding-left: 10px;padding-right: 10px;height: 30px;line-height: 30px
                          ;border-radius: 100px"
                                  @click="topay(bill.id,1)">支付</strong>
                      </span>
              <span v-else-if="bill.pay_status==2" style="color: dodgerblue">已支付</span>
            </div>
          </div>
        </div>
        <div class="footer">
          <!--            // 显示物流信息-->
          <span class="sub_title">物流信息</span>
          <van-steps direction="vertical" :active="0" v-if="order">
            <van-step v-for="(trace, index) in order.traceList" :key="index">
              <h3>{{trace.opeRemark}}</h3>
              <p>{{trace.opeTime}}</p>
            </van-step>

          </van-steps>
        </div>
      </div>
    </div>
</template>

<script>

import local from '../utils/storage'
// eslint-disable-next-line import/extensions
import titleView from '../components/CommonTitle'
import arrowRight from '../assets/icon_arrow_right.png'
import copyIcon from '../assets/icon_cppy.png'
import { Dialog } from 'vant'

export default {
  name: 'OrderDetails',
  data() {
    return {
      title: '运单详情',
      order: null,
      arrowRight,
      copyIcon,
      showAddress: false
    }
  },
  components: {
    titleView
  },
  created() {
    this.user = local.getUser()

    // if (!this.user) {
    //   // 需要登录
    //     console.log('需要登录')
    //   return
    // }

    if (this.$route.query.id) {
      console.log(`类型${this.$route.query.id}`)
      this.getdetail(this.$route.query.id)
    }
  },
  methods: {
    getdetail($id) {
      this.$fetch('/Expressorder/queryOrderDetail', {
        id: $id
      }).then((res) => {
        if (res.errno === 0) {
          this.order = res.data
          const billArr = res.data.bill
          if (billArr) {
            let billTotalPrice = 0
            let payTotalPrice = 0
            billArr.forEach((bill) => {
              billTotalPrice += bill.total_price
              if (bill.pay_status == 2) {
                payTotalPrice += bill.pay_money
              }
            })
            this.order.payTotalPrice = payTotalPrice
            this.order.billTotalPrice = billTotalPrice
          } else {
            this.order.billTotalPrice = this.order.totalPrice
          }
        } else {
          Dialog.alert({ message: res.errmsg })
        }
      })
    },
    copy($copyText) {
      console.log('点击了复制')
      navigator.clipboard.writeText($copyText).then(() => {
        alert('复制成功')
      }).catch(() => {
        alert('复制失败')
      })
    },
    isShowAddress() {
      console.log(`点击了我${this.showAddress}`)
      this.showAddress = !this.showAddress
    },
    // eslint-disable-next-line camelcase
    topay($bill_id, $paytype) {
      this.$fetch('/Expressorder/topay', {
        order_id: $bill_id,
        paytype: $paytype
      }).then((res) => {
        this.show = true
        if (res.errno === 1) {
          Dialog({
            message: res.errmsg
          })
          return
        }
        console.dir(res)
        // 创建订单成功 生成支付 去发起支付
        const payData = {
          appId: res.data.appId,
          timeStamp: `${res.data.timeStamp}`,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.sign
        }
        this.onBridgeReady(payData)
      })
    },
    onBridgeReady($payStr) {
      WeixinJSBridge.invoke('getBrandWCPayRequest', $payStr,
        (res) => {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          }
        })
    },
  },
  computed: {
    activityColor() {
      if (this.order.overWeightStatus === 1) {
        return {
          color: '#f00'
        }
      } else if (this.order.overWeightStatus === 1) {
        return {
          color: '#008000'
        }
      } else if (this.order.overWeightStatus === 3) {
        return {
          color: '#0000ff'
        }
      }
      return {
        color: '#008000'
      }
    }
  },
  filters: {
    weightText($val) {
      if ($val === 1) {
        return '超重/耗材/保价/转寄/加长未处理'
      } else if ($val === 1) {
        return '超重/耗材/保价/转寄/加长已处理'
      } else if ($val === 3) {
        return '超轻'
      }
      return '正常'
    }
  }
}
</script>

<style scoped lang="less">
  #app {
    background-color: #efeff4;
    height: auto;
  }
  .express_no_box {
    display: block;
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
    background-color:#F2F6FF;
    vertical-align: center;
    .copy_icon {
      display: inline-block;
      height: 20px;
      img {
        width: 20px;
        vertical-align: middle;
      }
    }
  }
  .address_box {
    position: relative;
    background-color: white;
    height: 90px;
    .left_box {
      margin-left: 65px;
    }
    .left_box,
    .right_box {
      margin-top: 20px;
      div {
        width: 100px;
      }
      .cityName {
        color: #000;
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 5px;
      }
      .userName {
        color: #888;
        font-size: 14px;
      }
    }
    .right_box {
      text-align: right;
      margin-left: 70px;
    }
    .address_info_btn {
      position: absolute;
      top: 33px;
      right: 15px;
      color: #317ee7;
    }

    .van-popup {
      margin-top: 50px;
    }
    .center_box {
      position: absolute;
      left: 50%;
      width: 70px;
      float: left;
      margin:22px -35px 0;
      text-align: center;
    }
  }
  .van-overlay {
    margin-top: 50px;
    .address_info {
      margin: 10px;
      padding: 15px;
      background-color: white;
      border-radius: 10px;
      img {
        float: left;
        width: 25px;
        height: 25px;
        margin-right: 5px;
      }

      .hd {
        color: black;
        font-weight: 700;
        font-size: 16px;
      }
      .bd {
        margin-top: 5px;
        color: gray;
        font-size: 14px;
        margin-left: 30px;
        margin-bottom: 10px;
      }
      div:nth-child(3) {
        margin-top: 5px;
        color: #888888;
        font-size: 14px;
      }
      div:nth-child(4) {
        margin-top: 5px;
        color: #888888;
        font-size: 14px;
      }
    }
  }
  .content {
    padding: 10px;
    .card {
      background-color: white;
      margin-bottom: 10px;
      border-radius: 5px;
      padding: 10px;
      .sub_title {
        display: inline-block;
        color: black;
        font-weight: 600;
        font-size: 16px;
        margin-bottom: 15px;
      }
      li {
        float: left;
        width: 50%;
        height: 30px;
      }
    }
    .order_bill {
      div {

        span {
          display: inline-block;
          width: 43%;
          height: 40px;
          white-space: nowrap;
          line-height: 40px;
        }
        span:nth-child(2n) {
          width: 10%;
        }
        span:nth-child(3n) {
          text-align: right;
        }
      }
    }

  }
  .footer {
    background-color: white;
    padding: 15px;
    .sub_title {
      display: inline-block;
      color: black;
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 15px;
    }
  }
</style>
