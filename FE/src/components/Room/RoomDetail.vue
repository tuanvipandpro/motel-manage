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
        <p><strong>Số phòng </strong><el-tag type="info">{{room.rm_code}}</el-tag></p>
        <!-- <p><strong>Quản lý:</strong> {{room.manager}}</p> -->
        <p><strong>Số điện </strong> <el-tag type="warning">{{room.electric}} kWh</el-tag></p>
        <p><strong>Số nước:</strong> <el-tag>{{room.water}} m³</el-tag></p>
        <p><strong>Giá phòng:</strong> <el-tag type="info">{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room.price)}}</el-tag></p>
        <p><strong>Dịch vụ:</strong> <el-tag type="info">{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room.social)}}</el-tag></p>
        <p><strong>Trạng thái:</strong> <el-tag type="success">{{room.rented ? 'Đang thuê' : 'Trống'}}</el-tag></p>

        <el-tabs style="width: 95%; margin-left: 0.3%">
          <el-tab-pane label="Khách trọ">
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
                  <template slot-scope="scope">
                      <el-button type="text" v-if="scope.row.active">Inactive</el-button>
                      <el-button type="text" v-else>Active</el-button>
                  </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Hóa đơn">Config</el-tab-pane>
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
    ...mapState('roomDetail', ['_room', '_customerList'])
  },
  data () {
    return {
      room: {},
      customerList: []
    }
  },
  async mounted () {
    let loader = this.getLoader()

    try {
      await this._getRoomById(this.$route.params.id)
      this.room = this._room

      await this._getCustomerByRoomId(this.$route.params.id)
      this.customerList = this._customerList
    } finally {
      this.closeLoader(loader)
    }
  },
  methods: {
    ...mapActions('roomDetail', ['_getRoomById', '_getCustomerByRoomId'])
  }
}
</script>
