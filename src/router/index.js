import Vue from 'vue'
import Router from 'vue-router'
// eslint-disable-next-line import/extensions
import HelloWorld from '@/components/HelloWorld'
// eslint-disable-next-line import/extensions
import SendPost from '@/views/SendPost'
// eslint-disable-next-line import/extensions
import WriteAddress from '@/views/WriteAddress'
// eslint-disable-next-line import/extensions
import MyAddress from '@/views/MyAddress'
// eslint-disable-next-line import/extensions
import AddressEdit from '@/views/AddressEdit'
// eslint-disable-next-line import/extensions
import HomePage from '@/views/HomePage'


// eslint-disable-next-line import/extensions
import OrderDetails from '@/views/OrderDetails'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/sendPost',
      name: 'SendPost',
      component: SendPost
    },
    {
      path: '/WriteAddress',
      name: 'WriteAddress',
      component: WriteAddress
    },
    {
      path: '/MyAddress',
      name: 'MyAddress',
      component: MyAddress
    },
    {
      path: '/AddressEdit',
      name: 'AddressEdit',
      component: AddressEdit
    },
    {
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage,
      children: [

        {
          path: '',
          name: 'Home',
          component: () => import('@/views/Home')
        },
        {
          path: '/HomePage/Order',
          name: 'Order',
          component: () => import('@/views/Order')
        },
        {
          path: '/HomePage/My',
          name: 'My',
          component: () => import('@/views/My')
        }
      ]
    },
    {
      path: '/OrderDetails',
      name: 'OrderDetails',
      component: OrderDetails
    },
  ]
})
