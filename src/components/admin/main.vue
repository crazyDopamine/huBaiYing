<template>
  <div id="app">
    <admin-header @login-out="loginPop=true"></admin-header>
    <div class="main-body">
      <!--<nav-left :path="path"></nav-left>-->
      <Menu class="menu" theme="dark" :open-names="['user','task','data']" :active-name="path" width="180px">
        <Submenu name="user">
          <template slot="title">
            <Icon type="ios-people"></Icon>
            用户管理
          </template>
          <router-link to="/userManage">
            <Menu-item name="/userManage">用户管理</Menu-item>
          </router-link>
        </Submenu>
        <Submenu name="task">
          <template slot="title">
            <Icon type="ios-paper"></Icon>
            项目管理
          </template>
          <router-link to="/projectManage">
            <Menu-item name="/projectManage">项目管理</Menu-item>
          </router-link>
        </Submenu>
        <Submenu name="user" v-if="userInfo.role == 'admin'">
          <template slot="title">
            <Icon type="person"></Icon>
            顾问管理
          </template>
          <router-link to="/adviserManage">
            <Menu-item name="/adviserManage">顾问管理</Menu-item>
          </router-link>
        </Submenu>
        <Submenu name="user">
          <template slot="title">
            <Icon type="ios-help-outline"></Icon>
            提问管理
          </template>
          <router-link to="/problemManage">
            <Menu-item name="/problemManage">提问管理</Menu-item>
          </router-link>
        </Submenu>
        <Submenu name="user" v-if="userInfo.role == 'admin'">
          <template slot="title">
            <Icon type="ios-paperplane-outline"></Icon>
            服务管理
          </template>
          <router-link to="/serviceManage">
            <Menu-item name="/serviceManage">服务管理</Menu-item>
          </router-link>
        </Submenu>
        <Submenu name="data" v-if="userInfo.role == 'admin'">
          <template slot="title">
            <Icon type="stats-bars"></Icon>
            数据管理
          </template>
          <router-link to="/cityManage">
            <Menu-item name="/cityManage">城市管理</Menu-item>
          </router-link>
          <router-link to="/dictionaryManage">
            <Menu-item name="/dictionaryManage">数据字典</Menu-item>
          </router-link>
        </Submenu>
      </Menu>
      <div class="main-container">
        <router-view></router-view>
      </div>
    </div>
    <Modal class="login-modal" v-model="loginPop" title="登录" width="360" :closable="false" :mask-closable="false">
      <div class="form-area">
        <h1 class="text-center">呼百应运营系统</h1>
        <Form ref="loginForm" :model="loginForm" :rules="rule">
          <FormItem prop="phone">
            <Input type="text" v-model="loginForm.phone" placeholder="手机号" size="large">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="loginForm.password" placeholder="密码" size="large">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="text-right">
        <Button size="large" type="primary" :loading="modalLoading"
                @click="login()">登陆
        </Button>
      </div>
    </Modal>
  </div>
</template>
<script type="es6">

  import router from '../../adminRouter'
  import {cookie} from 'vux'
  import header from './widget/header.widget.vue'

  let config = {
    router,
    components: {
      'admin-header': header
    },
    data: function () {
      return {
        path: '',
        loginPop: false,
        modalLoading: false,
        loginForm: {
          phone: '11111111111',
          password: '123456',
          type: 'account'
        },
        rule: {
          phone: {required: true, message: '请填写手机号', trigger: 'blur'},
          password: {required: true, message: '请填写密码', trigger: 'blur'}
        },
      }
    },
    methods: {
      login: function () {
        this.$refs.loginForm.validate((valid) => {
          this.modalLoading = true
          if (valid) {
            var params = this.loginForm
            this.$http.post('admin/login', params).then((rsp)=> {
              this.$Message.success('登陆成功！')
              if (rsp.data) {
                cookie.set(this.consts.adminTicketKey, rsp.data.token)
              }
              this.getUserInfo()
              this.modalLoading = false
              this.loginPop = false
            }, ()=> {
              this.modalLoading = false
            })
          }
        });
      },
      getUserInfo: function () {
        this.$http.get('admin/getConsInfoByToken').then((rsp) => {
          window.vm.userInfo = rsp.data
          window.vm.userInfoLoaded = 1
          window.vm.$emit(this.consts.loadedEvent, rsp.data, this.consts.loadedStatus)
        }, () => {
          window.vm.userInfo = {}
          window.vm.userInfoLoaded = 2
          window.vm.$emit(this.consts.loadedFailEvent)
          window.vm.$emit(this.consts.loginOutEvent)
        })
      }
    },
    created: function () {
      window.vm = this
      this.$on(this.consts.loginOutEvent, function () {
        this.loginPop = true
        this.modalLoading = false
      })
      this.path = this.$route.path
      this.$router.afterEach((to, from) => {
        this.path = to.path
      })
      this.getUserInfo()
    }
  }
  export default config
</script>
