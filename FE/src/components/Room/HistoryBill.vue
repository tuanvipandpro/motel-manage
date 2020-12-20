!<template>
  <div id="make-bill">
    <el-row style="text-align: left">
      <!-- Menu -->
      <el-col :span="5">
        <hci-menu :activeIndex="'4-3'" />
      </el-col>
      <!-- Content -->
      <el-col :offset="5" :span="19">
          <div>
            <el-card shadow="hover" style="width: 98%; margin-left: 1%; margin-right: 1%; margin-top: 1vh">
              <div slot="header" class="clearfix">
                <span style="font-size: 26px; font-weight: 600">Hóa đơn</span>
              </div>
              <el-table :data="tableData">
                <el-table-column fixed prop="id" label="Id"/>
                <el-table-column label="Ngày tính tiền">
                  <template slot-scope="scope">
                    {{ scope.row.create_date | formatDate() }}
                  </template>
                </el-table-column>
                <el-table-column prop="creater" label="Người tính tiền"/>
                <el-table-column prop="total" label="Tổng tiền"/>
                <el-table-column label="Thao tác">
                  <template slot-scope="scope">
                    <el-button type="text" @click="dialogFlag = true">Xem</el-button>
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
            </el-card>
          </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogFlag"/>
  </div>
</template>

<script>
import Menu from '../Common/Menu'
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

export default {
  components: {
    'hci-menu': Menu
  },
  computed: {
    ...mapState('historyBill', ['_billList', '_total'])
  },
  data () {
    return {
      dialogFlag: false,
      tableData: [],
      total: 0,
      pageSize: 2,
      currentPage: 1
    }
  },
  filters: {
    formatDate: (value) => {
      return moment(value).format('DD-MM-YYYY HH:mm:ss')
    }
  },
  async mounted () {
    if (!sessionStorage.getItem('USER')) {
      this.transitTo('Login', undefined)
    } else {
      await this.changePage()
    }
  },
  methods: {
    ...mapActions('historyBill', ['_getBillList']),
    async changePage () {
      let loader = this.getLoader()
      try {
        await this._getBillList({pageNo: this.currentPage, pageNum: this.pageSize})
        this.tableData = [...this._billList]
        this.total = +this._total
      } catch (e) {
        console.error(e)
        this.$notify({title: 'Lỗi', message: 'Có lỗi xảy ra', type: 'error'})
      } finally {
        this.closeLoader(loader)
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
