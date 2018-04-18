<template>
  <div class="top_view clearfix">
    <div class="main">
      <router-link to="/" class="logo pull-left">Spire Trader</router-link>
      <ul class="navbar pull-right clearfix">
        <li v-for="item in routes">
          <router-link v-bind:to="item.link" v-bind:class="{active: item.link.split('/')[1] === data}" class="item" exact>{{item.name}}</router-link>
        </li>
        <li>
          <a to="/" class="user">{{username}}</a>
        </li>
        <li class="exit">
          <a @click="exit()">
            <i class="iconfont icon-tuichu"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {loginHandle, errorRequestHandle} from '../../assets/js/tool'
export default {
  name: 'topbar',
  props: {
    data: {
      type: String
    }
  },
  data () {
    return {
      username: '',
      routes: [
        {
          name: '账户总览',
          link: '/accountoverview'
        },
        {
          name: '账户管理',
          link: '/account/history'
        },
        {
          name: '开户申请',
          link: '/openaccount'
        },
        {
          name: '账户资料',
          link: '/accountinfo/basicinfo'
        },
        {
          name: '用户资料',
          link: '/userinfo/basicinfo'
        }
      ]
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$http.get('/customer-point/customer/login-data',
        {
          headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
          },
          emulateJSON: true
        }).then(loginHandle).then((res) => {
          if (res.body.result === null) {
            this.$router.push('/login')
          } else {
            this.username = res.body.result.realname
            localStorage.setItem('customerId', res.body.result.id)
          }
        }).catch(errorRequestHandle)
    },
    exit () {
      this.$http.get('/customer-point/customer/logout',
        {
          headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
          },
          emulateJSON: true
        }).then((res) => {
          if (res.body.code === 10000) {
            this.$router.push('/login')
          }
        }).catch(errorRequestHandle)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/sass/top.scss'
</style>
