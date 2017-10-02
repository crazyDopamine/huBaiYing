<template>
  <div class="layout-row">
    <div class="title-bar middle">
      <label>
        <Icon class="margin-right-10" type="ios-navigate"></Icon>
        热门服务</label>
      <!--<a class="title-detail float-right margin-left-10">商标注册</a>-->
      <!--<a class="title-detail float-right margin-left-10">商标注册</a>-->
      <!--<a class="title-detail float-right margin-left-10">商标注册</a>-->
    </div>
    <div class="middle">
      <Row>
        <Col span="8">
        <Card class="hot-service">
          <p slot="title">
            快速开公司
          </p>
          <div>注册</div>
          <ul class="hot-service-item">
            <li><a>商标注册</a></li>
            <li><a>商标注册</a></li>
            <li><a>商标注册</a></li>
            <li><a>商标注册</a></li>
            <li><a>商标注册</a></li>
            <li><a>商标注册</a></li>
            <li><a>商标注册</a></li>
          </ul>
        </Card>
        </Col>
      </Row>
    </div>
    <div class="title-bar middle text-center" style="line-height:30px;padding:20px 0;">
      从呼百应挑选你的专职顾问<br>
      20年的企业经验累积，为您企业发展提供全方位保驾护航
    </div>
    <!--<Tabs class="middle main-adviser-tabs">-->
      <!--<TabPane label="分类1" name="name1">-->
        <div class="main-adviser-area">
          <Row class="main-adviser-list">
            <router-link to="/adviserDetail/1">
              <Col span="6">
              <img :src="'imgs/avatar-test.jpeg' | localFile"><br>
              <label>董威</label><br>
              <span>专注撸代码</span>
              </Col>
            </router-link>
            <router-link to="/adviserDetail/1">
              <Col span="6">
              <img :src="'imgs/avatar-test.jpeg' | localFile"><br>
              <label>董威</label><br>
              <span>专注撸代码</span>
              </Col>
            </router-link>
            <router-link to="/adviserDetail/1">
              <Col span="6">
              <img :src="'imgs/avatar-test.jpeg' | localFile"><br>
              <label>董威</label><br>
              <span>专注撸代码</span>
              </Col>
            </router-link>
            <router-link to="/adviserDetail/1">
              <Col span="6">
              <img :src="'imgs/avatar-test.jpeg' | localFile"><br>
              <label>董威</label><br>
              <span>专注撸代码</span>
              </Col>
            </router-link>
          </Row>
        </div>
      <!--</TabPane>-->
    <!--</Tabs>-->
  </div>
</template>
<script type="es6">
  export default {
    data: function () {
      return {
        hotBusiness: []
      }
    },
    methods: {
      refresh: function () {
        this.$http.get(this.url('business/getHotBusiness')).then(this.rspHandler((data)=> {
          this.hotBusiness = data
        }))
      }
    },
    created: function () {
      window.vm.$refs.header.showBanners = true;
      this.refresh()
    }
  }
</script>
