<template>
  <div class="accountInfo_view">
    <filiter></filiter>
    <div class="main_content">
      <h4>账户基本资料</h4>
      <form>
        <div class="form-group clearfix">
          <label class="control-label pull-left">姓名<span class="must">*</span></label>
          <input class="control-input pull-left" type="text">
        </div>
        <div class="form-group clearfix">
          <label class="control-label pull-left">邮箱<span class="must">*</span></label>
          <input class="control-input pull-left" type="text">
        </div>
        <div class="form-group clearfix">
          <label class="control-label pull-left">手机</label>
          <input class="control-input pull-left" type="text">
        </div>
        <div class="form-group clearfix">
          <label class="control-label pull-left">社交通讯</label>
          <input class="control-input pull-left" type="text">
        </div>
        <div class="form-group clearfix">
          <label class="control-label pull-left">出生地</label>
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
  name: 'basicinfo',
  components: {
    'filiter': filiter
  }
}
</script>
<style lang="sass" scoped>
@import '../../assets/sass/accountinfo.scss'
</style>
