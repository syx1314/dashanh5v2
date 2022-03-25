<template>
    <div class="bb">
        <common-title v-bind:title="title"/>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    offset="1500"
            >
                <div class="order_item van-clearfix" v-for="(order,index) in list" :key="index"
                     :title="index" @click="toDetail(order.id)">
                    <div class="hd">
                        <span>圆通快递:{{ order.trackingNum }}</span>
                        <span class="fr">复制单号</span>
                    </div>
                    <div class="bd van-clearfix">
                         <div class="left_box fl">
                             <div class="cityName">{{order.senderCity }}</div>
                             <div class="userName">{{ order.sender_name }}</div>
                         </div>
                         <div class="center_box">
                               <span>{{order.statusName}}</span>
                              <van-image :src="arrowRight" />
                         </div>
                        <div class="right_box fr">
                            <div class="cityName">{{order.receiveCity }}</div>
                            <div class="userName">{{ order.receiveName }}</div>
                        </div>
                    </div>
                    <div class="bottom van-clearfix">
                        <div>
                            <span>{{ order.create_time }}</span>
                            <span class="price_box fr"><span class="price">￥{{order.totalPrice}}</span></span>
                        </div>
                        <div class="van-clearfix"  v-if="order.overWeightStatus == 1" @click="payOtherFee">
                            <span class="payOutWeight" >补差价</span>
                        </div>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import  arrowRight from '../assets/icon_arrow_right.png'
import CommonTitle  from "./CommonTitle";
    export default {
        name: 'Order',
        data() {
            return {
                title:'我的订单',
                list: [],
                loading: false,
                finished: false,
                refreshing: false,
                arrowRight
            }
        },
        created() {
            this.onLoad()
            console.log("智星了我")
        },
        components: {
            CommonTitle
        },
        methods: {
            onLoad() {
                this.$fetch('Expressorder/queryOrder', '').then((res) => {
                    if (res && res['errno'] == 0) {
                        this.list = res['data'].data
                    }
                    if (this.list['current_page']== this.list['last_page']){
                        this.finished =true
                    }
                    console.dir(this.list)
                    this.loading = false
                    this.refreshing = false
                })
            },
            onRefresh() {
                console.log('率先你')
                // 清空列表数据
                this.list =null;
                this.finished = false

                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true
                this.onLoad()
            },
            toDetail($id) {
                this.$router.push({ name: 'OrderDetails', query: { id: $id } })
            }
        }
    }
</script>

<style scoped lang="less">
    .bb {
      background: #f7f8fa;
    }
    .order_item {
        background-color: white;
        margin: 10px;
        padding: 15px;
        border-radius: 10px;
    }
    .left_box {
      margin-left: 30px;
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
      margin-right: 30px;
    }
    .center_box {
       position: absolute;
       left: 50%;
       width: 70px;
       float: left;
       margin:22px -35px 0;
       text-align: center;
    }
    .bottom {

      margin-top: 20px;
      .price {
        color: red;
        font-weight: 500;
      }
      div:nth-child(1) {
        height: 35px;
        line-height: 35px;

      }
      div:last-child {
        position: relative;
        height: 35px;
        border-top: 1px solid #cccccc;
      }
      .payOutWeight {
        position: absolute;
        right: 0;
        margin-top: 10px;
        background-color: #317ee7;
        color: white;
        padding: 3px 8px;
        border-radius: 15px;
      }
    }
</style>
