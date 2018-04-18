<template>
  <div class="dialog addbank_view">
    <div class="panel_title">
      <label></label>
      <h4>提示</h4>
      <i class="iconfont icon-cha" @click="cancel()"></i>
    </div>
    <div class="panel_main">
      <div class="confirm clearfix">
        <i class="iconfont icon-tishi pull-left"></i>
        <p class="tips pull-left">是否确认删除该银行卡？</p>
      </div>
    </div>
    <div class="panel_footer">
      <ul class="operate clearfix">
        <li>
            <a class="cancel" @click="cancel()">取消</a>
        </li>
        <li>
            <a @click="sure()">确认</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {loginHandle, errorRequestHandle} from '../../assets/js/tool'
export default {
  name: 'addbank',
  created () {
    console.log(this)
  },
  'methods': {
    'cancel': function () {
      this.$layer.closeAll()
    },
    'sure': function () {
      let id = this.$parent.delId
      let params = {
        id: id
      }
      this.$http.get('/customer-point/bank/del-bank',
        {
          headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
          },
          params,
          emulateJSON: true
        }).then(loginHandle).then((res) => {
          if (res.body.code === 10000) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: '2000'
            })
            this.$parent.init()
            this.cancel()
          }
        }).catch(errorRequestHandle)
    }
  }
}
</script>
<style lang="sass" scoped>
@import '../../assets/sass/userinfo.scss'
</style>
