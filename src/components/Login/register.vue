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
            注册<span>Sign UP</span>
          </h4>
          <div class="form-group clearfix">
            <input type="text" v-model="data.realname" placeholder="真实姓名">
          </div>
          <div class="form-group clearfix">
            <input type="text" v-model="data.mobile" placeholder="手机">
          </div>
          <div class="form-group clearfix">
            <input type="password" v-model="data.password" placeholder="密码">
          </div>
          <div class="form-group Captcha clearfix">
            <input class="code pull-left" type="text" v-model="data.code" placeholder="验证码">
            <a class="btn_1 getcode pull-left" v-if="iscode == false" @click="getsms()">获取验证码</a>
            <a class="btn_1 getcode disabled pull-left" v-if="iscode">({{wait}}s)后重新获取</a>
          </div>
          <div class="form-group clearfix">
            <a class="login btn_1" @click="register()">注册</a>
          </div>
          <div class="form-group clearfix">
            <router-link to="/login" class="dologin btn_1">已有账号，直接登录</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import {errorRequestHandle} from '../../assets/js/tool'
import reg from '../../assets/js/reg'
let $self = ''
export default {
  name: 'register',
  data () {
    return {
      wait: 60,
      iscode: false,
      data: {
        realname: '',
        mobile: '',
        password: '',
        code: ''
      },
      size: {
        top: '',
        left: ''
      },
      iserror: false,
      error_msg: ''
    }
  },
  created () {
    $self = this
    $self.onresize()
  },
  mounted () {
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
    update () {
      $self.iscode = true
      if ($self.wait <= 0) {
        $self.wait = 60
        $self.iscode = false
        clearInterval($self.Interval)
      } else {
        $self.wait--
      }
    },
    getsms () {
      if ($self.data.mobile === '') {
        $self.iserror = true
        $self.error_msg = '请输入手机号！'
        return false
      }
      if (!reg.phone.test($self.data.mobile)) {
        $self.iserror = true
        $self.error_msg = '手机号有误！'
        return false
      } else {
        $self.iserror = false
        $self.error_msg = ''
        $self.Interval = setInterval($self.update, 1000)
        let params = {
          mobile: $self.data.mobile
        }
        $self.$http.get('/customer-point/customer/create-phone-code',
          {
            headers: {
              'Content-Type': 'application/json',
              'charset': 'utf-8'
            },
            params,
            emulateJSON: true
          }).then((res) => {
          }).catch(errorRequestHandle)
      }
    },
    register () {
      $self.iserror = false
      $self.error_msg = ''
      let params = $self.data
      if (params.realname === '') {
        $self.iserror = true
        $self.error_msg = '真实姓名不能为空'
        return false
      }
      if (params.mobile === '') {
        $self.iserror = true
        $self.error_msg = '请输入手机号！'
        return false
      }
      if (params.password === '') {
        $self.iserror = true
        $self.error_msg = '密码不能为空！'
        return false
      }
      if (params.code === '') {
        $self.iserror = true
        $self.error_msg = '验证码不能为空！'
        return false
      } else {
        $self.$http.post('/customer-point/customer/registry',
          params,
          {
            headers: {
              'Content-Type': 'application/json',
              'charset': 'utf-8'
            },
            emulateJSON: true
          }).then((response) => {
            console.log(response.body)
            let res = response.body
            if (res.code === 10000) {
              $self.$router.push('/login')
            } else {
              $self.iserror = true
              $self.error_msg = res.result
              return false
            }
          }).catch(errorRequestHandle)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../assets/sass/login.scss'
</style>
