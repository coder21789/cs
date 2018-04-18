<template>
  <div class="accountInfo_view">
    <div class="filiter_view">
      <ul class="menu clearfix">
        <li>
          <router-link to="/accountinfo/basicinfo" exact>账户基本资料</router-link>
        </li>
        <li>
          <router-link to="/accountinfo/financeinfo" exact>账户财务资料</router-link>
        </li>
        <li>
          <router-link to="/accountinfo/IDinfo" exact>账户证件资料</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'filiter'
}
</script>
<style lang="sass" scoped>
@import "../../assets/sass/accountinfo.scss"
</style>
