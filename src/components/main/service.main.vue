<template>
  <div class="service-main layout-row">
    <div class="middle">
      <template v-for="(data,index) in business">
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
        </Row>
      </template>
    </div>
  </div>
</template>
<script type="es6">
  export default {
    data: function () {
      return {
        business: []
      }
    },
    methods: {
      refresh: function () {
        this.getSelections('business').then((data)=>{
          this.business = data
        })
      },
    },
    created: function () {
      window.vm.$refs.header.showBanners = true;
      this.refresh()
    }
  }
</script>
