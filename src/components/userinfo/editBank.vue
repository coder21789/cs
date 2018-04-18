<template>
  <div class="dialog addbank_view">
    <div class="panel_title">
      <label></label>
      <h4>添加银行卡</h4>
      <i class="iconfont icon-cha" @click="cancel()"></i>
    </div>
    <div class="panel_main">
      <form>
        <div class="form-group clearfix">
          <label class="label-control pull-left">银行选择<span class="must">*</span></label>
          <div class="select-control pull-left">
            <el-select v-model="bank.bankId" placeholder="请选择银行">
              <el-option
                v-for="item in banklist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <p class="error_tips" v-if="error.bank != ''">{{error.bank}}</p>
        </div>
        <div class="form-group clearfix">
          <label class="label-control pull-left">银行账号<span class="must">*</span></label>
          <input class="input-control pull-left" type="text" v-model="bank.bankAccount">
          <p class="error_tips" v-if="error.bankAccount !=''">{{error.bankAccount}}</p>
        </div>
        <div class="form-group clearfix">
          <label class="label-control pull-left">收款人<span class="must">*</span></label>
          <input class="input-control pull-left" type="text" v-model="bank.beneficiaryName">
          <p class="error_tips" v-if="error.beneficiaryName != ''">{{error.beneficiaryName}}</p>
        </div>
        <div class="form-group clearfix">
          <label class="label-control pull-left">SWIFT代码</label>
          <input class="input-control pull-left" type="text" v-model="bank.swiftCode">
        </div>
        <div class="form-group clearfix">
          <label class="label-control pull-left">支行名称</label>
          <input class="input-control pull-left" type="text" v-model="bank.branchName">
        </div>
        <div class="form-group clearfix">
          <label class="label-control pull-left">银行地址</label>
          <input class="input-control pull-left" type="text" v-model="bank.bankAddress">
        </div>
        <div class="form-group clearfix">
           <el-checkbox v-model="checked">设为默认银行卡</el-checkbox>
        </div>
      </form>
    </div>
    <div class="panel_footer">
      <ul class="operate clearfix">
        <li>
            <a class="cancel" @click="cancel()">取消</a>
        </li>
        <li>
            <a @click="addBank()">确认</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {loginHandle, errorRequestHandle} from '../../assets/js/tool'
let $self = ''
export default {
  name: 'addbank',
  data () {
    return {
      banklist: [],
      bank: {
        customerId: localStorage.getItem('customerId'),
        bankId: '',
        beneficiaryName: '',
        bankAccount: '',
        swiftCode: '',
        bankAddress: '',
        branchName: '',
        isDefault: 1
      },
      checked: false,
      isedit: true,
      error: {
        bank: '',
        beneficiaryName: '',
        bankAccount: ''
      }
    }
  },
  created () {
    $self = this
    $self.init()
  },
  'methods': {
    'init': function () {
      $self.getBank()
      if ($self.$parent.editId !== '') {
        let id = $self.$parent.editId
        let params = {
          id: id
        }
        $self.$http.get('/customer-point/bank/find-bank',
          {
            headers: {
              'Content-Type': 'application/json',
              'charset': 'utf-8'
            },
            params,
            emulateJSON: true
          }).then(loginHandle).then((res) => {
            let json = res.body
            if (json.code === 10000) {
              console.log(json)
              $self.bank.bankId = json.result.bankId
              $self.bank.beneficiaryName = json.result.beneficiaryName
              $self.bank.bankAccount = json.result.bankAccount
              $self.bank.swiftCode = json.result.swiftCode
              $self.bank.bankAddress = json.result.bankAddress
              $self.bank.branchName = json.result.branchName
              $self.bank.isDefault = json.result.isDefault
              if ($self.bank.isDefault === 1) {
                $self.checked = true
              } else {
                $self.checked = false
              }
            }
          }).catch(errorRequestHandle)
        $self.isedit = true
      } else {
        $self.isedit = false
      }
    },
    'cancel': function () {
      $self.$layer.closeAll()
    },
    'getBank': function () {
      $self.$http.get('/customer-point/bank/get-banklist',
        {
          headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
          },
          emulateJSON: true
        }).then(loginHandle).then((res) => {
          let json = res.body
          if (json.code === 10000) {
            for (let i = 0; i < json.result.length; i++) {
              $self.banklist.push({value: json.result[i].id, label: json.result[i].chineseName})
            }
          }
        }).catch(errorRequestHandle)
    },
    'addBank': function () {
      let params = $self.bank
      let flag = true
      $self.error.bank = ''
      $self.error.beneficiaryName = ''
      $self.error.bankAccount = ''
      if (params.bankId === '') {
        $self.error.bank = '请选择银行'
        flag = false
      }
      if (params.beneficiaryName === '') {
        $self.error.beneficiaryName = '请填写收款人'
        flag = false
      }
      if (params.bankAccount === '') {
        $self.error.bankAccount = '请输入银行卡号'
        flag = false
      }
      if (flag === false) {
        return false
      } else {
        if ($self.isedit === false) {
          $self.$http.post('/customer-point/bank/add-bank',
            params,
            {
              headers: {
                'Content-Type': 'application/json',
                'charset': 'utf-8'
              },
              emulateJSON: true
            }).then(loginHandle).then((res) => {
              let json = res.body
              if (json.code === 10000) {
                $self.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: '2000'
                })
                $self.$parent.init()
                $self.cancel()
              }
            })
        } else {
          params.id = $self.$parent.editId
          $self.$http.post('/customer-point/bank/edit-bank',
            params,
            {
              headers: {
                'Content-Type': 'application/json',
                'charset': 'utf-8'
              },
              emulateJSON: true
            }).then(loginHandle).then((res) => {
              let json = res.body
              if (json.code === 10000) {
                $self.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: '2000'
                })
                $self.$parent.init()
                $self.cancel()
              }
            })
        }
      }
    }
  },
  watch: {
    'checked' (val, oldVal) {
      if (val === true) {
        $self.bank.isDefault = 1
      } else {
        $self.bank.isDefault = 0
      }
    }
  }
}
</script>
<style lang="sass" scoped>
@import '../../assets/sass/userinfo.scss'
</style>
