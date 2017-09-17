<template>
  <div id="app">
    <admin-header @login-out="loginPop=true"></admin-header>
    <div class="main-body">
      <!--<nav-left :path="path"></nav-left>-->
      <Menu class="menu" theme="dark" :open-names="['user','task','data']" :active-name="path">
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
            任务管理
          </template>
          <router-link to="/taskManage">
            <Menu-item name="/taskManage">任务管理</Menu-item>
          </router-link>
        </Submenu>
        <Submenu name="user">
          <template slot="title">
            <Icon type="person"></Icon>
            账号管理
          </template>
          <router-link to="/adminManage">
            <Menu-item name="/adminManage">账号管理</Menu-item>
          </router-link>
        </Submenu>
        <Submenu name="data">
          <template slot="title">
            <Icon type="stats-bars"></Icon>
            数据管理
          </template>
          <router-link to="/cityManage">
            <Menu-item name="/cityManage">城市管理</Menu-item>
          </router-link>
          <router-link to="/industryManage">
            <Menu-item name="/industryManage">行业管理</Menu-item>
          </router-link>
          <router-link to="/skillManage">
            <Menu-item name="/skillManage">技能管理</Menu-item>
          </router-link>
          <router-link to="/businessTypeManage">
            <Menu-item name="/businessTypeManage">业务类型管理</Menu-item>
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
        <h1 class="text-center">搜罗猫运营系统</h1>
        <div class="form-row clearfix">
          <i class="icon-user input-before" style="position:absolute;left:10px;"></i>
          <Input class="col-24" type="text" v-model="loginForm.fieldSet.userName" placeholder="账号"></Input>
        </div>
        <div class="form-row clearfix">
          <i class="icon-key input-before" style="position:absolute;left:10px;"></i>
          <Input class="col-24" type="password" v-model="loginForm.fieldSet.passWord" placeholder="密码"
                 @keyup.enter="login()"></Input>
        </div>
      </div>
      <div slot="footer" class="text-right">
        <Button size="large" type="primary" :loading="modalLoading"
                @click="login()">登陆
        </Button>
      </div>
    </Modal>
  </div>
  </div>
</template>
<script>

  import router from '../../adminRouter'
  import header from './widget/header.vue'

  export default {
  	components:{

    },
    router,
    data: function () {
      return {}
    },
    methods: {},
    created: function () {
    }
  }
</script>
