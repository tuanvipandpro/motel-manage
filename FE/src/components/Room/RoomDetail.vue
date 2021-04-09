!<template>
  <div id="profile">
    <el-row style="text-align: left">
      <!-- Menu -->
      <el-col :span='5'>
        <hci-menu/>
      </el-col>
      <!-- Content -->
      <el-col :offset="5" :span="19">
        <h1><i class="el-icon-s-platform"></i> ID: {{room.id}}</h1>
        <div style="margin-left: 0.3%">
          <p><strong>Số phòng </strong><el-tag type="info">{{room.rm_code}}</el-tag></p>
          <!-- <p><strong>Quản lý:</strong> {{room.manager}}</p> -->
          <p><strong>Điện - Nước </strong> <el-tag type="warning">{{room.electric}} kWh</el-tag> - <el-tag>{{room.water}} m³</el-tag></p>
          <p><strong>Giá phòng:</strong> <el-tag type="info">{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room.price)}}</el-tag></p>
          <p><strong>Dịch vụ:</strong> <el-tag type="info">{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room.social)}}</el-tag></p>
          <p><strong>Trạng thái:</strong> <el-tag :type="room.rented ? 'success' : 'danger'">{{room.rented ? 'Đang thuê' : 'Trống'}}</el-tag> - <el-button v-if="room.rented" size="mini" type="danger" plain>Trống phòng</el-button></p>
        </div>
        <el-tabs style="width: 95%; margin-left: 0.3%">
          <el-tab-pane label="Khách trọ">
            <div>
              <el-button type="primary" plain><i class="el-icon-plus"></i>  Thêm khách trọ</el-button>
            </div>
            <el-table :data="customerList" stripe>
              <el-table-column fixed prop="id" label="Id"/>
              <el-table-column prop="cmnd" label="CMND/CCCD"/>
              <el-table-column prop="phone_number" label="Số điện thoại"/>
              <el-table-column label="Họ Tên">
                  <template slot-scope="scope">
                      <el-popover trigger="hover" placement="top">
                          <p>Tên: {{ scope.row.name }}</p>
                          <p>CMND: {{ scope.row.cmnd }}</p>
                          <p>Địa chỉ: {{ scope.row.address }}</p>
                          <p>Giới tính: {{ scope.row.gender == 1 ? 'Nam' : 'Nữ'}}</p>
                          <p>Số điện thoại: {{ scope.row.phone_number }}</p>
                          <p>Email: {{ scope.row.email == null ? 'Không có' : scope.row.email }}</p>
                          <div slot="reference" class="name-wrapper">
                              <el-tag size="medium">{{ scope.row.name }}</el-tag>
                          </div>
                      </el-popover>
                  </template>
              </el-table-column>
              <el-table-column prop="birthdate" label="Ngày Sinh"/>
              <el-table-column label="Thao tác" fixed="right">
                  <template>
                      <el-button size="mini" type="danger">Chuyển đi</el-button>
                  </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Hóa đơn">
            <el-table :data="billList" stripe>
              <el-table-column fixed prop="id" label="Thông tin">
                  <template slot-scope="scope">
                      <el-popover trigger="hover" placement="top">
                          <p>Id: {{ scope.row.id }}</p>
                          <p>Mã Hóa Đơn: {{ scope.row.bill_id }}</p>
                          <p>Mã Phòng: {{ scope.row.rm_id }}</p>
                          <div slot="reference" class="name-wrapper">
                              <el-tag size="medium">{{ scope.row.id }}</el-tag>
                          </div>
                      </el-popover>
                  </template>
              </el-table-column>
              <el-table-column prop="rm_electric_new" label="Điện"/>
              <el-table-column prop="rm_water_new" label="Nước"/>
              <el-table-column label="Tổng tiền">
                  <template slot-scope="scope">
                      <el-popover trigger="hover" placement="top">
                          <p>Điện tiêu thụ: {{ scope.row.rm_electric_new - scope.row.rm_electric_old }} kWh
                            : ( {{scope.row.rm_electric_new}} - {{scope.row.rm_electric_old}} ) * {{scope.row.price_e}} = {{ (scope.row.rm_electric_new - scope.row.rm_electric_old)*scope.row.price_e | formatVND}}
                          </p>
                          <p>Nước tiêu thụ: {{ scope.row.rm_water_new - scope.row.rm_water_old}} m³
                            : ( {{scope.row.rm_water_new}} - {{scope.row.rm_water_old}} ) * {{scope.row.price_w}} = {{ (scope.row.rm_water_new - scope.row.rm_water_old)*scope.row.price_w | formatVND}}
                          </p>
                          <p>Phí dịch vụ: {{scope.row.social | formatVND}}</p>
                          <p>Tiền phòng: {{scope.row.rm_price | formatVND}}</p>
                          <div slot="reference" class="name-wrapper">
                              <el-tag size="medium">{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(scope.row.total)}}</el-tag>
                          </div>
                      </el-popover>
                  </template>
              </el-table-column>
              <el-table-column label="Trạng Thái">
                <template slot-scope="scope">
                  <el-tag size="medium" :type="scope.row.is_pay ? 'success' : 'danger'" >{{ scope.row.is_pay ? 'Đã thanh toán' : 'Chưa thanh toán' }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="Thao tác" fixed="right">
                  <template slot-scope="scope">
                      <el-button size="mini" type="danger" :disabled="scope.row.is_pay">Thanh toán</el-button>
                  </template>
              </el-table-column>
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                :current-page.sync="currentPage"
                :total="total"
                style="text-align: center; margin-top: 1%"
                @current-change="changePage"
            />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Menu from '../Common/Menu'
import { mapState, mapActions } from 'vuex'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  components: {
    'hci-menu': Menu
  },
  computed: {
    ...mapState('roomDetail', ['_room', '_customerList', '_billList', '_total'])
  },
  data () {
    return {
      room: {},
      customerList: [],
      billList: [],
      total: 0,
      pageSize: 2,
      currentPage: 1
    }
  },
  async mounted () {
    let loader = this.getLoader()

    try {
      await this._getRoomById(this.$route.params.id)
      this.room = this._room

      if (this.room.rented) {
        await this._getCustomerByRoomId(this.$route.params.id)
        this.customerList = this._customerList
      }

      let params = {
        id: this.$route.params.id,
        page_no: this.currentPage,
        page_num: this.pageSize
      }
      await this._getBillByRoomId(params)
      this.billList = this._billList
      this.total = +this._total
    } finally {
      this.closeLoader(loader)
    }
  },
  methods: {
    ...mapActions('roomDetail', ['_getRoomById', '_getCustomerByRoomId', '_getBillByRoomId']),
    async changePage () {
      let loader = this.getLoader()
      try {
        let params = {
          id: this.$route.params.id,
          page_no: this.currentPage,
          page_num: this.pageSize
        }
        await this._getBillByRoomId(params)
        this.billList = this._billList
        this.total = +this._total
      } catch (e) {
        console.error(e)
        this.$notify({title: 'Lỗi', message: 'Có lỗi xảy ra', type: 'error'})
      } finally {
        this.closeLoader(loader)
      }
    }
  }
}
</script>
