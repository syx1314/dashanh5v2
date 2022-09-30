<template>
    <div class="">
        <title-view title="地址编辑"/>
        <div class="card address_ipt">
            <textarea placeholder="智能填写粘贴文本" v-model="address"/>
            <span class="clear" @click="clear">清空</span>
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
// eslint-disable-next-line import/extensions
import titleView from '../components/CommonTitle'
import { areaList } from '@vant/area-data'
import { Dialog } from 'vant'

export default {
  name: 'AddressEdit',
  data() {
    return {
      address_info: {
        name: '',
        tel: '',
        province: '',
        city: '',
        county: '', // 区县
        town: '',
        addressDetail: '',
        areaCode: '',
        isDefault: false,
      },
      address: '',
      flag: '',
      ads: '',
      areaList,
      userId: '9',
      id: '',
    }
  },
  components: {
    titleView
  },
  created() {
    const user = local.getUser()
    if (user) {
      this.userId = user.customer.id
    }
    console.log(this.$route.params.address)
    if (this.$route.params.address) {
      this.address_info = this.$route.params.address
      this.id = this.address_info.id
      if (this.address_info.county) {
        // eslint-disable-next-line no-unused-vars,no-restricted-syntax,guard-for-in
        this.findAreaCode(this.address_info.county)
      }
    }
  },
  methods: {
    findAreaCode($county) {
      // eslint-disable-next-line no-restricted-syntax,guard-for-in
      for (const countyListKey in areaList.county_list) {
        console.log(areaList.county_list[countyListKey])
        if (areaList.county_list[countyListKey] == $county) {
          this.address_info.areaCode = countyListKey
          break
        }
      }
    },
    clear() {
      this.address_info = null
    },
    onAdd() {
      console.log('点击了我')
    },
    onDelete($e) {
      this.$fetch(`/Customer/delAddress?userId=${this.userId}&id=${$e.id}`,).then((res) => {
        Dialog.alert({
          message: res.errmsg
        }).then(() => {
          this.$router.back()
        })
      })
    },
    setData() {
      if (this.ads) {
        this.address_info.name = this.ads.person
        this.address_info.tel = this.ads.phonenum
        this.address_info.province = this.ads.province
        this.address_info.city = this.ads.city
        this.address_info.county = this.ads.county
        this.address_info.town = this.ads.town
        this.address_info.addressDetail = this.ads.town + this.ads.detail
        console.dir(this.address_info)
        this.findAreaCode(this.address_info.county)
      }
    },
    parseAddress() {
      this.$fetch(`Expressorder/nlpAddress?address=${decodeURI(this.address)}`, '')
        .then((res) => {
          console.log(res)
          this.ads = res.data
          this.setData()
        })
    },
    onSave($e) {
      const postData = {
        id: this.id,
        text: this.address,
        uname: $e.name,
        phone: $e.tel,
        province: $e.province,
        city: $e.city,
        county: $e.county,
        town: $e.town,
        isDefault: $e.isDefault,
        address_detail: $e.addressDetail
      }
      this.$post(`Customer/saveAddress?userId=${this.userId}`, JSON.stringify(postData)).then((res) => {
        Dialog.alert({
          message: res.errmsg
        }).then(() => {
          this.$router.back()
        })
      })
    }
  },
}
</script>

<style lang="less" scoped>

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
