<template>
  <div class="account_view deposit_view">
    <filiter></filiter>
    <div class="main_content">
      <h4>调整杠杆</h4>
      <form>
        <div class="account_select">
          <el-select v-model="lever_value" placeholder="请选择">
            <el-option v-for="item in lever" :key="item.value" :label="item.name" :value="item.value">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
            </el-option>
          </el-select>
          <span class="account_type">{{account_type}}</span>
        </div>
        <div class="form-group">
          <p class="tli">当前杠杆<span class="must">*</span></p>
          <input class="readonly" type="text" v-model="currentLeverage" readonly>
          <span class="notice">最低入金金额：100USD   最高入金金额：1000USD</span>
        </div>
        <div class="form-group">
          <p class="tli">期望杠杆<span class="must">*</span></p>
          <el-select v-model="expect_value" placeholder="请选择" v-bind:style="{width: '300px'}">
            <el-option v-for="item in expect" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="form-group">
          <p class="tli">备注</p>
          <textarea v-model="accountInfo.leverageRemark"></textarea>
        </div>
        <a class="submit" @click="submit()">提交</a>
      </form>
    </div>
  </div>
</template>
<script>
import filiter from './filiter.vue'
import {loginHandle, errorRequestHandle} from '../../assets/js/tool'
let $self = ''
export default {
  name: 'deposit',
  components: {
    'filiter': filiter
  },
  data () {
    return {
      lever: [],
      lever_value: '',
      account_type: '',
      expect: [],
      expect_value: '',
      accountInfo: {},
      currentLeverage: '',
      expectLeverageFirst: '',
      expectLeverageLast: ''
    }
  },
  created () {
    $self = this
    $self.init()
    $self.getexpect()
    $self.accountlist()
  },
  methods: {
    init () {
      let params = {
        accountId: 1
      }
      $self.$http.get('/customer-point/account/get-account',
        {
          headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
          },
          params,
          emulateJSON: true
        }).then(loginHandle).then((res) => {
          let json = res.body
          $self.accountInfo = json.result
          $self.lever_value = json.result.id
          $self.account_type = json.result.dbPlatformVO.englishName
          $self.currentLeverage = json.result.currentLeverageFirst + ':' + json.result.currentLeverageLast
          $self.expectLeverageFirst = json.result.expectLeverageFirst
          $self.expectLeverageLast = json.result.expectLeverageLast
        }).catch(errorRequestHandle)
    },
    accountlist () {
      let params = {
        customerId: localStorage.getItem('customerId')
      }
      $self.$http.get('/customer-point/account/get-accountlist',
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
            for (let i = 0; i < json.result.length; i++) {
              let data = json.result[i]
              let Key = data.dbPlatformVO.englishName + ' ' + data.dbDictVO.dictValue.substr(0, 2)
              $self.lever.push({value: data.id, name: data.accountBm, label: Key})
            }
          }
        }).catch(errorRequestHandle)
    },
    getexpect () {
      let expectlever = []
      if (JSON.parse(localStorage.getItem('lever')) !== null) {
        expectlever = JSON.parse(localStorage.getItem('lever'))
      }
      $self.expect = expectlever
      if ($self.expect.length === 0) {
        let params = {
          dictName: 'lever'
        }
        $self.$http.get('/customer-point/dict/get-dictlist',
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
              for (let i = 0; i < json.result.length; i++) {
                let data = json.result[i]
                $self.expect.push({value: data.id, label: data.dictValue})
                localStorage.setItem('lever', JSON.stringify($self.expect))
                let expect = $self.expectLeverageFirst + ':' + $self.expectLeverageLast
                for (let i = 0; i < $self.expect.length; i++) {
                  if (expect === $self.expect[i].label) {
                    $self.expect_value = $self.expect[i].value
                  }
                }
              }
            }
          }).catch(errorRequestHandle)
      } else {
        let expect = $self.expectLeverageFirst + ':' + $self.expectLeverageLast
        for (let i = 0; i < $self.expect.length; i++) {
          if (expect === $self.expect[i].label) {
            $self.expect_value = $self.expect[i].value
          }
        }
      }
    },
    submit () {
      let params = {
        id: $self.lever_value,
        expectLeverageFirst: '1',
        expectLeverageLast: '500',
        leverageRemark: $self.accountInfo.leverageRemark
      }
      $self.$http.post('/customer-point/account/edit-account',
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
            $self.init()
          }
        }).catch(errorRequestHandle)
    }
  },
  watch: {
    'lever_value' (val, oldVal) {
      for (let i = 0; i < $self.lever.length; i++) {
        if (val === $self.lever[i].value) {
          $self.account_type = $self.lever[i].label
        }
      }
    },
    'expect_value' (val, oldVal) {
      for (let i = 0; i < $self.expect.length; i++) {
        if (val === $self.expect[i].value) {
          $self.expectLeverageFirst = ''
          $self.expectLeverageLast = ''
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/sass/account.scss"
</style>
