!<template>
  <div id="profile">
    <el-row style="text-align: left">
      <!-- Menu -->
      <el-col :span='5'>
        <hci-menu :activeIndex='"1"' />
      </el-col>
      <!-- Content -->
      <el-col :offset="5" :span="19">
        Home
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Menu from '../Common/Menu'
export default {
  components: {
    'hci-menu': Menu
  },
  data () {
    return {
    }
  },
  mounted () {
    // this.checkAuthen()
  },
  methods: {
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
    },
    /**
     * Check Authen
     */
    checkAuthen () {
      if (!sessionStorage.getItem('USER')) {
        this.transitTo('Login', undefined)
      }
    }
  }
}
</script>
<style>
  .chart-row{
    display: flex;
  }
</style>
