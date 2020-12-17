!<template>
  <div id="make-bill">
    <el-row style="text-align: left">
      <!-- Menu -->
      <el-col :span="5">
        <hci-menu :activeIndex="'4-2'" />
      </el-col>
      <!-- Content -->
      <el-col :offset="5" :span="19">
        <div
          style="width: 98%; margin-left: 1%; margin-right: 1%; margin-top: 1vh"
        >
          <h2>Tính tiền phòng</h2>
          <el-divider />
          <p>Giá điện: {{ constants.electric_price ? constants.electric_price : 0}}/kWh</p>
          <p>Giá nước: {{ constants.water_price ? constants.water_price : 0}}/m3</p>
          <el-divider />
          <div>
            <el-button type="primary" plain>Tạo hóa đơn</el-button>
            <el-table :data="tableData" stripe>
              <el-table-column type="selection" />
              <el-table-column label="Mã Phòng">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>ID: {{ scope.row.id }}</p>
                    <p>Mã phòng: {{ scope.row.rm_code }}</p>
                    <p>Tiền phòng: {{ scope.row.price }} VNĐ</p>
                    <p>Rác + ANTT: {{ scope.row.social }} VNĐ</p>
                    <div slot="reference">
                      <el-tag size="medium">{{ scope.row.rm_code }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="electric" label="Số điện cũ" />
              <el-table-column label="Số điện mới">
                <template slot-scope="scope">
                  <el-input-number
                    v-model="scope.row.newElectric"
                    :min="scope.row.newElectric"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="water" label="Số nước cũ" />
              <el-table-column label="Số nước mới">
                <template slot-scope="scope">
                  <el-input-number
                    v-model="scope.row.newWater"
                    :min="scope.row.newWater"
                  />
                </template>
              </el-table-column>
            </el-table>
          </div>
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
  async mounted () {
    let loader = this.getLoader()
    if (!sessionStorage.getItem('USER')) {
      this.transitTo('Login', undefined)
    } else {
      await this._getConstantPrice()
      this.constants = this._constantPrice

      this._getRoomByUser()
        .then((res) => {
          this.closeLoader(loader)
          this.tableData = this._roomList
        })
        .catch((e) => {
          console.error(e)
          this.closeLoader(loader)
        })
    }
  },
  methods: {
    ...mapActions('roomManage', ['_getRoomByUser', '_getConstantPrice']),
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
