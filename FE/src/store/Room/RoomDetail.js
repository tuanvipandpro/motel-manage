import axios from 'axios'
import moment from 'moment'

const roomDetail = {
  namespaced: true,
  state: {
    _room: {},
    _customerList: [],
    _billList: [],
    _total: 0
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
      state._customerList = _customerList.map(e => {
        e.birthdate = moment(e.birthdate).format('DD/MM/YYYY')
        return e
      })
    },
    _setBillList (state, _billList) {
      state._billList = _billList
    },
    _setTotal (state, _total) {
      state._total = _total
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
        context.commit('_setBillList', res.data.billList)
        context.commit('_setTotal', res.data.total)
      } catch (e) {
        throw e
      }
    }
  }
}

export default roomDetail
