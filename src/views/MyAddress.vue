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
    }
  },
  components: {
    titleView,
  },
  created() {
    const user = local.getUser()
    if (user) {
      // 说明此时登陆着
      console.dir(user)
    }
    this.getAddress(9)
  },
  methods: {
    onAdd() {
      this.$router.push({ name: 'AddressEdit' })
    },
    clickItem($e) {
      console.log($e)
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
