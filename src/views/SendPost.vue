<template>
    <div id='app'>
        <title-view v-bind:title="title"/>
        <div class='card'>
            <div class='send'>
                <div class="icon_box">
                    <img src='https://cdn.kuaidi100.com/images/m/dispatch/ico_send.png'>
                </div>
                <div class='address_info' @click='selSendAddress'>
                    <div v-if="sendName">{{ sendName }} {{ sendPhone }}</div>
                    <div v-else>新建寄件人</div>
                    <div>{{ goAddress ? goAddress : '请输入寄件地址' }}</div>
                </div>
                <van-image :src="require('@/assets/icon_select_address.png')"
                          width="30" height="30" style="margin-top: 10px"
                          @click="toSelectAddress('go')"/>
            </div>
            <div class='receive'>
                <div class="icon_box">
                    <img src='https://cdn.kuaidi100.com/images/m/dispatch/ico_shou.png'>
                </div>
                <div class='address_info' @click='selReceiveAddress'>
                    <div v-if="receiveName">{{ receiveName }} {{ receivePhone }}}</div>
                    <div v-else>新建收件人</div>
                    <div>{{ toAddress ? toAddress : '请输入收件地址' }}</div>
                </div>
              <van-image :src="require('@/assets/icon_select_address.png')"
                         width="30" height="30" style="margin-top: 10px"
                         @click="toSelectAddress('to')"/>
            </div>
        </div>
        <div class='card goods_info_box'>
            <div class="sub_title">商品信息</div>
            <van-radio-group v-model="shopName" direction="horizontal" class="shopNameRg">
                <van-radio name="猫粮">猫粮</van-radio>
                <van-radio name="衣服">衣服</van-radio>
                <van-radio name="鞋子">鞋子</van-radio>
                <van-radio name="其它">其它</van-radio>
                <van-field v-model="shopName" placeholder="请输入物品信息" class="shopName"/>
            </van-radio-group>

            <div class="weight_box">
                <span>预估重量</span>
                <van-stepper v-model="weight" class="numPicker"/>
            </div>
        </div>
        <div class='card goods_info_box'>
            <div class="sub_title">保价(未保价物品最告赔6倍运费)</div>
            <div class="weight_box">
                <span>自定义货物价值</span>
                <van-field v-model="baojiaPrice" placeholder="输入保价金额" class="baojiaPrice"/>
            </div>
            <span class="baojiaRule"> {{priceInfo.remark}}</span>
        </div>
        <div class='card goods_info_box'>
            <div class="sub_title">运费详情</div>
            <div class="price_box">
                <div>{{priceInfo.priceA >0 ? '原价':'首重'}}</div>
                <div>{{ priceInfo.discount >0 ? priceInfo.totalFeeOri : priceInfo.priceA }}</div>
            </div>
            <div class="price_box">
                <div>{{priceInfo.discount >0 ? '折扣':'续重'}}</div>
                <div>{{priceInfo.discount >0 ? priceInfo.discount : priceInfo.priceB }}</div>
            </div>
            <div class="price_box" v-if="priceInfo.serviceCharge > 0">
                <div>服务费</div>
                <div>{{ priceInfo.serviceCharge }}</div>
            </div>
        </div>
        <div class='bottom'>
            <div class='price'>
                <div class='max_price'>￥{{ priceInfo.totalPrice }}</div>
                <span>{{ priceObj }}</span>
            </div>
            <div class='createOrder' @click="createMyOrder" v-show="show">京东下单</div>
            <div class='createOrder createOrderEnable' v-show="!show">京东下单</div>
        </div>
    </div>
</template>

<script>

import local from '../utils/storage'
import titleView from '../components/CommonTitle'

export default {
  name: 'SendPost',
  data() {
    return {
      user: null,
      title: '京东',
      goAddress: '',
      toAddress: '',
      sendName: '',
      sendPhone: '',
      senderProvince: '',
      senderCity: '',
      senderCounty: '',
      senderTown: '',
      sendAddress: '',
      receiveName: '',
      receiveProvince: '',
      receiveCity: '',
      receiveCounty: '',
      receiveTown: '',
      receiveAddres: '',
      priceObj: '',
      shopName: '',
      packageNum: 1,
      weight: 5,
      maxPrice: 0,
      channel: '',
      myPrice: '',
      show: false,
      baojiaPrice: '',
      type: 6,
      priceInfo: ''
    }
  },
  components: {
    titleView
  },
  created() {
    this.user = local.getUser()
    console.dir(this.user)
    console.log(`登录信息：${this.user.customer.id}`)
    if (!this.user) {
      // 需要登录
      return
    }
    if (this.$route.query.type) {
      console.log(`类型${this.$route.query.type}`)
      this.type = this.$route.query.type
    }
    this.sendAddress = local.get('sendAddress')
    if (this.sendAddress) {
      this.sendName = this.sendAddress.person
      this.sendPhone = this.sendAddress.phonenum
      this.senderProvince = this.sendAddress.province
      this.senderCity = this.sendAddress.city
      this.senderCounty = this.sendAddress.county
      this.senderTown = this.sendAddress.town
      this.goAddress = `${this.sendAddress.province}/${this.sendAddress.city}/${this.sendAddress.county}/${this.sendAddress.town}/${this.sendAddress.detail}`
    }
    this.receiveAddres = local.get('receiveAddress')
    if (this.receiveAddres) {
      this.receiveName = this.receiveAddres.person
      this.receivePhone = this.receiveAddres.phonenum
      this.receiveProvince = this.receiveAddres.province
      this.receiveCity = this.receiveAddres.city
      this.receiveCounty = this.receiveAddres.county
      this.receiveTown = this.receiveAddres.town
      this.toAddress = `${this.receiveAddres.province}/${this.receiveAddres.city}/${this.receiveAddres.county}/${this.receiveAddres.town}/${this.receiveAddres.detail}`
    }
    // if (this.sendAddress && this.receiveAddres) {
    //   this.checkMatchChannel()
    // }
  },
  methods: {
    selSendAddress() {
      this.$router.push({ name: 'WriteAddress', query: { flag: 'go' } })
    },
    selReceiveAddress() {
      this.$router.push({ name: 'WriteAddress', query: { flag: 'to' } })
    },
    // 估算运费
    estimateprice() {
      const data = {
        weight: this.weight,
        // eslint-disable-next-line max-len
        sendAddress: this.sendAddress.province + this.sendAddress.city + this.sendAddress.county + this.sendAddress.town + this.sendAddress.detail,
        // eslint-disable-next-line max-len
        receiveAddress: this.receiveAddres.province + this.receiveAddres.city + this.receiveAddres.county + this.receiveAddres.town + this.receiveAddres.detail,
        type: this.type
      }
      this.$post('/Expressorder/estimateprice', JSON.stringify(data))
        .then((res) => {
          console.dir(res)
          if (!this.isString(res.data)) {
            this.show = true
            this.priceInfo = res.data
          }
        })
    },

    // 是不是字符串
    isString($obj) {
      return Object.prototype.toString.call($obj) === '[object String]'
    },
    toSelectAddress($e) {
      console.log($e)
      this.$router.push({ name: 'MyAddress', query: { flag: 'go' } })
    },
    // 创建订单
    createMyOrder() {
      if (!this.shopName || !this.weight) {
        alert('请输入商品名字 或者重量2')
        return
      }
      if (!this.priceInfo) {
        alert('请输入运费1')
        return
      }
      // this.show = false
      const order = {
        userid: this.user.customer.id,
        orderSendTime: '',
        // eslint-disable-next-line max-len
        senderText: this.sendName + this.sendPhone + this.sendAddress.province + this.sendAddress.city + this.sendAddress.county + this.sendAddress.town + this.sendAddress.detail,
        // eslint-disable-next-line max-len
        receiveText: this.receiveName + this.receivePhone + this.receiveAddres.province + this.receiveAddres.city + this.receiveAddres.county + this.receiveAddres.town + this.receiveAddres.detail,
        senderName: this.sendName,
        senderProvince: this.senderProvince,
        senderCity: this.senderCity,
        senderCounty: this.senderCounty,
        senderTown: this.senderTown,
        senderAddress: this.sendAddress.detail,
        senderPhone: this.sendAddress.phonenum,
        receiveName: this.receiveName,
        // eslint-disable-next-line max-len
        receiveProvince: this.receiveProvince,
        receiveCity: this.receiveCity,
        receiveCounty: this.receiveCounty,
        receiveTown: this.receiveTown,
        receiveAddress: this.receiveAddres.detail,
        receivePhone: this.receiveAddres.phonenum,
        weight: this.weight,
        goods: this.shopName,
        packageNum: this.packageNum,
        insuredValue: 0,
        guaranteeValueAmount: 0,
        remark: '',
        sadd: this.sendAddress.detail,
        type: this.type,
      }
      this.$post('/Expressorder/create_order', JSON.stringify(order)).then((res) => {
        this.show = true
        console.dir(res)
        // 创建订单成功 生成支付 去发起支付
        this.topay(res.data, 1)
      })
    },
    // eslint-disable-next-line camelcase
    topay($order_id, $paytype) {
      this.$fetch('/Expressorder/topay', {
        order_id: $order_id,
        paytype: $paytype
      }).then((res) => {
        this.show = true
        console.dir(res)
        // 创建订单成功 生成支付 去发起支付
        const payData = {
          appId: res.data.appId,
          timeStamp: `${res.data.timeStamp }`,
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
    createOrder() {
      if (!this.shopName || !this.wight) {
        alert('请输入商品名字 或者重量')
        return
      }
      if (!this.priceInfo) {
        alert('请输入运费')
        return
      }
      this.show = false
      const order = {
        shopbill: null,
        user: null,
        sender: this.sendAddress.contact, // 发见人
        senderCompany: null,
        senderMobile: this.sendAddress.mobile,
        senderTel: null,
        senderProvince: this.sendAddress.province,
        senderCity: this.sendAddress.city,
        senderCounty: this.sendAddress.county,
        senderTown: this.sendAddress.town,
        senderLocation: this.sendAddress.address,
        senderAddress: this.sendAddress.province + this.sendAddress.city + this.sendAddress.county + (this.sendAddress.town ? this.sendAddress.town : '') + this.sendAddress.address,
        warehouseCode: null,
        receiver: this.receiveAddres.contact,
        receiveCompany: null,
        receiverMobile: this.receiveAddres.mobile,
        receiveTel: null,
        receiveProvince: this.receiveAddres.province,
        receiveCity: this.receiveAddres.city,
        receiveTown: this.receiveAddres.town,
        receiveCounty: this.receiveAddres.county,
        receiveLocation: this.receiveAddres.address,
        receiveAddress: this.receiveAddres.province + this.receiveAddres.city + this.receiveAddres.county + (this.receiveAddres.town ? this.receiveAddres.town : '') + this.receiveAddres.address,
        packageCount: 1, // 包裹数量
        payType: true,
        promiseTimeType: true,
        itemName: this.shopName,
        goodsCount: null,
        vloumLong: null,
        vloumWidth: null,
        vloumHeight: null,
        weight: this.wight,
        baoxian: true,
        billRemark: null,
        insuredValue: false,
        insured: null,
        collectionValue: false,
        collectionMoney: null,
        tempReceiveAddress: this.receiveAddres.province + this.receiveAddres.city + this.receiveAddres.county + this.receiveAddres.address + this.receiveAddres.contact + this.receiveAddres.mobile,
        tempSendAddress: this.sendAddress.province + this.sendAddress.city + this.sendAddress.county + this.sendAddress.address + this.sendAddress.contact + this.sendAddress.mobile,
        customerFreight: this.myPrice,
        customerFreightType: this.channel,
        linkName: 'yywl-袁宇进'
      }
      this.$post('/jdserver2/addBill', order).then((res) => {
        this.show = true
        const re = res.result
        if (re) {
          const waybill = re.waybill // 物流单号
          console.log(waybill)
        }
      })
    },
    // 数据完整
    isComplete() {
      return this.sendName && this.sendPhone && this.goAddress && this.receiveName && this.receivePhone && this.toAddress && this.weight
    }
  },
  watch: {
    weight() {
      console.log('监听有反应')
      if (this.isComplete()) {
        this.estimateprice()
      }
    },
    listenInfo() {

    }
  }
}
</script>

<style scoped lang="less">
  #app {
    background-color: #efeff4;
  }

  .sub_title {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .card {
    background-color: white;
    border-radius: 0.275rem;
    padding: 0 15px;
    margin: 10px 10px 0;
  }

  .send,
  .receive {
    overflow: hidden;
    padding: 15px 0;
    border-bottom: 1px solid #cccccc;

    .icon_box {
      float: left;
      vertical-align: center;

      img {
        display: block;
        width: 25px;
        height: 25px;
        margin-top: 10px;
      }
    }

    .address_info {
      float: left;
      display: inline;
      width: 80%;
      margin-left: 10px;
      font-size: 16px;

      div:nth-child(2) {
        margin-top: 10px;
      }
    }
  }

  .weight_box {
    margin-top: 15px;
    margin-bottom: 10px;
    overflow: hidden;
    line-height: inherit;

    .numPicker {
      float: right;
    }
  }

  .goods_info_box {
    padding: 15px;
    overflow: hidden;

    .shopNameRg {
      padding-top: 10px;
      margin-bottom: 10px;

      .van-radio {
        width: 30%;
        margin-top: 10px;
      }
    }

    .shopName {
      display: block;
      width: 60%;
      margin-top: 15px;
      border: 1px solid #cccccc;
      border-radius: 3px;
    }

    .baojiaPrice {
      width: 150px;
      float: right;
      height: 40px;
      line-height: 20px;
      border: 1px solid #cccccc;
    }

    .baojiaRule {
      font-size: 14px;
      color: #ff0000;
      margin-top: 5px;
    }
  }

  .price_box {
    overflow: hidden;

    div:nth-child(1) {
      display: inline;
      float: left;
      color: #cccccc;
    }

    div:nth-child(2) {
      display: inline;
      float: right;
      color: red;
    }
  }

  .bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: white;

    .price {
      float: left;
      white-space: pre-wrap;
      margin-left: 10px;
      font-size: 18px;

      .max_price {
        color: #f00;
        font-size: 28px;
      }
    }

    .createOrder {
      float: right;
      background-color: #317ee7;
      height: 40px;
      line-height: 40px;
      width: 100px;
      border-radius: 40px;
      margin-top: 4px;
      margin-right: 10px;
      color: white;
      text-align: center;
    }

    .createOrderEnable {
      background-color: #cccccc;
    }
  }
</style>
