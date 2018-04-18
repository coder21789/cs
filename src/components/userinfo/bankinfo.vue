<template>
  <div class="userinfo_view">
    <filiter></filiter>
    <div class="main_content Ubankinfo_view">
      <div class="operate">
        <a class="addBank" @click="edit('')">添加银行卡</a>
      </div>
      <ul class="banklist clearfix" v-if="bank.length > 0">
        <li v-for="item in bank">
          <a class="item">
            <label class="isDefault" v-if="Number(item.isDefault) == 1">默认</label>
            <div class="bank">
              <img src="../../assets/images/bank_icon.png">
              <p class="account">{{item.bankAccount}}</p>
            </div>
            <p class="info clearfix">
              <span class="pull-left">收款人</span>
              <label class="pull-right">{{item.beneficiaryName}}</label>
            </p>
            <p class="info clearfix">
              <span class="pull-left">SWIFT代码</span>
              <label class="pull-right">{{item.swiftCode}}</label>
            </p>
            <p class="info clearfix">
              <span class="pull-left">支行名称</span>
              <label class="pull-right">{{item.branchName}}</label>
            </p>
            <p class="info clearfix">
              <span class="pull-left">银行地址</span>
              <label class="pull-right">{{item.bankAddress}}</label>
            </p>
            <div class="mask">
            </div>
            <a class="btn delete" @click="del(item.id)">删除</a>
            <a class="btn edit" @click="edit(item.id)">编辑</a>
          </a>
        </li>
      </ul>
      <div class="no_result" v-if="bank.length == 0">
        <img src="../../assets/images/no_bank.png">
        <p>当前暂无银行卡</p>
      </div>
    </div>
  </div>
</template>
<script>
import filiter from './filiter.vue'
import Dialog from './editBank.vue'
import Tip from './tip.vue'
import {loginHandle, errorRequestHandle} from '../../assets/js/tool'
let $self = ''
export default {
  name: 'Ubankinfo',
  data () {
    return {
      bank: [],
      flag: true,
      delId: '',
      editId: ''
    }
  },
  created () {
    $self = this
    $self.init()
  },
  components: {
    'filiter': filiter
  },
  'methods': {
    'init': function () {
      let params = {
        customerId: localStorage.getItem('customerId')
      }
      $self.$http.get('/customer-point/bank/get-bankaccountlist',
        {
          headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
          },
          params,
          emulateJSON: true
        }).then(loginHandle).then((res) => {
          let json = res.body.result
          $self.bank = json
        }).catch(errorRequestHandle)
      $self.canAdd()
    },
    'canAdd': function () {
      let params = {
        customerId: localStorage.getItem('customerId')
      }
      $self.$http.get('/customer-point/bank/add-check',
        {
          headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
          },
          params,
          emulateJSON: true
        }).then(loginHandle).then((res) => {
          let json = res.body
          console.log(json)
          $self.flag = json.result
        }).catch(errorRequestHandle)
    },
    'edit': function (id) {
      if ($self.flag === false) {
        $self.$message({
          message: '您最多只能绑定10张银行卡',
          type: 'warning',
          duration: '2000'
        })
        return false
      } else {
        $self.editId = id
        $self.$layer.iframe({
          title: '',
          content: {
            content: Dialog,
            parent: $self,
            data: []
          },
          area: ['500px', 'auto']
        })
      }
    },
    'del': function (id) {
      $self.delId = id
      $self.$layer.iframe({
        title: '',
        content: {
          content: Tip,
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