<template>
  <div class="page">
    <div class="middle">
      <Breadcrumb>
        <BreadcrumbItem href="/main">首页</BreadcrumbItem>
        <BreadcrumbItem href="/serviceMain">服务</BreadcrumbItem>
        <BreadcrumbItem>服务详情</BreadcrumbItem>
      </Breadcrumb>
      <div></div>
    </div>
  </div>
</template>
<script type="es6">
  export default {
    data: function () {
      return {
        detail: {}
      }
    },
    methods: {
      refresh: function () {
        if(this.$route.params.id){
          this.$http.get('business/getDetailById',{params:{id:this.$route.params.id}}).then((rsp)=> {
            this.detail = rsp.data
          })
        }
      }
    },
    created: function () {
      window.vm.$refs.header.showBanners = false;
      this.refresh()
    }
  }
</script>
