<template>
  <div class="accountconfirm_view">
    <div class="main_content">
      <div class="baseinfo clearfix">
        <label class="bar"></label>
        <div class="type pull-left">
          <i class="iconfont icon-headlines"></i>
          <p>基本资料</p>
        </div>
        <div class="info">
          <ul class="infolist clearfix">
            <li class="clearfix">
              <label>姓名</label>
              <p>{{baseinfo.name}}</p>
            </li>
            <li class="clearfix">
              <label>手机</label>
              <p>{{baseinfo.mobile}}</p>
            </li>
            <li class="clearfix">
              <label>邮箱</label>
              <p>{{baseinfo.email}}</p>
            </li>
            <li class="clearfix">
              <label>出生地</label>
              <p>{{baseinfo.birth}}</p>
            </li>
            <li class="clearfix">
              <label>社交通讯</label>
              <p>{{baseinfo.connect}}</p>
            </li>
            <li class="clearfix">
              <label>备注</label>
              <p>{{baseinfo.notice}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="baseinfo financeinfo clearfix">
        <label class="bar"></label>
        <div class="type pull-left">
          <i class="iconfont icon-dynamic"></i>
          <p>财务资料</p>
        </div>
        <div class="info">
          <ul class="infolist clearfix">
            <li class="clearfix">
              <label>投资经验</label>
              <p>{{finance.express}}</p>
            </li>
            <li class="clearfix">
              <label>投资目的</label>
              <p>{{finance.express1}}</p>
            </li>
            <li class="clearfix">
              <label>投资年数</label>
              <p>{{finance.years}}</p>
            </li>
            <li class="clearfix">
              <label>出生地</label>
              <p>{{finance.birth}}</p>
            </li>
            <li class="clearfix">
              <label>开户银行</label>
              <p>{{finance.bank}}</p>
            </li>
            <li class="clearfix">
              <label>银行所在地</label>
              <p>{{finance.address}}</p>
            </li>
            <li class="clearfix">
              <label>备注</label>
              <p>{{finance.notice}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="baseinfo Certificates clearfix">
        <label class="bar"></label>
        <div class="type pull-left">
          <i class="iconfont icon-credentials_icon"></i>
          <p>身份证明</p>
        </div>
        <div class="info">
          <ul class="infolist clearfix">
            <li class="clearfix">
              <label>身份怎么类型</label>
              <p>{{Certificates.type}}</p>
            </li>
            <li class="clearfix">
              <label>身份证明号码</label>
              <p>{{Certificates.number}}</p>
            </li>
            <li class="clearfix">
              <label>身份证明A</label>
              <div class="preview idcard"></div>
            </li>
            <li class="clearfix">
              <label>身份证明B</label>
              <div class="preview idcard"></div>
            </li>
            <li class="clearfix">
              <label>居住证明A</label>
              <div class="preview address"></div>
            </li>
            <li class="clearfix">
              <label>居住证明B</label>
              <div class="preview address"></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="operates clearfix">
        <div class="agree pull-left">
          <el-checkbox v-model="checked">备选项</el-checkbox>
          我已阅读并理解被提供的信息，包括<span>用户协议及风险披露声明</span>，并愿意继续开户申请
        </div>
        <ul class="btns pull-right clearfix">
          <li>
            <a class="cancel" @click="back()">返回</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'checkinfo',
  data () {
    return {
      baseinfo: {
        name: '二狗',
        mobile: '13312344321',
        email: '2133132@qq.com',
        birth: '中国 浙江 杭州',
        connect: '7986050',
        notice: ''
      },
      finance: {
        express: '股票 外汇 基金',
        express1: '为了生存',
        years: '3',
        birth: '中国 浙江 杭州',
        bank: '中国农业银行',
        address: '中国 浙江 杭州',
        notice: ''
      },
      Certificates: {
        type: '身份证',
        number: '33102322219707723'
      },
      checked: true
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="sass" scoped>
@import '../../assets/sass/openaccount.scss'
</style>
