<template>
    <div class="">
        <title-view title="智能填写"/>
        <div class="card address_ipt">
            <textarea placeholder="智能填写粘贴文本" v-model="address"/>
            <span class="sibei" @click="parseAddress">识别</span>
        </div>
        <div class="card address_box">
            <div>寄件人信息</div>
            <div placeholder="姓名">{{ uname }}</div>
            <div placeholder="电话">{{ phone }}</div>
            <div placeholder="省市区">{{ province }}</div>
            <div placeholder="详细地址">{{ address_info }}</div>
        </div>
        <div class="bottom_box">
            <span class="confirm_btn" @click="confirm">确定</span>
        </div>
    </div>
</template>

<script>
    import local from '../utils/storage'
    import titleView from './CommonTitle'

    export default {
        name: 'WriteAddress',
        data() {
            return {
                address: '',
                uname: '',
                phone: '',
                province: '',
                address_info: '',
                flag: '',
                ads: ''
            }
        },
        components: {
            titleView
        },
        created() {
            this.flag = this.$route.query.flag
            console.log(this.flag)
            if (this.flag === 'go') {
                this.ads = local.get('sendAddress')
            } else {
                this.ads = local.get('receiveAddress')
            }
            this.setData()
        },
        methods: {
            setData() {
                if (this.ads) {
                    this.uname = this.ads['person']
                    this.phone = this.ads['phonenum']
                    this.province = this.ads['province'] + '/' + this.ads['city'] + '/' + this.ads['county'] + '/' + this.ads['town']
                    this.address_info = this.ads['detail']
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
            confirm() {
                if (this.flag === 'go') {
                    local.set('sendAddress', this.ads)
                } else {
                    local.set('receiveAddress', this.ads)
                }
                this.$router.push({name: 'SendPost'})
            }
        }
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

  .address_ipt {
    position: relative;
  }

  .address_ipt textarea {
    width: 100%;
    min-height: 80px;
    border: 0;
    outline: none;
  }

  .sibei {
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: inline-block;
    width: 40px;
    height: 20px;
    font-size: 10px;
    line-height: 22px;
    border-radius: 30px;
    background-color: #317ee7;
    color: white;
    text-align: center;
  }

  .address_box {
    div {
      height: 30px;
      line-height: 30px;
    }
  }

  input {
    border: 0;
    outline: #efeff4;
    background-color: white;
    font-size: 15px;
  }

  .bottom_box {
    width: 100%;
    margin-top: 30px;

    .confirm_btn {

      display: inline-block;
      width: 90%;
      height: 40px;
      line-height: 40px;
      color: white;
      background-color: red;
      margin: 0 5%;
      text-align: center;
      border-radius: 40px;
    }
  }

</style>
