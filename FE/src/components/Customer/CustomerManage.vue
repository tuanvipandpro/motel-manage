!<template>
  <div id="customer-manage">
    <el-row style="text-align: left">
      <!-- Menu -->
      <el-col :span='5'>
        <hci-menu :activeIndex='"3-1"' />
      </el-col>
      <!-- Content -->
      <el-col :offset="5" :span="19">
          <div>
            <el-card class="box-card" shadow="hover" style="width: 98%; margin-left: 1%; margin-right: 1%; margin-top: 1vh">
                <div slot="header" class="clearfix">
                    <h2>Danh sách khách trọ</h2>
                </div>
                <el-table :data="tableData" stripe>
                    <el-table-column fixed prop="id" label="Id"/>
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
                    <el-table-column label="Số phòng">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>Id: {{ scope.row.rm_id }}</p>
                                <p>Mã phòng: {{ scope.row.rm_code }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.rm_code }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column prop="birthdate" label="Ngày Sinh"/>
                    <el-table-column label="Giới tính">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.gender == 1 ? 'success' : 'primary'">
                                {{scope.row.gender ? 'Nam' : 'Nữ'}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="Thao tác" fixed="right">
                        <template slot-scope="scope">
                          <el-button type="text" v-if="scope.row.active">Inactive</el-button>
                          <el-button type="text" v-else>Active</el-button>
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
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  components: {
    'hci-menu': Menu
  },
  computed: {
    ...mapState('customerManage', ['_customerList'])
  },
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    let loader = this.getLoader()
    if (!sessionStorage.getItem('USER')) {
      this.transitTo('Login', undefined)
    } else {
      this._getCustomerList().then(res => {
        this.closeLoader(loader)
        this.tableData = this._customerList
      }).catch(e => {
        console.error(e)
        this.closeLoader(loader)
      })
    }
  },
  methods: {
    ...mapActions('customerManage', ['_getCustomerList'])
  }
}
</script>
