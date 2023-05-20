import Vue from 'vue'
import Router from 'vue-router'


// eslint-disable-next-line import/extensions
import HomePage from '@/views/HomePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/sendPost',
      name: 'SendPost',
      component: () => import(/* webpackChunkName: 'SendPost' */ '@/views/SendPost')
    },
    {
      path: '/WriteAddress',
      name: 'WriteAddress',
      component: () => import(/* webpackChunkName: 'WriteAddress' */ '@/views/WriteAddress')
    },
    {
      path: '/MyAddress',
      name: 'MyAddress',
      component: () => import(/* webpackChunkName: 'MyAddress' */ '@/views/MyAddress')
    },
    {
      path: '/AddressEdit',
      name: 'AddressEdit',
      component: () => import(/* webpackChunkName: 'AddressEdit' */ '@/views/AddressEdit')
    },
    {
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage,
      children: [

        {
          path: '/',
          name: 'Home',
          component: () => import(/* webpackChunkName: 'Home' */ '@/views/Home')
        },
        {
          path: '/HomePage/Order',
          name: 'Order',
          component: () => import(/* webpackChunkName: 'Order' */ '@/views/Order')
        },
        {
          path: '/HomePage/My',
          name: 'My',
          component: () => import(/* webpackChunkName: 'My' */ '@/views/My')
        }
      ]
    },
    {
      path: '/OrderDetails',
      name: 'OrderDetails',
      component: () => import(/* webpackChunkName: 'OrderDetails' */ '@/views/OrderDetails')
    },
    {
      path: '/Bianming',
      name: 'Bianming',
      component: () => import(/* webpackChunkName: 'OrderDetails' */ '@/views/Bianming')
    },
    {
      path: '/Feedback',
      name: 'Feedback',
      component: () => import(/* webpackChunkName: 'OrderDetails' */ '@/views/FeedBack')
    }
  ]
})
