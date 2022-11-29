

// eslint-disable-next-line camelcase,import/prefer-default-export
export default function onWeixinBridgeReady($payStr) {
  return new Promise((resolve, reject) => {
    WeixinJSBridge.invoke('getBrandWCPayRequest', $payStr,
      (res) => {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          // Dialog.confirm({
          //   title: '支付成功',
          //   message: '是否继续下单,还是返回首页',
          //   confirmButtonText: '继续下单',
          //   cancelButtonText: '返回首页'
          // }).then(() => {
          //   // 刷新页面
          //   this.$router.go(0)
          // }).catch(() => {
          //   // this.$router.push({ path: '/HomePage' })
          //   resolve()
          // })
          resolve('success')
        } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
          reject('fail')
          // Dialog.confirm({
          //   title: '支付失败',
          //   message: '是否继续支付,还是返回首页',
          //   confirmButtonText: '继续支付',
          //   cancelButtonText: '返回首页'
          // }).then(() => {
          //   // 继续支
          //   // this.topay($order_id, $paytype)
          //   resolve()
          // }).catch(() => {
          //   // this.$router.push({ path: '/HomePage' })
          //   resolve()
          // })
        } else {
          reject('cancel')
          // Dialog.confirm({
          //   title: '支付取消',
          //   message: '是否继续支付,还是返回首页',
          //   confirmButtonText: '继续支付',
          //   cancelButtonText: '返回首页'
          // }).then(() => {
          //   // 继续支
          //   // this.topay($order_id, $paytype)
          //   resolve()
          // }).catch(() => {
          //   // this.$router.push({ path: '/HomePage' })
          //   resolve()
          // })
        }
      })
  })
}
