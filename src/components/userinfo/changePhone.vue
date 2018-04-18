<template>
  <div class="dialog addbank_view">
    <div class="panel_title">
      <label></label>
      <h4>修改手机</h4>
      <i class="iconfont icon-cha" @click="cancel()"></i>
    </div>
    <div class="panel_main">
      <form>
        <div class="form-group clearfix">
          <label class="label-control pull-left">新手机</label>
          <input class="input-control pull-left" type="text" v-model="data.mobile">
          <p class="error_tips" v-if="error.mobile != ''">{{error.mobile}}</p>
        </div>
        <div class="form-group clearfix">
          <label class="label-control pull-left">验证码</label>
          <input class="input-control getcode pull-left" type="text" v-model="data.code">
          <a class="Captcha pull-left" v-if="iscode == false" @click="getsms()">获取验证码</a>
          <a class="Captcha disabled pull-left" v-if="iscode">({{wait}}s)后重新获取</a>
          <p class="error_tips" v-if="error.code != ''">{{error.code}}</p>
        </div>
        <div class="form-group clearfix">
          <label class="label-control pull-left">登录密码</label>
          <input class="input-control pull-left" type="password" v-model="data.password">
          <p class="error_tips" v-if="error.password != ''">{{error.password}}</p>
        </div>
      </form>
    </div>
    <div class="panel_footer">
      <ul class="operate clearfix">
        <li>
            <a class="cancel" @click="cancel()">取消</a>
        </li>
        <li>
            <a @click="submit()">确认</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import reg from '../../assets/js/reg'
import {loginHandle, errorRequestHandle} from '../../assets/js/tool'
let $self = ''
export default {
  name: 'changePhone',
  data () {
    return {
      wait: 60,
      iscode: false,
      data: {
        code: '',
        mobile: '',
        password: ''
      },
      error: {
        mobile: '',
        code: '',
        password: ''
      }
    }
  },
  created () {
    $self = this
  },
  'methods': {
    'cancel': function () {
      $self.$layer.closeAll()
    },
    'update': function () {
      $self.iscode = true
      if ($self.wait <= 0) {
        $self.wait = 60
        $self.iscode = false
        clearInterval($self.Interval)
      } else {
        $self.wait--
      }
    },
    'getsms': function () {
      if ($self.data.mobile === '') {
        $self.error.mobile = '请输入手机号！'
        return false
      }
      if (!reg.phone.test($self.data.mobile)) {
        /* $self.$message({
          message: '手机号有误！',
          type: 'error',
          duration: '2000'
        }) */
        $self.error.mobile = '手机号有误！'
        return false
      } else {
        $self.error.mobile = ''
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
    'submit': function () {
      let params = $self.data
      $self.error = {
        mobile: '',
        code: '',
        password: ''
      }
      if (params.mobile === '') {
        $self.error.mobile = '手机号不能为空！'
        return false
      }
      if (params.code === '') {
        $self.error.code = '验证码不能为空！'
        return false
      }
      if (params.password === '') {
        $self.error.password = '密码不能为空！'
        return false
      } else {
        $self.$http.post('/customer-point/customer/modify-mobile',
          params,
          {
            headers: {
              'Content-Type': 'application/json',
              'charset': 'utf-8'
            },
            emulateJSON: true
          }).then(loginHandle).then((res) => {
            let json = res.body
            if (json.code === 10000) {
              $self.$message({
                message: '操作成功',
                type: 'success',
                duration: '2000'
              })
              $self.cancel()
              $self.$parent().init()
            }
          }).catch(errorRequestHandle)
      }
    }
  }
}
</script>
<style lang="sass" scoped>
@import '../../assets/sass/userinfo.scss'
</style>
