import axios from 'axios'

const roomDetail = {
  namespaced: true,
  state: {
    _room: {},
    _customerList: []
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
    }
  }
}

export default roomDetail
