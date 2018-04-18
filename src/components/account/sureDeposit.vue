<template>
  <div class="dialog confirm_submit">
    <div class="panel_title">
      <label></label>
      <h4>
        在线入金申请信息
      </h4>
      <i class="iconfont icon-cha"></i>
    </div>
    <div class="panel_main">
      <ul>
        <li></li>
      </ul>
    </div>
    <div class="panel_footer">
      <ul class="operate clearfix">
        <li>
            <a class="cancel">返回</a>
        </li>
        <li>
            <a>打印</a>
        </li>
        <li>
            <a>确认</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
let $self = ''
export default {
  name: 'sureDeposit',
  props: {
    data: {
      type: Object
    }
  },
  created () {
    $self = this
    console.log($self)
  }
}
</script>
<style lang="sass" scoped>

</style>
