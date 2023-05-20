<template>
  <!--主页-->
  <div >
    <div class="content">
      <title-view title="我有建议"/>
      <div class="card address_ipt">
        <textarea placeholder="请输入您的建议,我们会尽可能的优化" v-model="content"/>
      </div>
      <div class='submit' @click="submitFeedback">提交</div>
    </div>
  </div>
</template>

<script>

// eslint-disable-next-line import/extensions
import titleView from '../components/CommonTitle'
import { Dialog } from 'vant'

export default {
  name: 'Home',
  data() {
    return {
      content: '',
    }
  },
  components: {
    titleView
  },
  methods: {
    submitFeedback() {
      this.$post('/Customer/feedback', { content: this.content }).then(() => {
        Dialog({ message: '提交成功' })
      })
    },
  }
}
</script>
<style lang="less" scoped>
.content {

  height: 100vh;
}
.card {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  margin: 15px;
}
.address_ipt textarea {
  margin-top: 10px;
  width: 100%;
  min-height: 200px;
  border: 0;
  outline: none;
}
.submit {
  margin: 50px auto;
  width: 120px;
  background-color: #317ee7;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 40px;
  color: white;
  text-align: center;
}
</style>
