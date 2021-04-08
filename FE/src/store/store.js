import Vuex from 'vuex'
import Vue from 'vue'

import login from './Login/Login'
import customerManage from './Customer/CustomerManage'
import roomManage from './Room/RoomManage'
import roomDetail from './Room/RoomDetail'
import historyBill from './Bill/HistoryBill'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login: login,
    customerManage: customerManage,
    roomManage: roomManage,
    roomDetail: roomDetail,
    historyBill: historyBill
  }
})
