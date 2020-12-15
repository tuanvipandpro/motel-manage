import axios from 'axios'

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
      state._customerList = _customerList
    }
  },
  actions: {
    async _getCustomerList (context) {
      try {
        const url = '/api/customer'
        let res = await axios.get(url, {headers: {authorization: sessionStorage.getItem('access_token')}})
        context.commit('_setCustomerList', res.data)
        return res.data
      } catch (e) {
        throw e
      }
    }
    // async _checkLogin (context, params) {
    //   try {
    //     const url = '/auth/login'
    //     const body = {
    //       username: params.username,
    //       password: params.password
    //     }
    //     let res = await axios.post(url, body)
    //     axios.defaults.headers = {Authorization: res.data.access_token}
    //     sessionStorage.setItem('access_token', res.data.access_token)
    //     sessionStorage.setItem('USER', JSON.stringify(res.data.user))
    //     return res.data
    //   } catch (e) {
    //     throw e
    //   }
    //   // End
    // }
  }
}

export default customerManage
