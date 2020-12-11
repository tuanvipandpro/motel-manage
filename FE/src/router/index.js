import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login/Login'
import ForgetPassword from '@/components/Login/ForgetPassword'
import Statistic from '@/components/Statistic/Statistic'
import MakeBill from '@/components/Bill/MakeBill'
import CustomerManage from '@/components/Customer/CustomerManage'
import Profile from '@/components/ChangePassword/Profile'
import ChangePassword from '@/components/ChangePassword/ChangePassword'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/statistic',
      name: 'Statistic',
      component: Statistic
    },
    {
      path: '/forget',
      name: 'ForgetPassword',
      component: ForgetPassword
    },
    {
      path: '/make-bill',
      name: 'MakeBill',
      component: MakeBill
    },
    {
      path: '/customer-manage',
      name: 'CustomerManage',
      component: CustomerManage
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
    }
  ]
})
