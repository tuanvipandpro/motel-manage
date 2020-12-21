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
          <p>Giá nước: {{ constants.water_price ? constants.water_price : 0}}/m³</p>
          <el-divider />
          <div>
            <el-button type="primary" plain @click="makeBill">Tạo hóa đơn</el-button>
            <el-table :data="tableData" stripe @selection-change="handleSelectionChange">
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
                    :min="scope.row.electric + 1"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="water" label="Số nước cũ" />
              <el-table-column label="Số nước mới">
                <template slot-scope="scope">
                  <el-input-number
                    v-model="scope.row.newWater"
                    :min="scope.row.water + 1"
                  />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-dialog :visible.sync="dialogFlag">
            <div slot="title">
              <h2>Xác nhận hóa đơn</h2>
            </div>
            <el-table :data="confirmList" stripe>
              <el-table-column label="Mã Phòng">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>ID: {{ scope.row.id }}</p>
                    <p>Mã phòng: {{ scope.row.rm_code }}</p>
                    <p>Tiền phòng: {{ scope.row.price | formatVND}} </p>
                    <p>Rác + ANTT: {{ scope.row.social | formatVND}} </p>
                    <div slot="reference">
                      <el-tag size="medium">{{ scope.row.rm_code }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="Tiền điện">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>Điện tiêu thụ: {{ scope.row.newElectric - scope.row.electric }} kWh</p>
                    <p>( {{scope.row.newElectric}} - {{scope.row.electric}} ) * {{constants.electric_price}} = {{ (scope.row.newElectric - scope.row.electric)*constants.electric_price }} VND</p>
                    <div slot="reference">
                      <el-tag>
                        {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((scope.row.newElectric - scope.row.electric) * constants.electric_price) }}
                      </el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="Tiền nước">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>Nước tiêu thụ: {{ scope.row.newWater - scope.row.water}} m³</p>
                    <p>( {{scope.row.newWater}} - {{scope.row.water}} ) * {{constants.water_price}} = {{ (scope.row.newWater - scope.row.water)*constants.water_price | formatVND}} </p>
                    <div slot="reference">
                      <el-tag>
                        {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((scope.row.newWater - scope.row.water) * constants.water_price) }}
                      </el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="Tiền phòng">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>
                      {{ (scope.row.newElectric - scope.row.electric)*constants.electric_price }} +
                      {{ (scope.row.newWater - scope.row.water) * constants.water_price }} +
                      {{ scope.row.price }} + {{ scope.row.social }} =
                      {{ (scope.row.newWater - scope.row.water) * constants.water_price + (scope.row.newWater - scope.row.water) * constants.water_price + scope.row.price + scope.row.social | formatVND}}
                    </p>
                    <div slot="reference">
                      <el-tag>
                        {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((scope.row.newWater - scope.row.water) * constants.water_price + (scope.row.newWater - scope.row.water)* constants.water_price + scope.row.price + scope.row.social) }}
                      </el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
            <div style="text-align: right"><el-button type="primary" plain @click="confirmBill" style="margin-top: 1%">Xác nhận</el-button></div>
      </el-dialog>
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
      dialogFlag: false,
      tableData: [],
      confirmList: [],
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
    ...mapActions('roomManage', ['_getRoomByUser', '_getConstantPrice', '_createBill']),
    /**
     * @param val
     */
    handleSelectionChange (val) {
      this.confirmList = val
    },
    /**
     * Make a bill to confirm
     */
    makeBill () {
      this.dialogFlag = !this.dialogFlag
    },
    /**
     * Confirm bill
     */
    async confirmBill () {
      if (this.confirmList.length < 1) return
      const loader = this.getLoader()
      let res
      try {
        res = await this._createBill(this.confirmList)
      } catch (e) {
        console.error(e)
        this.$notify.error({
          title: 'Thất bại',
          message: 'Tạo hóa đơn thất bại !!!'
        })
      } finally {
        this.dialogFlag = !this.dialogFlag
        this.closeLoader(loader)
        if (res.status === 200) {
          this.$notify({
            title: 'Thành công',
            message: 'Tạo hóa đơn thành công',
            type: 'success'
          })
        }
      }
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
