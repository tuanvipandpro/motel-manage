import axios from 'axios'

const roomManage = {
  namespaced: true,
  state: {
    _roomList: [],
    _constantPrice: {}
  },
  getters: {

  },
  mutations: {
    /**
     * @param {*} state
     * @param {*} _roomList
     */
    _setRoomList (state, _roomList) {
      state._roomList = _roomList.map(e => {
        e.newElectric = e.electric + 1
        e.newWater = e.water + 1
        return e
      })
    },
    /**
     * @param {*} state
     * @param {*} _constantPrice
     */
    _setConstantPrice (state, _constantPrice) {
      state._constantPrice = _constantPrice
    }
  },
  actions: {
    /**
     * Get Room By Manager
     * @param {*} context
     */
    async _getRoomByUser (context) {
      try {
        const url = '/api/room'
        let res = await axios.get(url, {headers: {authorization: sessionStorage.getItem('access_token')}})
        context.commit('_setRoomList', res.data.data)
      } catch (e) {
        throw e
      }
    },
    /**
     * Get Electric && Water Price
     * @param {*} context
     */
    async _getConstantPrice (context) {
      try {
        const url = '/api/room/con-price'
        let res = await axios.get(url, {headers: {authorization: sessionStorage.getItem('access_token')}})
        context.commit('_setConstantPrice', res.data.data)
      } catch (e) {
        throw e
      }
    },
    /**
     * Api create bill
     * @param {*} context
     * @param {*} params
     */
    async _createBill (context, params) {
      try {
        const url = '/api/room/create-bill'
        let res = await axios.post(url, {list: params, date: new Date()}, {headers: {authorization: sessionStorage.getItem('access_token')}})
        return res
      } catch (e) {
        throw e
      }
    }
  }
}

export default roomManage
