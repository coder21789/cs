<template>
  <div class="accountInfo_view">
    <filiter></filiter>
    <div class="main_content">
      <h4>账户财务资料</h4>
      <form>
        <div class="form-group clearfix">
          <label class="control-label pull-left">投资经验</label>
          <div class="checkList pull-left">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="股票"></el-checkbox>
              <el-checkbox label="债券"></el-checkbox>
              <el-checkbox label="期货"></el-checkbox>
              <el-checkbox label="期权"></el-checkbox>
              <el-checkbox label="外汇"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="form-group clearfix">
          <label class="control-label pull-left">投资年数</label>
          <input class="control-input pull-left" type="text">
        </div>
        <div class="form-group clearfix">
          <label class="control-label pull-left">投资目的</label>
          <input class="control-input pull-left" type="text">
        </div>
        <div class="form-group clearfix">
          <label class="control-label pull-left">开户银行</label>
          <input class="control-input pull-left" type="text">
        </div>
        <div class="form-group clearfix">
          <label class="control-label pull-left">银行所在地</label>
          <input class="control-input pull-left" type="text">
        </div>
        <div class="form-group clearfix">
          <label class="control-label pull-left">银行卡号码</label>
          <input class="control-input pull-left" type="text">
        </div>
        <div class="form-group clearfix">
          <label class="control-label pull-left">备注</label>
          <textarea class="pull-left"></textarea>
        </div>
        <a class="edit">编辑</a>
      </form>
    </div>
  </div>
</template>
<script>
import filiter from './filiter.vue'
export default {
  name: 'financeinfo',
  data () {
    return {
      checkList: []
    }
  },
  components: {
    'filiter': filiter
  },
  watch: {
    'checkList' (val, oldVal) {
      console.log('val', val)
    }
  }
}
</script>
<style lang="sass" scoped>
@import '../../assets/sass/accountinfo.scss'
</style>
