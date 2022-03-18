// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// eslint-disable-next-line import/extensions
import App from './App'
import router from './router'
import VConsole from 'vconsole'

if (process.env.NODE_ENV === 'production') {
  new VConsole()
}
import { post, fetch, patch, put } from './axios/http'
import { Tabbar, TabbarItem, PullRefresh, List, Stepper, Rate, RadioGroup
  // eslint-disable-next-line max-len
  , Radio, Field, Grid, GridItem, Swipe, SwipeItem, Lazyload, NoticeBar, Image as VanImage, Dialog, Loading
  , Step, Steps, Sticky, Popup, Overlay,AddressList,AddressEdit  } from 'vant'

Vue.use(Rate)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Stepper)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Field)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(NoticeBar)
Vue.use(VanImage)
Vue.use(Dialog)
Vue.use(Loading)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Sticky)
Vue.use(Popup)
Vue.use(Overlay)
Vue.use(AddressList)
Vue.use(AddressEdit)
Vue.config.productionTip = false
// 定义全局变量
Vue.prototype.$post = post
Vue.prototype.$fetch = fetch
Vue.prototype.$patch = patch
Vue.prototype.$put = put

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
