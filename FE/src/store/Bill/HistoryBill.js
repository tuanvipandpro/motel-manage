import axios from 'axios'

const historyBill = {
  namespaced: true,
  state: {
    _billList: [],
    _detailsBill: [],
    _total: 0
  },
  getters: {

  },
  mutations: {
    /**
     * setter for _customerList
     */
    _setBillList (state, _billList) {
      state._billList = _billList
    },
    _setDetailsBill (state, _detailsBill) {
      state._detailsBill = _detailsBill
    },
    _setTotal (state, _total) {
      state._total = _total
    }
  },
  actions: {
    async _getBillList (context, params) {
      try {
        if (isNaN(params.pageNo)) return
        else {
          const url = '/api/bill/' + params.pageNo
          let res = await axios.get(url,
            {
              headers: {authorization: sessionStorage.getItem('access_token')},
              params: {page_num: params.pageNum}
            }
          )
          context.commit('_setBillList', res.data.billList)
          context.commit('_setTotal', res.data.total)
          return res.data
        }
      } catch (e) {
        throw e
      }
    },
    async _getDetailForBill (context, params) {
      const url = '/api/bill/details/' + params.bill_id
      try {
        let res = await axios.get(url,
          {
            headers: {authorization: sessionStorage.getItem('access_token')}
          }
        )
        context.commit('_setDetailsBill', res.data)
        return res
      } catch (e) {
        throw e
      }
    }
  }
}

export default historyBill
