<template>
  <header>
    <div class="header">
      <img class="float-left" :src="'imgs/logo.jpg' | localFile" style="height:100%;">
      <a class="float-right margin-top-15" @click="loginOut()" ><Icon type="log-out margin-right-10"></Icon>退出</a>
      <span class="float-right margin-top-15 margin-right-20">欢迎呼百应运营系统</span>
      <Dropdown class="float-right margin-top-15 margin-right-20">
        <a href="javascript:void(0)">
          个人中心
          <Icon type="arrow-down-b"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem><router-link to="/editMyInfo">完善个人信息</router-link></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </header>
</template>
<script>
  import {cookie} from 'vux'
  export default {
    data: function () {
      return {}
    },
    methods: {
      loginOut: function () {
        cookie.remove(this.consts.adminTicketKey)
        this.$parent.$emit(this.consts.loginOutEvent)
      }
    },
    created: function () {
    }
  }
</script>
