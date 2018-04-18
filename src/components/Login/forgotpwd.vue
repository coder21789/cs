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
            重置密码<span>RESET</span>
          </h4>
          <div class="step1" v-if="step1">
            <div class="form-group clearfix">
              <input type="text" v-model="data.mobile" @blur="checkphone()" placeholder="手机号">
            </div>
            <div class="form-group Captcha clearfix">
              <input class="code pull-left" type="text" v-model="data.code" placeholder="验证码">
              <a class="btn_1 getcode pull-left" v-if="iscode == false" @click="getsms()">获取验证码</a>
              <a class="btn_1 getcode disabled pull-left" v-if="iscode">({{wait}}s)后重新获取</a>
            </div>
            <div class="form-group clearfix">
              <a class="next btn_1" @click="next()">下一步</a>
            </div>
            <div class="form-group clearfix">
              <router-link to="/login" class="dologin btn_1">返回登录</router-link>
            </div>
          </div>
          <div class="step2" v-if="step2">
            <div class="form-group clearfix">
              <input type="password" v-model="data.password" placeholder="新密码">
            </div>
            <div class="form-group clearfix">
              <input type="password" v-model="repassword" placeholder="确认密码">
            </div>
            <div class="form-group clearfix">
              <a class="reset btn_1" @click="submit()">确认重置</a>
            </div>
            <div class="form-group clearfix">
              <router-link to="/login" class="dologin btn_1">返回登录</router-link>
            </div>
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
  name: 'forgotpwd',
  data () {
    return {
      step1: true,
      step2: false,
      wait: 60,
      iscode: false,
      repassword: '',
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
      noregister: false
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
    checkphone () {
      let params = {
        mobile: $self.data.mobile
      }
      $self.$http.get('/customer-point/customer/mobile-check',
        {
          headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
          },
          params,
          emulateJSON: true
        }).then((res) => {
          console.log(res.body)
          if (res.body.result === true) {
            $self.noregister = true
            $self.iserror = true
            $self.error_msg = '该手机未注册！'
            return false
          } else {
            $self.noregister = false
            $self.iserror = false
            $self.error_msg = ''
          }
        }).catch(errorRequestHandle)
    },
    next () {
      let json = $self.data
      $self.iserror = false
      $self.error_msg = ''
      if ($self.noregister === true) {
        $self.iserror = true
        $self.error_msg = '该手机未注册！'
        return false
      }
      if (json.mobile === '') {
        $self.iserror = true
        $self.error_msg = '请输入手机号！'
        return false
      }
      if (json.code === '') {
        $self.iserror = true
        $self.error_msg = '请输入验证码！'
        return false
      } else {
        $self.step1 = !$self.step1
        $self.step2 = !$self.step2
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
      if ($self.noregister === true) {
        $self.iserror = true
        $self.error_msg = '该手机未注册！'
        return false
      }
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
    submit () {
      if ($self.data.password === '') {
        $self.iserror = true
        $self.error_msg = '请填写用户密码！'
        return false
      }
      if ($self.repassword === '') {
        $self.iserror = true
        $self.error_msg = '请填写确认密码！'
        return false
      }
      if ($self.data.password !== $self.repassword) {
        $self.iserror = true
        $self.error_msg = '两次密码输入不一致！'
        return false
      } else {
        let params = {
          password: $self.data.password,
          code: $self.data.code,
          mobile: $self.data.mobile
        }
        $self.$http.post('/customer-point/customer/reset-password',
          params,
          {
            headers: {
              'Content-Type': 'application/json',
              'charset': 'utf-8'
            },
            emulateJSON: true
          }).then((res) => {
            if (res.body.code === 10000) {
              $self.$message({
                message: '操作成功',
                type: 'success',
                duration: '2000'
              })
              setTimeout($self.gologin(), 3000)
            } else {
              $self.iserror = true
              $self.error_msg = res.body.result
            }
          }).catch(errorRequestHandle)
      }
    },
    gologin () {
      $self.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../assets/sass/login.scss'
</style>
