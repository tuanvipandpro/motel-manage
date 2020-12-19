import axios from 'axios'

const historyBill = {
  namespaced: true,
  state: {
    _billList: []
  },
  getters: {

  },
  mutations: {
    /**
     * setter for _customerList
     */
    _setBillList (state, _billList) {
      state._billList = _billList
    }
  },
  actions: {
    async _getBillList (context, pageNo) {
      try {
        if (isNaN(pageNo)) return
        else {
          const url = '/api/bill/' + pageNo
          let res = await axios.get(url, {headers: {authorization: sessionStorage.getItem('access_token')}})
          context.commit('_setBillList', res.data)
          return res.data
        }
      } catch (e) {
        throw e
      }
    }
  }
}

export default historyBill
