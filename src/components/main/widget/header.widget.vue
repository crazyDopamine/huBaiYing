<template>
  <header class="hby-header layout-row">
    <div class="header-top-bar">
      <div class="middle text-right">
        <a @click="showLogin()">登录</a>
        <a @click="showRegister()">注册</a>
        <a>登出</a>
      </div>
    </div>
    <div class="header-search middle">
      <Input class="header-search-input" v-model="search" icon="search" placeholder="请输入..."></Input>
      <Button class="float-right margin-top-20" size="large" type="primary" icon="plus-round">发布需求</Button>
    </div>
    <div class="header-menu">
      <Menu class="middle" mode="horizontal" theme="dark" active-name="1">
        <Submenu name="1">
          <template slot="title">
            <Icon type="stats-bars"></Icon>
            导航
          </template>
          <MenuGroup title="使用">
            <MenuItem name="3-1">新增和启动</MenuItem>
            <MenuItem name="3-2">活跃分析</MenuItem>
            <MenuItem name="3-3">时段分析</MenuItem>
          </MenuGroup>
          <MenuGroup title="留存">
            <MenuItem name="3-4">用户留存</MenuItem>
            <MenuItem name="3-5">流失用户</MenuItem>
          </MenuGroup>
        </Submenu>
        <MenuItem name="2">
          <Icon type="ios-paper"></Icon>
          内容管理
        </MenuItem>
        <MenuItem name="3">
          <Icon type="ios-people"></Icon>
          用户管理
        </MenuItem>
        <MenuItem name="4">
          <Icon type="settings"></Icon>
          综合设置
        </MenuItem>
      </Menu>
    </div>
    <div class="header-banner middle">
      <Carousel autoplay>
        <CarouselItem>
          <img :src="'imgs/banner-1.jpg' | localFile">
        </CarouselItem>
        <CarouselItem>
          <img :src="'imgs/banner-2.jpg' | localFile">
        </CarouselItem>
        <CarouselItem>
          <img :src="'imgs/banner-3.jpg' | localFile">
        </CarouselItem>
      </Carousel>
    </div>
    <Modal class="login-modal" v-model="loginPop" title="登录" width="360" :closable="true" :mask-closable="false">
      <div class="form-area">
        <h1 class="text-center">用户登录</h1>
        <div class="form-row clearfix">
          <i class="icon-user input-before" style="position:absolute;left:10px;"></i>
          <Input type="text" v-model="loginForm.fieldSet.username" placeholder="账号"></Input>
        </div>
        <div class="form-row clearfix">
          <i class="icon-key input-before" style="position:absolute;left:10px;"></i>
          <Input type="password" v-model="loginForm.fieldSet.password" placeholder="密码"
                 @keyup.enter="login()">
          </Input>
        </div>
      </div>
      <div slot="footer" class="text-right">
        <Button size="large" type="primary" :loading="modalLoading"
                @click="login()">登陆
        </Button>
      </div>
    </Modal>
    <Modal class="login-modal" v-model="registerPop" title="登录" width="360" :closable="true" :mask-closable="false">
      <div class="form-area">
        <h1 class="text-center">用户注册</h1>
        <div class="form-row clearfix">
          <i class="icon-user input-before" style="position:absolute;left:10px;"></i>
          <Input type="text" v-model="registerForm.fieldSet.username" placeholder="账号"></Input>
        </div>
        <div class="form-row clearfix">
          <i class="icon-key input-before" style="position:absolute;left:10px;"></i>
          <Input type="password" v-model="registerForm.fieldSet.password" placeholder="密码"
                 @keyup.enter="register()">
          </Input>
        </div>
      </div>
      <div slot="footer" class="text-right">
        <Button size="large" type="primary" :loading="modalLoading"
                @click="register()">注册
        </Button>
      </div>
    </Modal>
  </header>
</template>
<script type="es6">
  import formValidate from '../../../common/formValidate'
  import {cookie} from 'vux'
  let config = {
    mixins: [formValidate],
    data: function () {
      return {
        search: '',
        path: '',
        loginPop: false,
        modalLoading: false,
        loginForm: {
          fieldSet: {
            username: '',
            password: ''
          },
          rule: {
            username: {
              label: '账号',
              required: true
            },
            passWord: {
              label: '密码',
              required: true
            }
          }
        },
        registerPop:false,
        registerForm:{
          fieldSet:{
            username:'',
            password:''
          },
          rule: {
            username: {
              label: '账号',
              required: true
            },
            password: {
              label: '密码',
              required: true
            }
          }
        }
      }
    },
    methods: {
      showLogin: function () {
        this.reset(this.loginForm)
        this.modalLoading = false
        this.loginPop = true
      },
      login: function () {
        this.modalLoading = true
        if (this.validate(true, this.loginForm)) {
//          var params = this.getValues(this.loginForm)
//          this.modalLoading = true
//          this.$http.post(this.url('login'), params).then(this.rspHandler((data) => {
//              var token = data.token
//              cookie.set(this.consts.ticketKey, token)
//          this.loginPop = false
//          this.modalLoading = false
//          this.getUserInfo()
//         }), () => {
//             this.modalLoading = false
//           })
        }
      },
      showRegister: function () {
        this.reset(this.registerForm)
        this.modalLoading = false
        this.registerPop = true
      },
      register: function () {
        this.modalLoading = true
        if (this.validate(true, this.registerForm)) {
//          var params = this.getValues(this.loginForm)
//          this.modalLoading = true
//          this.$http.post(this.url('login'), params).then(this.rspHandler((data) => {
//              var token = data.token
//              cookie.set(this.consts.ticketKey, token)
//          this.loginPop = false
//          this.modalLoading = false
//          this.getUserInfo()
//         }), () => {
//             this.modalLoading = false
//           })
        }
      }
//      getUserInfo: function () {
//        this.$http.get(this.url('admin/getUserInfo')).then(this.rspHandler((data) => {
//          window.vm.userInfo = data
//        window.vm.userInfoLoaded = 1
//        window.vm.$emit(this.consts.loadedEvent, data, this.consts.loadedStatus)
//      }),(data) => {
//          window.vm.userInfo = {}
//          window.vm.userInfoLoaded = 2
//          window.vm.$emit(this.consts.loadedFailEvent)
//          this.loginPop = true
//        })
//      }
    },
    created: function () {

    }
  }

  export default config
</script>
