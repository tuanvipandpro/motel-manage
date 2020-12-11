!<template>
  <div id="hci-menu">
    <el-menu
      :default-active="activeIndex"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#ffffff"
      class="el-menu-vertical-demo"
      style="min-height: 100vh"
    >
      <el-menu-item index="1" @click="doHome">
        <i class="el-icon-data-analysis"></i>
        <span>Trang Chủ</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-notebook-1"></i>
          <span>Quản lý đơn phòng</span>
        </template>
        <el-menu-item index="2-1" @click="doMakeBill">Tạo đơn phòng</el-menu-item>
        <el-menu-item index="2-2">Lịch sử đơn phòng</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>Quản lý khách trọ</span>
        </template>
        <el-menu-item index="3-1" @click="doCustomerManage">Danh sách khách trọ</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>Thông tin chung</span>
        </template>
        <el-menu-item index="4-0" @click="doProfile">Hồ sơ</el-menu-item>
        <el-menu-item index="4-1" @click="doChangePassword">Đổi mặt khẩu</el-menu-item>
        <el-menu-item index="4-2" @click="doLogout">Đăng xuất</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    activeIndex: String
  },
  methods: {
    /**
     * Go to home page 1
     */
    doHome () {
      this.transitTo('Statistic', undefined)
    },
    /**
     * Go to new pitch page 2-1
     */
    doMakeBill () {
      this.transitTo('MakeBill', undefined)
    },
    /**
     * Go to manage pitch pitch page 2-2
     */
    doManageBill () {
      this.transitTo('ManageBill', undefined)
    },
    /**
     * Go to customer-manage page 3-1
     */
    doCustomerManage () {
      this.transitTo('CustomerManage', undefined)
    },
    /**
     * Go to new profile page 4-0
     */
    doProfile () {
      this.transitTo('Profile', undefined)
    },
    /**
     * Go to new change password page 4-1
     */
    doChangePassword () {
      this.transitTo('ChangePassword', undefined)
    },
    /**
     * Logout 4-2
     */
    doLogout () {
      this.$confirm('Bạn có muốn đăng xuất?', 'Đăng xuất', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy Bỏ',
        type: 'warning'
      }).then(() => {
        const loader = this.getLoader()
        setTimeout(() => {
          sessionStorage.clear()
          this.transitTo('Login', undefined)
          this.closeLoader(loader)
        }, 1000)
      })
    },
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
    }
  }
}
</script>
<style>
  #hci-menu{
    position: fixed;
    left: 0;
    z-index: 1;
    width: 20.8333%;
  }
</style>
