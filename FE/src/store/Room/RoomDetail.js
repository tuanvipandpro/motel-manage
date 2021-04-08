import axios from 'axios'

const roomDetail = {
  namespaced: true,
  state: {
    _room: {},
    _customerList: [],
    _billList: []
  },
  getters: {

  },
  mutations: {
    /**
     * @param {*} state
     * @param {*} _room
     */
    _setRoom (state, _room) {
      state._room = _room
    },
    /**
     * @param {*} state
     * @param {*} _room
     */
    _setCustomerList (state, _customerList) {
      state._customerList = _customerList
    },
    _setBillList (state, _billList) {
      state._billList = _billList
    }
  },
  actions: {
    /**
     * Get Room By Manager
     * @param {*} context
     */
    async _getRoomById (context, id) {
      try {
        const url = '/api/room/room-detail/' + id
        let res = await axios.get(url)
        context.commit('_setRoom', res.data.data)
      } catch (e) {
        throw e
      }
    },
    async _getCustomerByRoomId (context, id) {
      try {
        const url = '/api/room/room-customer/' + id
        let res = await axios.get(url)
        context.commit('_setCustomerList', res.data.data)
      } catch (e) {
        throw e
      }
    },
    async _getBillByRoomId (context, params) {
      try {
        const url = '/api/bill/details/room/' + params.id
        let res = await axios.get(url, {params: {page_no: params.page_no, page_num: params.page_num}})
        context.commit('_setBillList', res.data)
      } catch (e) {
        throw e
      }
    }
  }
}

export default roomDetail
