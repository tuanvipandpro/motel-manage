export default {
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
    }
  }
}
