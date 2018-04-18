<template>
  <div class="filiter_view">
    <ul class="menu clearfix">
      <li>
        <router-link to="/account/history" exact>交易报表</router-link>
      </li>
      <li>
        <router-link to="/account/deposit" exact>在线入金</router-link>
      </li>
      <li>
        <router-link to="/account/withdraw" exact>申请出金</router-link>
      </li>
      <li>
        <router-link to="/account/transfer" exact>转账汇款</router-link>
      </li>
      <li>
        <router-link to="/account/depositrecord" exact>资金流水</router-link>
      </li>
      <li>
        <router-link to="/account/changepwd" exact>修改密码</router-link>
      </li>
      <li>
        <router-link to="/account/adjustlever" exact>调整杠杆</router-link>
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
@import "../../assets/sass/account.scss"
</style>
