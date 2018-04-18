<template>
  <div class="applydemo_view">
    <div class="main_content">
      <h4>
        申请模拟账户
        <span>mt4</span>
      </h4>
      <form>
        <div class="form-group">
          <p class="tli">账户名<span class="must">*</span></p>
          <input type="text" v-model="demo.account">
          <p class="error_tips" v-if="error.account != ''">{{error.account}}</p>
        </div>
        <div class="form-group">
          <p class="tli">邮箱<span class="must">*</span></p>
          <input type="text" v-model="demo.email">
          <p class="error_tips" v-if="error.email != ''">{{error.eamil}}</p>
        </div>
        <div class="form-group">
          <p class="tli">电话</p>
          <input type="text" v-model="demo.tel">
        </div>
        <div class="form-group">
          <p class="tli">账户类型</p>
          <el-select v-model="type_value" placeholder="请选择类型" v-bind:style="{width:'300px'}">
            <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
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
  name: 'applydemo',
  data () {
    return {
      demo: {
        account: '',
        email: '',
        tel: '',
        type: []
      },
      type_value: '',
      error: {
        account: '',
        email: ''
      }
    }
  },
  created () {
    $self = this
  },
  methods: {
    submit () {
      let demo = $self.demo
      $self.error.account = ''
      $self.error.email = ''
      if (demo.account === '') {
        $self.error.account = '账户名不能为空！'
        return false
      }
      if (demo.email === '') {
        $self.error.email = '邮箱不能为空！'
        return false
      }
    },
    cancel () {
      $self.$router.go(-1)
    }
  }
}
</script>
<style lang="sass" scoped>
@import '../../assets/sass/openaccount.scss'
</style>
