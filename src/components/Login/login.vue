<template>
  <div class="login_view">
    <div class="login" v-bind:style="{top:size.top+'px', left:size.left+'px'}">
      <div class="login_template">
        <div class="logo">
          <img src="../../assets/images/login-logo.png">
        </div>
        <form>
          <p class="error_tips" v-if="iserror">{{error_msg}}</p>
          <h4>
            登录<span>Sign In</span>
          </h4>
          <div class="form-group clearfix">
            <input type="text" v-model="data.mobile" @blur="checkErrorTimes()" placeholder="手机">
          </div>
          <div class="form-group clearfix">
            <input type="password" v-model="data.password" placeholder="密码">
          </div>
          <div class="form-group Captcha clearfix" v-if="showCode">
            <input class="code pull-left" type="text" v-model="data.code" placeholder="验证码">
            <img class="codeImg pull-left" v-bind:src="codeImg" @click="getcode()">
          </div>
          <div class="operate clearfix">
            <label class="choose pull-left">
               <el-checkbox v-model="checked">记住我</el-checkbox>
            </label>
            <router-link to="/forgotpwd" class="forget_pwd pull-right">忘记密码？</router-link>
          </div>
          <div class="form-group clearfix">
            <a class="login btn_1" @click="login()">登录</a>
          </div>
          <div class="form-group clearfix">
            <router-link to="/register" class="doregister btn_1">免费注册</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import {errorRequestHandle} from '../../assets/js/tool'
let $self = ''
export default {
  name: 'login',
  data () {
    return {
      wait: 60,
      iscode: false,
      data: {
        mobile: '',
        password: '',
        code: ''
      },
      size: {
        top: '',
        left: ''
      },
      iserror: false,
      error_msg: '',
      codeImg: '',
      checked: false,
      errorTime: '',
      showCode: false
    }
  },
  created () {
    $self = this
    if (this.$cookies.isKey('remberme')) {
      $self.data.mobile = this.$cookies.get('mobile')
      $self.data.password = this.$cookies.get('password')
      $self.checked = true
    } else {
      $self.data.mobile = ''
      $self.data.password = ''
      $self.checked = false
    }
    $self.onresize()
  },
  mounted () {
    document.onkeydown = function (e) {
      if (e && e.keyCode === 13) {
        $self.login()
      }
    }
    window.onresize = () => {
      return (() => {
        let windowHeight = document.documentElement.clientHeight
        let logintop = windowHeight - 600
        logintop = logintop / 2
        let windowWidth = document.documentElement.clientWidth
        let loginleft = windowWidth - 1000
        loginleft = loginleft / 2
        let top = logintop
        let left = loginleft
        $self.size = {
          top: top,
          left: left
        }
      })()
    }
  },
  methods: {
    onresize () {
      let windowHeight = document.documentElement.clientHeight
      let logintop = windowHeight - 600
      logintop = logintop / 2
      let windowWidth = document.documentElement.clientWidth
      let loginleft = windowWidth - 1000
      loginleft = loginleft / 2
      let top = logintop
      let left = loginleft
      $self.size = {
        top: top,
        left: left
      }
    },
    getcode () {
      let stamp = new Date().getTime()
      $self.$http.get('/customer-point/customer/create-img-code?' + stamp + '',
        {
          headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
          },
          emulateJSON: true
        }).then((res) => {
          $self.codeImg = res.url
        }).catch(errorRequestHandle)
    },
    checkErrorTimes () {
      let params = {
        mobile: $self.data.mobile
      }
      $self.$http.get('/customer-point/customer/login-err-times',
        {
          headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
          },
          params,
          emulateJSON: true
        }).then((res) => {
          if (res.body.code === 10000) {
            if (res.body.result > 3) {
              $self.showCode = true
            }
          }
        }).catch(errorRequestHandle)
    },
    login () {
      let params = $self.data
      $self.$http.post('/customer-point/customer/login',
        params,
        {
          headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
          },
          emulateJSON: true
        }).then((response) => {
          let res = response.body
          if (res.code === 10000) {
            if ($self.checked === true) {
              $self.$cookies.set('remberme', true, '7d')
              $self.$cookies.set('mobile', $self.data.mobile, '7d')
              $self.$cookies.set('password', $self.data.password, '7d')
            } else {
              $self.$cookies.remove('remberme')
              $self.$cookies.remove('mobile')
              $self.$cookies.remove('password')
            }
            $self.$router.push('/accountoverview')
          } else {
            $self.iserror = true
            $self.error_msg = res.result
            $self.checkErrorTimes()
            return false
          }
        }).catch(errorRequestHandle)
    }
  },
  watch: {
    'showCode' (val, oldVal) {
      if (val !== oldVal && val === true) {
        $self.getcode()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../assets/sass/login.scss'
</style>
