<template>
    <div id="login-container">
        <el-card id="login-form">
            <h1>Đăng nhập</h1>
            <el-form>
                <el-form-item>
                    <el-input v-model="formData.username" placeholder="Tài khoản"/>
                </el-form-item>
                <el-form-item>
                    <el-input type="password" v-model="formData.password" placeholder="Mật khẩu"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleForm">Đăng nhập</el-button>
                </el-form-item>
                <el-form-item style="margin-top: -3vh">
                    <el-link :underline="false" type="primary" href="#/forget">Quên Mật Khẩu</el-link>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data () {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('login', ['_checkLogin']),
    /**
     * Handle Login Form
     */
    async handleForm () {
      const loader = this.getLoader()

      try {
        await this._checkLogin(this.formData)
        this.closeLoader(loader)
        this.$router.push('Home')
        this.transitTo('Home', undefined)
      } catch (e) {
        this.closeLoader(loader)
        console.error(e)
        this.showMessage('Tài khoản hoặc mật khẩu không chính xác !', 'warning')
      }
    }
  }
}
</script>
<style>
  #login-container {
      width: 100%;
      height: 100vh;
      background-color: azure;
      position: relative;
      display: flex;
      justify-content: center;
    }

  #login-form {
      margin-top: 22vh;
      width: 340px;
      height: 350px;
  }
</style>
