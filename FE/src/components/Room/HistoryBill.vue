!<template>
  <div id="make-bill">
    <el-row style="text-align: left">
      <!-- Menu -->
      <el-col :span="5">
        <hci-menu :activeIndex="'4-3'" />
      </el-col>
      <!-- Content -->
      <el-col :offset="5" :span="19">
          History
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Menu from '../Common/Menu'
// import { mapState, mapActions } from 'vuex'

export default {
  components: {
    'hci-menu': Menu
  },
  //   computed: {
  //     ...mapState('roomManage', ['_roomList', '_constantPrice'])
  //   },
  data () {
    return {
      dialogFlag: false,
      tableData: [],
      confirmList: [],
      constants: {}
    }
  },
  async mounted () {
    // let loader = this.getLoader()
    // if (!sessionStorage.getItem('USER')) {
    //   this.transitTo('Login', undefined)
    // } else {
    //   await this._getConstantPrice()
    //   this.constants = this._constantPrice

    //   this._getRoomByUser()
    //     .then((res) => {
    //       this.closeLoader(loader)
    //       this.tableData = this._roomList
    //     })
    //     .catch((e) => {
    //       console.error(e)
    //       this.closeLoader(loader)
    //     })
    // }
  },
  methods: {
    // ...mapActions('roomManage', ['_getRoomByUser', '_getConstantPrice']),
    /**
     * Show Loader
     */
    getLoader () {
      return this.$loading({
        lock: true,
        spinner: 'el-icon-loading',
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    /**
     * Close Loader
     * @param loader
     */
    closeLoader (loader) {
      loader.close()
    },
    /**
     * Transit to another component
     * @param name
     * @param data
     */
    transitTo (name, data) {
      const param = {
        name: name,
        params: data
      }
      this.$router.push(param)
    },
    /**
     * Show default message
     * @param message
     * @param type
     */
    showMessage (message, type) {
      this.$message({
        message: message,
        type: type
      })
    }
  }
}
</script>
