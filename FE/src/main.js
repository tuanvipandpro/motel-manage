// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store/store'
import Axios from 'axios'

// Element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

Axios.defaults.baseURL = 'https://motel-manage.herokuapp.com'

Axios.interceptors.response.use(undefined, err => {
  return new Promise((resolve, reject) => {
    console.log(err)
    throw err
  })
})

Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
