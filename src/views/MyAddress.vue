<template>
  <div class="content">
    <title-view title="我的地址"/>
    <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @click-item="clickItem"
    />
  </div>
</template>

<script>
import local from '../utils/storage'
// eslint-disable-next-line import/extensions
import titleView from '../components/CommonTitle'
import Vue from 'vue'

export default {
  name: 'MyAddress',
  data() {
    return {
      address: '',
      uname: '',
      phone: '',
      province: '',
      address_info: '',
      flag: '',
      ads: '',
      list: [],
      chosenAddressId: '',
      userId:''
    }
  },
  components: {
    titleView,
  },
  created() {
      const user = local.getUser()
      if (user) {
          this.userId = user.customer.id
      }
    this.getAddress(this.userId)
    if (this.$route.query.flag) {
        this.flag = this.$route.query.flag
    }
  },
  methods: {
    onAdd() {
      this.$router.push({ name: 'AddressEdit' })
    },
    clickItem($e) {
      console.log('选择了地址'+$e)
        let saveData= {
            person:$e.name,
            phonenum:$e.tel,
            province:$e.province,
            city:$e.city,
            county:$e.county,
            town:$e.town,
            detail:$e.addressDetail,
        }
        if (this.flag === 'go') {
            local.set('sendAddress', saveData)
            this.$router.back()
        } else if (this.flag === 'to'){
            local.set('receiveAddress', saveData)
            this.$router.back()
        }
    },
    getAddress($userId) {
      this.$fetch(`/Customer/getAddress?userId=${$userId}`, '')
        .then((res) => {
          console.log(res)
          if (res.errno === 0 && res.data) {
            const data = res.data
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < data.length; i++) {
              const temp = {
                id: data[i].id,
                name: data[i].uname,
                tel: data[i].phone,
                province: data[i].province,
                city: data[i].city,
                county: data[i].county,
                town: data[i].town,
                addressDetail: data[i].address_detail,
                // eslint-disable-next-line max-len
                address: data[i].province + data[i].city + data[i].county + data[i].town + data[i].address_detail,
                isDefault: data[i]['"deafult'] !== 0,
              }
              Vue.set(this.list, i, temp)
            }
          }
        })
    },
    onEdit($e) {
      this.$router.push({ name: 'AddressEdit', params: { address: $e } })
    }
  },
}
</script>

<style lang="less" scoped>
.content {
 height: 100vh;
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

</style>
