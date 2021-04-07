!<template>
  <div id="room-manage">
    <el-row style="text-align: left">
      <!-- Menu -->
      <el-col :span='5'>
        <hci-menu :activeIndex='"4-1"' />
      </el-col>
      <!-- Content -->
      <el-col :offset="5" :span="19">
          <div>
              <el-card shadow="hover" style="width: 98%; margin-left: 1%; margin-right: 1%; margin-top: 1vh">
                <div slot="header" class="clearfix">
                    <h2>Danh sách phòng trọ</h2>
                    <p>Giá điện : {{ constants.electric_price ? constants.electric_price : 0}}/kWh</p>
                    <p>Giá nước : {{ constants.water_price ? constants.water_price : 0}}/m³</p>
                </div>
                <el-table :data="tableData" stripe>
                    <el-table-column fixed prop="id" label="Id"/>
                    <el-table-column prop="rm_code" label="Mã Phòng">
                      <template slot-scope="scope">
                          <el-popover trigger="hover" placement="top">
                              <p>Giá phòng: {{ scope.row.price | formatVND }}</p>
                              <p>Rác + ANTT: {{ scope.row.social | formatVND }}</p>
                              <div slot="reference" class="name-wrapper">
                                  <el-tag>{{scope.row.rm_code}}</el-tag>
                              </div>
                          </el-popover>
                      </template>
                    </el-table-column>
                    <el-table-column prop="electric" label="Số điện"/>
                    <el-table-column prop="water" label="Số nước"/>
                    <!-- <el-table-column label="Giá phòng">
                      <template slot-scope="scope">
                        {{ scope.row.price | formatVND}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="social" label="Rác + ANTT">
                      <template slot-scope="scope">
                        {{ scope.row.social | formatVND}}
                      </template>
                    </el-table-column> -->
                    <el-table-column prop="rented" label="Trạng thái">
                      <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.rented">Đang thuê</el-tag>
                        <el-tag type="danger" v-else>Trống</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column label="Thao tác">
                      <template slot-scope="scope">
                        <el-button type="text" @click="ToDetailRoom(scope.row.id)">Xem</el-button>
                      </template>
                    </el-table-column>
                </el-table>
              </el-card>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Menu from '../Common/Menu'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    'hci-menu': Menu
  },
  computed: {
    ...mapState('roomManage', ['_roomList', '_constantPrice'])
  },
  data () {
    return {
      tableData: [],
      constants: {}
    }
  },
  filters: {
    /**
     * Format number to VND
     */
    formatVND: (value) => {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
    }
  },
  async mounted () {
    let loader = this.getLoader()
    if (!sessionStorage.getItem('USER')) {
      this.transitTo('Login', undefined)
    } else {
      await this._getConstantPrice()
      this.constants = this._constantPrice

      this._getRoomByUser().then(res => {
        this.closeLoader(loader)
        this.tableData = this._roomList
      }).catch(e => {
        console.error(e)
        this.closeLoader(loader)
      })
    }
  },
  methods: {
    ...mapActions('roomManage', ['_getRoomByUser', '_getConstantPrice']),
    ToDetailRoom (id) {
      this.transitTo('RoomDetail', {id: id})
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
