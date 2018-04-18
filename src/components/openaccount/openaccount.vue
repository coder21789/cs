<template>
  <div class="openaccount_view">
    <div class="content">
      <section v-for="item in platform">
        <p class="tli">{{item.platform}}</p>
        <div class="item clearfix">
          <img class="P_logo pull-left" src="../../assets/images/plogo.png">
          <ul class="btn_groups pull-right claerfix">
            <li>
              <router-link to="/openaccount/applylive" class="status btn" v-if="item.status == 0">
                <i class="iconfont icon-headlines"></i>
                开通真实账户
              </router-link>
              <router-link to="/openaccount/checkinfo" class="status btn" v-if="item.status == 1">
                <i class="iconfont icon-time1"></i>
                审核中
              </router-link>
              <router-link to="/openaccount/applylive" class="status btn" v-if="item.status == 2">
                <i class="iconfont icon-p"></i>
                同名账户
              </router-link>
            </li>
            <li>
              <router-link to="/openaccount/applydemo" class="btn">
                <i class="iconfont icon-dynamic"></i>
                开通模拟账户
              </router-link>
            </li>
            <li>
              <router-link to="/openaccount/bindaccount" class="btn">
                <i class="iconfont icon-xnmm"></i>
                绑定账户
              </router-link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
let $self = ''
export default {
  name: 'openaccount',
  data () {
    return {
      platform: []
    }
  },
  created () {
    $self = this
    for (let i = 0; i < 5; i++) {
      let data = {
        id: i,
        platform: 'MT' + (i + 4),
        status: 0
      }
      if (i % 3 === 1) {
        data.status = 1
      }
      if (i % 3 === 2) {
        data.status = 2
      }
      $self.platform.push(data)
    }
  }
}
</script>
<style lang="sass" scoped>
@import '../../assets/sass/openaccount.scss'
</style>
