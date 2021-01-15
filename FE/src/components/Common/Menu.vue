<template>
  <div id="hci-menu">
    <el-menu
      :default-active="activeIndex"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#ffffff"
      class="el-menu-vertical-demo"
      style="min-height: 100vh"
    >
      <el-menu-item index="1" @click="transitTo('Home')">
        <i class="el-icon-monitor"></i>
        <span>Trang Chủ</span>
      </el-menu-item>
      <!-- <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-notebook-1"></i>
          <span>Quản lý đơn phòng</span>
        </template>
        <el-menu-item index="2-1" @click="doMakeBill">Tạo đơn phòng</el-menu-item>
        <el-menu-item index="2-2">Lịch sử đơn phòng</el-menu-item>
      </el-submenu> -->
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>Quản lý khách trọ</span>
        </template>
        <el-menu-item index="3-1" @click="transitTo('CustomerManage')">Danh sách khách trọ</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-office-building"></i>
          <span>Quản lý phòng trọ</span>
        </template>
        <el-menu-item index="4-1" @click="transitTo('RoomManage')">Danh sách phòng trọ</el-menu-item>
        <el-menu-item index="4-2" @click="transitTo('MakeBill')">Tính tiền phòng</el-menu-item>
        <el-menu-item index="4-3" @click="transitTo('HistoryBill')">Lịch sử đơn phòng</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>Thông tin chung</span>
        </template>
        <el-menu-item index="5-0" @click="transitTo('Profile')">Hồ sơ</el-menu-item>
        <el-menu-item index="5-1" @click="transitTo('ChangePassword')">Đổi mặt khẩu</el-menu-item>
        <el-menu-item index="5-2" @click="doLogout">Đăng xuất</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import mixins from '../../mixins'
import axios from 'axios'

export default {
  mixins: [mixins],
  props: {
    activeIndex: String
  },
  methods: {
    /**
     * Logout 5-2
     */
    doLogout () {
      this.$confirm('Bạn có muốn đăng xuất?', 'Đăng xuất', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy Bỏ',
        type: 'warning'
      }).then(() => {
        const loader = this.getLoader()
        axios.defaults.headers.common['Authorization'] = undefined
        sessionStorage.clear()
        this.transitTo('Login', undefined)
        this.closeLoader(loader)
      })
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
