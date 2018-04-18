<template>
  <div class="account_view">
    <filiter></filiter>
    <div class="main_content">
      <h4>交易报表</h4>
      <div class="filiter_bar clearfix">
         <div class="account_select pull-left">
           <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value">
                <span style="float: left">{{ item.value }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
              </el-option>
            </el-select>
            <span class="account_type">{{account_type}}</span>
         </div>
         <ul class="pull-right clearfix">
           <li class="time_select">
             <label>交易时间</label>
             <el-date-picker v-model="time" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions2" id="time_select">
             </el-date-picker>
           </li>
           <li class="single">
              <el-select v-model="record_value" placeholder="请选择" class="center">
                <el-option v-for="item in record" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
           </li>
           <li class="single">
              <el-select v-model="pay_value" placeholder="请选择" class="center">
                <el-option v-for="item in pay" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
           </li>
           <li class="single">
              <el-select v-model="apply_value" placeholder="请选择" class="center">
                <el-option v-for="item in apply" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
           </li>
         </ul>
      </div>
      <div class="list">
        <table>
          <thead>
            <tr>
              <td v-bind:style="{width:'170px'}">申请ID</td>
              <td v-bind:style="{width:'110px'}">入金金额($)</td>
              <td v-bind:style="{width:'170px'}">创建时间</td>
              <td v-bind:style="{width:'110px'}">支付金额($)</td>
              <td v-bind:style="{width:'150px'}">支付状态</td>
              <td v-bind:style="{width:'150px'}">申请状态</td>
              <td v-bind:style="{width:'170px'}">处理时间</td>
              <td v-bind:style="{width:'120px'}"><p>备注</p></td>
            </tr>
          </thead>
          <tbody v-if="json.length > 0">
            <tr v-for="item in json">
              <td v-bind:style="{width:'170px'}">{{item.applyId}}</td>
              <td v-bind:style="{width:'110px'}">{{item.entry}}</td>
              <td v-bind:style="{width:'170px'}">{{item.Ctime | time}}</td>
              <td v-bind:style="{width:'110px'}">{{item.pay}}</td>
              <td v-bind:style="{width:'150px'}" v-if="item.pay_status == 0"><label class="paid"></label>未支付</td>
              <td v-bind:style="{width:'150px'}" v-if="item.pay_status == 1"><label class="unpaid"></label>已支付</td>
              <td v-bind:style="{width:'150px'}" v-if="item.apply_status == 0"><label class="refuse"></label>拒绝</td>
              <td v-bind:style="{width:'150px'}" v-if="item.apply_status == 1"><label class="process"></label>处理中</td>
              <td v-bind:style="{width:'150px'}" v-if="item.apply_status == 2"><label class="completed"></label>已完成</td>
              <td v-bind:style="{width:'170px'}">{{item.dealTime | time}}</td>
              <td v-bind:style="{width:'120px'}"><p>无</p></td>
            </tr>
          </tbody>
        </table>
        <Pages v-if="json.length > 0"></Pages>
        <div class="no_result" v-if="json.length == 0">
          <img v-bind:src='loading_error.img'>
          <p>{{loading_error.tip}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import filiter from './filiter.vue'
import account from '../../assets/js/account'
import Pages from '../common/page.vue'
let $self = ''
export default {
  name: 'depositrecord',
  data () {
    return {
      loading_error: {
        img: require('../../assets/images/no_result.png'),
        tip: '暂无数据'
      },
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
      account_type: '',
      trade: account.trade,
      trade_value: 't1',
      pay: [{
        value: 'p1',
        label: '支付状态'
      },
      {
        value: 'p2',
        label: '已支付'
      },
      {
        value: 'p3',
        label: '未支付'
      }],
      pay_value: 'p1',
      apply: [{
        value: 'a1',
        label: '申请状态'
      },
      {
        value: 'a2',
        label: '处理中'
      },
      {
        value: 'a3',
        label: '已完成'
      },
      {
        value: 'a4',
        label: '拒绝'
      }],
      apply_value: 'a1',
      record: account.record,
      record_value: 'r1',
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      time: '',
      json: []
    }
  },
  created () {
    $self = this
    $self.init()
  },
  components: {
    'filiter': filiter,
    'Pages': Pages
  },
  methods: {
    init () {
      for (let i = 0; i < 10; i++) {
        let data = {
          id: i,
          applyId: '755521' + i,
          entry: '100.00',
          Ctime: new Date(),
          pay: '2048.00',
          pay_status: 0,
          apply_status: 0,
          dealTime: new Date()
        }
        if (i % 2 === 0) {
          data.pay_status = 1
        }
        if (i % 3 === 1) {
          data.apply_status = 1
        }
        if (i % 3 === 2) {
          data.apply_status = 2
        }
        $self.json.push(data)
      }
    }
  },
  watch: {
    'value' (val, oldVal) {
      for (let i = 0; i < $self.options.length; i++) {
        if ($self.options[i].value === val) {
          $self.account_type = $self.options[i].label
        }
      }
    },
    'record_value' (val, oldVal) {
      switch (val) {
        case 'r1':
          $self.$router.push('/account/depositrecord')
          break
        case 'r2':
          $self.$router.push('/account/withdrawrecord')
          break
        case 'r3':
          $self.$router.push('/account/transferrecord')
          break
        default:
          $self.$router.push('/account/depositrecord')
          break
      }
    }
  }
}
</script>
<style lang="sass" scoped>
@import "../../assets/sass/account.scss"
</style>
