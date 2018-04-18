<template>
  <div class="filiter_view">
    <ul class="menu clearfix">
      <li>
        <router-link to="/userinfo/basicinfo" exact>基本资料</router-link>
      </li>
      <li>
        <router-link to="/userinfo/bankinfo" exact>银行信息</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'filiter'
}
</script>
<style lang="sass" scoped>
@import "../../assets/sass/userinfo.scss"
</style>
