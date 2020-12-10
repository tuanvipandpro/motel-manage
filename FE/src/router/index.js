import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login/Login'
import ForgetPassword from '@/components/Login/ForgetPassword'
import Statistic from '@/components/Statistic/Statistic'

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
    }
  ]
})
