import axios from 'axios'
import moment from 'moment'

const customerManage = {
  namespaced: true,
  state: {
    _customerList: []
  },
  getters: {

  },
  mutations: {
    /**
     * setter for _customerList
     */
    _setCustomerList (state, _customerList) {
      state._customerList = _customerList.map(el => {
        el.birthdate = moment(new Date(el.birthdate)).format('DD-MM-YYYY')
        return el
      })
    }
  },
  actions: {
    async _getCustomerList (context) {
      try {
        const url = '/api/customer'
        let res = await axios.get(url, {headers: {authorization: sessionStorage.getItem('access_token')}})
        context.commit('_setCustomerList', res.data.data)
        return res.data
      } catch (e) {
        throw e
      }
    }
  }
}

export default customerManage
