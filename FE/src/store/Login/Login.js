import axios from 'axios'

const login = {
  namespaced: true,
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {
    /**
     * Check Login
     * @param context
     * @param params (username, password)
     * @returns access_token
     * @returns user
     */
    async _checkLogin (context, params) {
      try {
        const url = '/auth/login'
        const body = {
          username: params.username,
          password: params.password
        }
        let res = await axios.post(url, body)
        axios.defaults.headers = {Authorization: res.data.access_token}
        sessionStorage.setItem('access_token', res.data.access_token)
        sessionStorage.setItem('USER', JSON.stringify(res.data.user))
        return res.data
      } catch (e) {
        throw e
      }
      // End
    }
  }
}

export default login
