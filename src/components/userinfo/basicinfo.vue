<template>
  <div class="userinfo_view">
    <filiter></filiter>
    <div class="main_content Ubasicinfo_view">
      <h4>用户基本资料</h4>
      <form>
        <div class="form-group">
          <p class="tli">
            用户名
            <label><span class="must">*</span>设置后无法修改</label>
          </p>
          <div class="clearfix">
            <input class="control-input pull-left" type="text" v-model="data.username">
            <a class="btn sure pull-left" @click="bindUsername()">确认</a>
          </div>
        </div>
        <div class="form-group">
          <p class="tli">登录密码</p>
          <div class="clearfix">
            <input class="control-input readonly pull-left" type="password" v-model="data.password" readonly>
            <a class="btn edit pull-left" @click="changePwd()">修改</a>
          </div>
        </div>
        <div class="form-group">
          <p class="tli">绑定邮箱</p>
          <div class="clearfix">
            <input class="control-input readonly pull-left" type="text" v-model="data.email" readonly>
            <a class="btn edit pull-left" @click="changeEmail()">修改</a>
          </div>
        </div>
        <div class="form-group">
          <p class="tli">绑定手机</p>
          <div class="clearfix">
            <input class="control-input readonly pull-left" type="text" v-model="data.mobile" readonly>
            <a class="btn edit pull-left" @click="changePhone()">修改</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import filiter from './filiter.vue'
import changeEmail from './changeEmail.vue'
import changePhone from './changePhone.vue'
import changePwd from './changePwd.vue'
import {loginHandle, errorRequestHandle} from '../../assets/js/tool'
let $self = ''
export default {
  name: 'Ubasicinfo',
  data () {
    return {
      data: {}
    }
  },
  components: {
    'filiter': filiter
  },
  created () {
    $self = this
    $self.init()
  },
  'methods': {
    'init': function () {
      $self.$http.get('/customer-point/customer/login-data',
        {
          headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
          },
          emulateJSON: true
        }).then(loginHandle).then((res) => {
          $self.data = res.body.result
          // console.log($self.data)
          localStorage.setItem('UserId', res.body.result.id)
        }).catch(errorRequestHandle)
    },
    'bindUsername': function () {
      let params = {
        username: $self.data.username
      }
      $self.$http.post('/customer-point/customer/bind-username',
        params,
        {
          headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
          },
          emulateJSON: true
        }).then(loginHandle).then((res) => {
          if (res.body.code === 10000) {
            $self.$message({
              message: '操作成功',
              type: 'success',
              duration: '2000'
            })
            $self.data = res.body.result
          } else {
            $self.init()
          }
        }).catch(errorRequestHandle)
    },
    'changeEmail': function () {
      $self.$layer.iframe({
        title: '',
        content: {
          content: changeEmail,
          parent: $self,
          data: []
        },
        area: ['500px', 'auto']
      })
    },
    'changePhone': function () {
      $self.$layer.iframe({
        title: '',
        content: {
          content: changePhone,
          parent: $self,
          data: []
        },
        area: ['500px', 'auto']
      })
    },
    'changePwd': function () {
      $self.$layer.iframe({
        title: '',
        content: {
          content: changePwd,
          parent: $self,
          data: []
        },
        area: ['500px', 'auto']
      })
    }
  }
}
</script>
<style lang="sass" scoped>
@import "../../assets/sass/userinfo.scss"
</style>
