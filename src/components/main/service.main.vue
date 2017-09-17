<template>
  <div class="service-main layout-row">
    <div class="middle">
      <div class="service-main-title">
        分类1-1
      </div>
      <Row type="flex" justify="space-between">
        <Col span="7">
        <router-link to="/serviceDetail/1">
          <div class="service-main-item">
            <img :src="'imgs/service-logo.jpg' | localFile">
            <label>代理记账</label><br/>
            <span>花小钱，享私人服务</span>
          </div>
        </router-link>
        </Col>
        <Col span="7">
        <router-link to="/serviceDetail/1">
          <div class="service-main-item">
            <img :src="'imgs/service-logo.jpg' | localFile">
            <label>代理记账</label><br/>
            <span>花小钱，享私人服务</span>
          </div>
        </router-link>
        </Col>
        <Col span="7">
        <router-link to="/serviceDetail/1">
          <div class="service-main-item">
            <img :src="'imgs/service-logo.jpg' | localFile">
            <label>代理记账</label><br/>
            <span>花小钱，享私人服务</span>
          </div>
        </router-link>
        </Col>
        <Col span="7">
        <router-link to="/serviceDetail/1">
          <div class="service-main-item">
            <img :src="'imgs/service-logo.jpg' | localFile">
            <label>代理记账</label><br/>
            <span>花小钱，享私人服务</span>
          </div>
        </router-link>
        </Col>
      </Row>
      <div class="service-main-title">
        分类1-2
      </div>
      <Row type="flex" justify="space-between">
        <Col span="7">
        <router-link to="/serviceDetail/1">
          <div class="service-main-item">
            <img :src="'imgs/service-logo.jpg' | localFile">
            <label>代理记账</label><br/>
            <span>花小钱，享私人服务</span>
          </div>
        </router-link>
        </Col>
        <Col span="7">
        <router-link to="/serviceDetail/1">
          <div class="service-main-item">
            <img :src="'imgs/service-logo.jpg' | localFile">
            <label>代理记账</label><br/>
            <span>花小钱，享私人服务</span>
          </div>
        </router-link>
        </Col>
        <Col span="7">
        <router-link to="/serviceDetail/1">
          <div class="service-main-item">
            <img :src="'imgs/service-logo.jpg' | localFile">
            <label>代理记账</label><br/>
            <span>花小钱，享私人服务</span>
          </div>
        </router-link>
        </Col>
        <Col span="7">
        <router-link to="/serviceDetail/1">
          <div class="service-main-item">
            <img :src="'imgs/service-logo.jpg' | localFile">
            <label>代理记账</label><br/>
            <span>花小钱，享私人服务</span>
          </div>
        </router-link>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {}
    },
    methods: {},
    created: function () {
      window.vm.$refs.header.showBanners = true;
    }
  }
</script>
