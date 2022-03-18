<template>
    <div class="">
        <title-view title="地址编辑"/>
        <div class="card address_ipt">
            <textarea placeholder="智能填写粘贴文本" v-model="address"/>
            <span class="clear" @click="parseAddress">清空</span>
            <span class="sibei" @click="parseAddress">识别</span>
        </div>
        <van-address-edit
                :area-list="areaList"
                show-delete
                show-set-default
                show-search-result
                :address-info="address_info"
                @save="onSave"
                @delete="onDelete"
        />

    </div>
</template>

<script>
    import local from '../utils/storage'
    import titleView from '../components/CommonTitle'
    import { areaList } from '@vant/area-data';
    import {Dialog} from "vant";
    export default {
        name: 'AddressEdit',
        data() {
            return {
                address_info:{
                    'name':'adada',
                    'tel':'',
                    'province':'aaaa',
                    'city':'',
                    'county':'',
                    'town':'',
                    'addressDetail':'',
                    'isDefault':false,
                },
                address:'',
                flag: '',
                ads: '',
                areaList,
                userId:'9'
            }
        },
        components: {
            titleView
        },
        created() {
            const user = local.getUser()
            if (user) {
                this.userId = user ['customer_id']
            }
        },
        methods: {
            onAdd() {
                console.log("点击了我")
            },
            onDelete() {

            },
            setData() {
                if (this.ads) {
                    this.address_info.name = this.ads['person']
                    this.address_info.tel = this.ads['phonenum']
                    this.address_info.province = this.ads['province']
                    this.address_info.city = this.ads['city']
                    this.address_info.county = this.ads['county']
                    this.address_info.town = this.ads['town']
                    this.address_info.addressDetail = this.ads['detail']
                    console.dir(this.address_info)

                }
            },
            parseAddress() {
                this.$fetch('/Expressorder/nlpAddress?address=' + decodeURI(this.address), '')
                    .then((res) => {
                        console.log(res)
                        this.ads = res['data']
                        this.setData()
                    })
            },
            onSave() {
            let postData = {
                'text': this.address,
                'uname': this.address_info.name,
                'phone': this.address_info.tel,
                'province': this.address_info.province,
                'city': this.address_info.city,
                'county': this.address_info.county,
                'town': this.address_info.town,
                'address_detail': this.address_info.addressDetail
            }
              this.$post('/Customer/saveAddress?userId='+this.userId,JSON.stringify(postData)).then((res) => {
                  Dialog.alert({
                      message:res['errmsg']
                  })
              })
            }
        },
    }
</script>

<style lang="less" scoped>
  .title {
    height: 40px;
    line-height: 40px;
    color: white;
    background-color: #317ee7;
    margin-bottom: 10px;
    text-align: center;
  }

  .card {
    background-color: white;
    border-radius: 8px;
    padding: 10px;
    margin: 10px 10px;

  }
  .van-radio__icon {
    display: none !important;
  }

  .address_ipt {
    position: relative;
  }

  .address_ipt textarea {
    width: 100%;
    min-height: 80px;
    border: 0;
    outline: none;
  }

  .sibei,
  .clear{
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: inline-block;
    width: 40px;
    height: 20px;
    font-size: 10px;
    line-height: 20px;
    border-radius: 30px;
    background-color: #317ee7;
    color: white;
    text-align: center;
  }
  .clear {
    right: 55px;
    background-color: #cccccc;
  }
</style>
