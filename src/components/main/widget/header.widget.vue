<template>
  <header class="hby-header layout-row">
    <div class="header-top-bar">
      <div class="middle text-right">
        <span v-if="userInfoLoaded==1">欢迎登陆呼百应</span>
        <router-link to="/userMain" class="padding-left-10 margin-right-10" v-if="userInfoLoaded==1">用户中心</router-link>
        <a class="margin-right-10" @click="showLogin()" v-if="userInfoLoaded==0">登录</a>
        <router-link to="/register" class="border-left padding-left-10 margin-right-10" v-if="userInfoLoaded==0">注册</router-link>
        <a v-if="userInfoLoaded==1" @click="loginOut()">登出</a>
        <Icon class="fc-theme margin-left-10" type="ios-telephone" size="16"></Icon>
        <span class="fc-theme">400-659-9818</span>
      </div>
    </div>
    <div class="header-search middle">
      <router-link to="/main">
        <img class="float-left margin-left-10" :src="'imgs/logo.jpg' | localFile" style="height:100%;">
      </router-link>
      <!--<Input class="header-search-input" v-model="search" icon="search" placeholder="搜索问题" @on-enter="searchProblem()" @on-click="searchProblem()"></Input>-->
      <router-link to="/projectForm">
        <Button class="float-right margin-top-20 btn btn-theme" size="large" icon="plus-round">发布需求</Button>
      </router-link>
    </div>
    <div class="header-menu">
      <div class="middle header-menu-list">
        <Dropdown class="menu-item menu-drop-down-1" trigger="click">
          <span>
            企业服务导航
            <Icon type="arrow-down-b"></Icon>
          </span>
          <DropdownMenu slot="list">
            <ul>
              <li class="ivu-dropdown-item" v-for="(data,index) in selections.business" :key="index">
                <Dropdown class="menu-drop-down-2" trigger="click" placement="right">
                  {{data.businessName}}
                  <DropdownMenu slot="list" v-if="data.children">
                    <ul>
                      <li v-for="(item,index) in data.children" :key="index">
                        <Dropdown class="menu-drop-down-3 ivu-dropdown-item" trigger="click" placement="right-start">
                          {{item.businessName}}
                          <DropdownMenu slot="list" v-if="item.children">
                            <DropdownItem v-for="(service,index) in item.children" :key="index">
                              <router-link :to="'/serviceDetail/'+service.id">{{service.businessName}}</router-link>
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </li>
                    </ul>
                  </DropdownMenu>
                </Dropdown>
              </li>
            </ul>
          </DropdownMenu>
        </Dropdown>
        <!--<router-link class="menu-item float-right" to="/adviserMain">呼案例</router-link>-->
        <router-link class="menu-item float-right" to="/adviserMain">呼顾问</router-link>
        <router-link class="menu-item float-right" to="/problemMain">呼问题</router-link>
        <router-link class="menu-item float-right" to="/serviceMain">呼服务</router-link>
        <router-link class="menu-item float-right" to="/main">呼首页</router-link>
        <!--<span class="menu-item" to="main">成功案</span>-->
        <!--<span class="menu-item" to="main">呼新闻</span>-->
        <!--<span class="menu-item" to="main">百城应</span>-->
      </div>
    </div>
    <div class="header-banner middle" v-show="showBanners">
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
    <Modal class="login-modal" v-model="loginPop" width="360" :closable="true" :mask-closable="false">
      <div class="form-area">
        <h1 class="text-center margin-bottom-20">呼百应企业服务平台</h1>
        <!--<Tabs class="margin-top-20">-->
          <!--<TabPane label="账号密码">-->
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
          <!--</TabPane>-->
          <!--<TabPane label="手机快速登录">-->
            <!--<Form ref="loginForm" :model="loginForm" :rules="rule">-->
              <!--<FormItem prop="user">-->
                <!--<Input type="text" v-model="loginForm.username" placeholder="手机号" size="large">-->
                <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
                <!--</Input>-->
              <!--</FormItem>-->
              <!--<FormItem prop="password">-->
                <!--<Input type="password" v-model="loginForm.password" placeholder="密码" size="large">-->
                <!--<Icon type="ios-locked-outline" slot="prepend"></Icon>-->
                <!--</Input>-->
              <!--</FormItem>-->
            <!--</Form>-->
          <!--</TabPane>-->
        <!--</Tabs>-->
      </div>
      <div slot="footer" class="text-right">
        <Button class="btn-theme" type="primary" :loading="modalLoading" @click="login()" long>登陆</Button>
      </div>
    </Modal>
  </header>
</template>
<script type="es6">
  import {loadedMixins} from '../../../common/mixins'
  import {cookie} from 'vux'
  let config = {
    mixins: [loadedMixins],
    data: function () {
      return {
        showBanners: true,
        search: '',
        path: '',
        loginPop: false,
        modalLoading: false,
        menu: [
          {name: '注册', children: [{name: '工商注册', children: [{name: '注册注册'}]}]}
        ],
        currentMenu: false,
        loginForm: {
          phone: '',
          password: '',
          type:'account'
        },
        rule: {
          phone: [
            {required: true, message: '请填写手机号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ]
        },
        selections:{
          business:[]
        }
      }
    },
    methods: {
      refresh:function(){
      	this.getSelections('business').then((data)=>{
          this.selections.business = data
        })
      },
      showLogin: function () {
        this.modalLoading = false
        this.loginPop = true
      },
      login: function () {
        this.$refs.loginForm.validate((valid) => {
          this.modalLoading = true
          if (valid) {
            var params = this.loginForm
            this.$http.post('user/login',params).then((rsp)=>{
              this.$Message.success('登陆成功！')
              if(rsp.data){
                cookie.set(this.consts.ticketKey,rsp.data.token)
              }
              window.vm.getUserInfo()
              this.modalLoading = false
              this.loginPop = false
            },()=>{
              this.modalLoading = false
            })
          }
        });
      },
      loginOut:function(){
        cookie.set(this.consts.ticketKey,'')
        window.vm.userInfo={}
        window.vm.userInfoLoaded=0
        window.vm.$emit(this.consts.loadedFailEvent)
      },
      searchProblem:function(){
        if(this.search){
          this.$router.push('/problemMain/'+this.search)
        }
      }
    },
    created: function () {
      this.$watch('loginPop', function (isShow) {
        if (isShow) {
          this.resetObject(this.loginForm)
          this.loginForm.type = 'account'
          this.$refs.loginForm.resetFields()
        }
      })
      this.refresh()
    }
  }

  export default config
</script>
