<template>
  <div class="bindaccount_view">
    <div class="main_content">
      <h4>
        绑定账户
        <span>mt4</span>
      </h4>
      <form>
        <div class="form-group">
          <p class="tli">账户名<span class="must">*</span></p>
          <input type="text">
          <p class="error_tips" v-if="error.account !=''">{{error.account}}</p>
        </div>
        <div class="form-group">
          <p class="tli">主密码<span class="must">*</span></p>
          <input type="text">
          <p class="error_tips" v-if="error.password !=''">{{error.password}}</p>
        </div>
        <div class="form-group">
          <p class="tli">交易账号<span class="must">*</span></p>
          <input type="text">
          <p class="error_tips" v-if="error.tradeAccount !=''">{{error.tradeAccount}}</p>
        </div>
        <div class="form-group">
          <p class="tli">服务器</p>
          <input type="text">
        </div>
        <div class="form-group">
          <p class="tli">备注</p>
          <textarea></textarea>
        </div>
        <div class="operates clearfix">
          <a class="btn cancel" @click="cancel()">取消</a>
          <a class="btn submit" @click="submit()">提交</a>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
let $self = ''
export default {
  name: 'bindaccount',
  data () {
    return {
      data: {
        account: '',
        password: '',
        tradeAccount: '',
        ftp: '',
        notice: ''
      },
      error: {
        account: '',
        password: '',
        tradeAccount: ''
      }
    }
  },
  created () {
    $self = this
  },
  methods: {
    cancel () {
      $self.$router.go(-1)
    },
    submit () {
      let data = $self.data
      if (data.account === '') {
        $self.error.account = '账户名不能为空！'
        return false
      }
      if (data.password === '') {
        $self.error.password = '主密码不能为空！'
        return false
      }
      if (data.tradeAccount === '') {
        $self.error.tradeAccount = '交易账号不能为空！'
        return false
      }
    }
  }
}
</script>
<style lang="sass" scoped>
@import '../../assets/sass/openaccount.scss'
</style>
