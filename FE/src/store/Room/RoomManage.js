import axios from 'axios'

const roomManage = {
  namespaced: true,
  state: {
    _roomList: []
  },
  getters: {

  },
  mutations: {
    /**
     * @param {*} state
     * @param {*} _roomList
     */
    _setRoomList (state, _roomList) {
      state._roomList = _roomList
    }
  },
  actions: {
    async _getRoomByUser (context) {
      try {
        const url = '/api/room'
        let res = await axios.get(url, {headers: {authorization: sessionStorage.getItem('access_token')}})
        context.commit('_setRoomList', res.data.data)
      } catch (e) {
        throw e
      }
    }
  }
}

export default roomManage
