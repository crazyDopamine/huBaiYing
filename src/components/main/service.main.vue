<template>
  <div class="service-main layout-row">
    <div class="middle">
      <template v-for="(data,index) in business">
        <template v-for="(item,index) in data.children">
          <div class="service-main-title">
            {{item.businessName}}
          </div>
          <Row type="flex" justify="space-between">
            <Col span="7" v-for="(service,index) in item.children" :key="index">
            <router-link :to="'/serviceDetail/'+service.id">
              <div class="service-main-item">
                <!--<img :src="'imgs/service-logo.jpg' | localFile">-->
                <img :src="service.businessImage | img" class="margin-right-10">
                <label>{{service.businessName}}</label><br/>
                <span>{{service.bussinessTitle}}</span>
              </div>
            </router-link>
            </Col>
          </Row>
        </template>
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
