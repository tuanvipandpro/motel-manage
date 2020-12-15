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
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column prop="roomId" label="Số phòng"/>
                    <el-table-column prop="birthday" label="Ngày Sinh"/>
                    <el-table-column label="Giới tính">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.gender ? 'success' : 'primary'">
                                {{scope.row.gender ? 'Nam' : 'Nữ'}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="Thao tác" fixed="right">
                        <template slot-scope="scope">
                          <el-button type="text" v-if="scope.row.status">Active</el-button>
                          <el-button type="text" v-else>Inactive</el-button>
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
    ...mapState('customerManage', ['_customerList'])
  },
  data () {
    return {
      tableData: [
        {
          id: '1',
          name: 'Lê Minh Tuấn',
          cmnd: '123456789',
          birthday: '01-10-1999',
          gender: true,
          roomId: 1,
          status: true
        },
        {
          id: '1',
          name: 'Lý Thị Cà Chua',
          cmnd: '123456789',
          birthday: '02-10-1999',
          gender: true,
          roomId: 1,
          status: false
        }
      ]
    }
  },
  mounted () {
    if (!sessionStorage.getItem('USER')) {
      this.transitTo('Login', undefined)
    } else {
      this._getCustomerList().then(res => {
        console.log(res)
      }).catch(e => console.error(e))
    }
  },
  methods: {
    ...mapActions('customerManage', ['_getCustomerList']),
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

<style>
  #profile-container{
    margin-left: 2% ;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .item {
    margin-bottom: 18px;
  }

  i {
    margin-right: 8px;
  }
</style>
