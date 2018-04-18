<template>
  <div class="account_view deposit_view">
    <filiter></filiter>
    <div class="main_content">
      <h4>申请出金</h4>
      <form>
        <div class="account_select">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
            </el-option>
          </el-select>
          <span class="account_type">{{account_type}}</span>
        </div>
        <div class="form-group">
          <p class="tli">当前余额</p>
          <input type="text">
        </div>
        <div class="form-group">
          <p class="tli">出金金额(￥)<span class="must">*</span></p>
          <input type="text">
          <span class="notice">人民币出金金额：0.00 ( 汇率 6.6699234 )</span>
        </div>
        <div class="form-group">
          <p class="tli">选择银行卡</p>
          <input type="text" placeholder="根据入金金额自动计算" disabled>
        </div>
        <div class="form-group">
          <p class="tli">SWIFT代码<span class="must">*</span></p>
          <input type="text">
        </div>
        <div class="form-group">
          <p class="tli">支行名称<span class="must">*</span></p>
          <input type="text">
        </div>
        <div class="form-group">
          <p class="tli">银行地址<span class="must">*</span></p>
          <input type="text">
        </div>
        <div class="form-group">
          <p class="tli">备注</p>
          <textarea></textarea>
        </div>
        <a class="submit">提交</a>
      </form>
    </div>
  </div>
</template>
<script>
import filiter from './filiter.vue'
let $self = ''
export default {
  name: 'withdraw',
  components: {
    'filiter': filiter
  },
  data () {
    return {
      options: [{
        value: '14000027',
        label: 'MT4 真实'
      }, {
        value: '14000028',
        label: 'MT5 真实'
      }, {
        value: '14000029',
        label: 'MT6 模拟'
      }, {
        value: '14000030',
        label: 'MT5 模拟'
      }, {
        value: '14000031',
        label: 'MT5 真实'
      }],
      value: '14000027',
      account_type: ''
    }
  },
  created () {
    $self = this
  },
  watch: {
    'value' (val, oldVal) {
      for (let i = 0; i < $self.options.length; i++) {
        if ($self.options[i].value === val) {
          $self.account_type = $self.options[i].label
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/sass/account.scss"
</style>
