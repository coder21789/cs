import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/login'
import Register from '@/components/Login/register'
import Forgotpwd from '@/components/Login/forgotpwd'
import Accountoverview from '@/components/accountoverview'
import AHistory from '@/components/account/history'
import Apendingorder from '@/components/account/pendingorder'
import Aposition from '@/components/account/position'
import Adeposit from '@/components/account/deposit'
import Awithdraw from '@/components/account/withdraw'
import Aadjustlever from '@/components/account/adjustlever'
import Achangepwd from '@/components/account/changepwd'
import Atransfer from '@/components/account/transfer'
import Adepositrecord from '@/components/account/depositrecord'
import Awithdrawrecord from '@/components/account/withdrawrecord'
import Atransferrecord from '@/components/account/transferrecord'
import Basicinfo from '@/components/accountinfo/basicinfo'
import Financeinfo from '@/components/accountinfo/financeinfo'
import IDinfo from '@/components/accountinfo/IDinfo'
import Ubasicinfo from '@/components/userinfo/basicinfo'
import Ubankinfo from '@/components/userinfo/bankinfo'
import openaccount from '@/components/openaccount/openaccount'
import applylive from '@/components/openaccount/applylive'
import bindaccount from '@/components/openaccount/bindaccount'
import applydemo from '@/components/openaccount/applydemo'
import accountconfirm from '@/components/openaccount/accountconfirm'
import checkinfo from '@/components/openaccount/checkinfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Accountoverview,
      redirect: '/accountoverview'
    },
    {
      path: '/accountoverview',
      name: 'accountoverview',
      component: Accountoverview
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/forgotpwd',
      name: 'forgotpwd',
      component: Forgotpwd
    },
    {
      path: '/account/history',
      name: 'history',
      component: AHistory
    },
    {
      path: '/account/pendingorder',
      name: 'pendingorder',
      component: Apendingorder
    },
    {
      path: '/account/position',
      name: 'position',
      component: Aposition
    },
    {
      path: '/account/deposit',
      name: 'deposit',
      component: Adeposit
    },
    {
      path: '/account/withdraw',
      name: 'withdraw',
      component: Awithdraw
    },
    {
      path: '/account/adjustlever',
      name: 'adjustlever',
      component: Aadjustlever
    },
    {
      path: '/account/changepwd',
      name: 'changepwd',
      component: Achangepwd
    },
    {
      path: '/account/transfer',
      name: 'transfer',
      component: Atransfer
    },
    {
      path: '/account/depositrecord',
      name: 'depositrecord',
      component: Adepositrecord
    },
    {
      path: '/account/withdrawrecord',
      name: 'withdrawrecord',
      component: Awithdrawrecord
    },
    {
      path: '/account/transferrecord',
      name: 'transferrecord',
      component: Atransferrecord
    },
    {
      path: '/accountinfo/basicinfo',
      name: 'basicinfo',
      component: Basicinfo
    },
    {
      path: '/accountinfo/financeinfo',
      name: 'financeinfo',
      component: Financeinfo
    },
    {
      path: '/accountinfo/IDinfo',
      name: 'IDinfo',
      component: IDinfo
    },
    {
      path: '/userinfo/basicinfo',
      name: 'Ubasicinfo',
      component: Ubasicinfo
    },
    {
      path: '/userinfo/bankinfo',
      name: 'Ubankinfo',
      component: Ubankinfo
    },
    {
      path: '/openaccount',
      name: 'openaccount',
      component: openaccount
    },
    {
      path: '/openaccount/applylive',
      name: 'applylive',
      component: applylive
    },
    {
      path: '/openaccount/bindaccount',
      name: 'bindaccount',
      component: bindaccount
    },
    {
      path: '/openaccount/applydemo',
      name: 'applydemo',
      component: applydemo
    },
    {
      path: '/openaccount/accountconfirm',
      name: 'accountconfirm',
      component: accountconfirm
    },
    {
      path: '/openaccount/checkinfo',
      name: 'checkinfo',
      component: checkinfo
    }
  ],
  scrollBehavior: function (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  mode: 'history'
})
