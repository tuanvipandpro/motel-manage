import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login/Login'
import ForgetPassword from '@/components/Login/ForgetPassword'
import Home from '@/components/Home/Home'
import CustomerManage from '@/components/Customer/CustomerManage'
import RoomManage from '@/components/Room/RoomManage'
import MakeBill from '@/components/Room/MakeBill'
import HistoryBill from '@/components/Room/HistoryBill'
import Profile from '@/components/ChangePassword/Profile'
import ChangePassword from '@/components/ChangePassword/ChangePassword'
import PageNotFound from '@/components/Error/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/forget',
      name: 'ForgetPassword',
      component: ForgetPassword
    },
    {
      path: '/customer-manage',
      name: 'CustomerManage',
      component: CustomerManage
    },
    {
      path: '/room-manage',
      name: 'RoomManage',
      component: RoomManage
    },
    {
      path: '/make-bill',
      name: 'MakeBill',
      component: MakeBill
    },
    {
      path: '/history-bill',
      name: 'HistoryBill',
      component: HistoryBill
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/change-password',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})
