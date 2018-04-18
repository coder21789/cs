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
           <li class="time_select clearfix">
             <label>交易时间</label>
             <el-date-picker v-model="time" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions2" id="time_select">
             </el-date-picker>
           </li>
           <li class="Report_type">
             <label>报表类型</label>
             <el-select v-model="trade_value" placeholder="请选择" id="Report_type">
                <el-option v-for="item in trade" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
           </li>
         </ul>
      </div>
      <div class="list">
        <table>
          <thead>
            <tr>
              <td v-bind:style="{width:'120px'}">订单号</td>
              <td v-bind:style="{width:'100px'}">品种</td>
              <td v-bind:style="{width:'80px'}">类型</td>
              <td v-bind:style="{width:'80px'}">交易量</td>
              <td v-bind:style="{width:'100px'}">开/平仓价</td>
              <td v-bind:style="{width:'150px'}">开仓时间</td>
              <td v-bind:style="{width:'150px'}">平仓时间</td>
              <td v-bind:style="{width:'80px'}">止损</td>
              <td v-bind:style="{width:'80px'}">止盈</td>
              <td v-bind:style="{width:'80px'}">佣金</td>
              <td v-bind:style="{width:'80px'}">利息</td>
              <td v-bind:style="{width:'100px'}"><p>盈利</p></td>
            </tr>
          </thead>
          <tbody v-if="json.length > 0">
            <tr v-for="item in json">
              <td v-bind:style="{width:'120px'}">{{item.orderId}}</td>
              <td v-bind:style="{width:'100px'}">{{item.varieties}}</td>
              <td v-bind:style="{width:'80px'}" v-if="item.type==1">
                买入<img src='../../assets/images/left.png'>
              </td>
              <td v-bind:style="{width:'80px'}" v-if="item.type==0">
                卖出<img src='../../assets/images/right.png'>
              </td>
              <td v-bind:style="{width:'80px'}">{{item.volume}}</td>
              <td v-bind:style="{width:'100px'}">
                <p>{{item.O_price}}</p>
                <p>{{item.E_price}}</p>
              </td>
              <td v-bind:style="{width:'150px'}">{{item.O_time | time}}</td>
              <td v-bind:style="{width:'150px'}">{{item.E_time | time}}</td>
              <td v-bind:style="{width:'80px'}">{{item.stop}}</td>
              <td v-bind:style="{width:'80px'}">{{item.profit}}</td>
              <td v-bind:style="{width:'80px'}">{{item.commission}}</td>
              <td v-bind:style="{width:'80px'}">{{item.interest}}</td>
              <td v-bind:style="{width:'100px'}" v-if="Number(item.yprofit)>0" class="profit">
                <p>{{item.yprofit}}</p>
              </td>
              <td v-bind:style="{width:'100px'}" v-if="Number(item.yprofit)<=0">
                <p>{{item.yprofit}}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="total clearfix" v-if="json.length > 0">
          <p v-bind:style="{width:'300px'}">合计</p>
          <p v-bind:style="{width:'660px'}">200.00</p>
          <p v-bind:style="{width:'80px'}">0.00</p>
          <p v-bind:style="{width:'80px'}">2.10</p>
          <p v-bind:style="{width:'80px'}">40.00</p>
        </div>
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
      trade_value: 't3',
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
  name: 'history',
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
          orderId: '755521' + i,
          varieties: 'USDEUR' + i,
          type: 1,
          volume: '200.00',
          O_price: '1.52302',
          E_price: '1.52302',
          O_time: new Date(),
          E_time: new Date(),
          stop: '1.52302',
          profit: '0.12345',
          commission: '0.00',
          interest: '2.10',
          yprofit: '60.00'
        }
        if (i % 2 === 0) {
          data.type = 0
          data.yprofit = '+' + data.yprofit
        } else {
          data.yprofit = '-' + data.yprofit
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
    'trade_value' (val, oldVal) {
      switch (val) {
        case 't1':
          $self.$router.push('/account/history')
          break
        case 't2':
          $self.$router.push('/account/pendingorder')
          break
        case 't3':
          $self.$router.push('/account/position')
          break
        default:
          $self.$router.push('/account/history')
          break
      }
    }
  }
}
</script>
<style lang="sass" scoped>
@import "../../assets/sass/account.scss"
</style>
