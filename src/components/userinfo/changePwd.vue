<template>
  <div class="dialog addbank_view">
    <div class="panel_title">
      <label></label>
      <h4>修改密码</h4>
      <i class="iconfont icon-cha" @click="cancel()"></i>
    </div>
    <div class="panel_main">
      <form>
        <div class="form-group clearfix">
          <label class="label-control pull-left">旧密码</label>
          <input class="input-control pull-left" type="password" v-model="data.originalpwd">
        </div>
        <div class="form-group clearfix">
          <label class="label-control pull-left">新密码</label>
          <input class="input-control pull-left" type="password" v-model="data.newpwd">
        </div>
        <div class="form-group clearfix">
          <label class="label-control pull-left">登录密码</label>
          <input class="input-control pull-left" type="password" v-model="repwd">
        </div>
      </form>
    </div>
    <div class="panel_footer">
      <ul class="operate clearfix">
        <li>
            <a class="cancel" @click="cancel()">取消</a>
        </li>
        <li>
            <a @click="sumbit()">确认</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {loginHandle, errorRequestHandle} from '../../assets/js/tool'
let $self = ''
export default {
  name: 'changePwd',
  data () {
    return {
      data: {
        originalpwd: '',
        newpwd: ''
      },
      repwd: ''
    }
  },
  created () {
    $self = this
  },
  'methods': {
    'sumbit': function () {
      let params = $self.data
      if (params.originalpwd === '' || params.newpwd === '' || $self.repwd === '') {
        return false
      }
      if (params.newpwd !== $self.repwd) {
        return false
      } else {
        $self.$http.post('/customer-point/customer/modify-password',
          params,
          {
            headers: {
              'Content-Type': 'application/json',
              'charset': 'utf-8'
            },
            emulateJSON: true
          }).then(loginHandle).then((res) => {
            console.log(res.body)
            let json = res.body
            if (json.code === 10000) {
              $self.$message({
                message: '操作成功',
                type: 'success',
                duration: '2000'
              })
              $self.cancel()
              setTimeout($self.gologin(), 3000)
            }
          }).catch(errorRequestHandle)
      }
    },
    'gologin': function () {
      localStorage.removeItem('UserId')
      $self.$router.push('/login')
    },
    'cancel': function () {
      $self.$layer.closeAll()
    }
  }
}
</script>
<style lang="sass" scoped>
@import '../../assets/sass/userinfo.scss'
</style>
