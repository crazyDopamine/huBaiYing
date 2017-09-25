<template>
  <div class="middle page">
    <Breadcrumb>
      <BreadcrumbItem href="/main">首页</BreadcrumbItem>
      <BreadcrumbItem href="/serviceMain">服务</BreadcrumbItem>
      <BreadcrumbItem>服务详情</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
<script>
  export default {

  }
</script>

</div>
</template>
<script>
  export default {
    data: function () {
      return {}
    },
    methods: {},
    created: function () {
      window.vm.$refs.header.showBanners = false;
    }
  }
</script>
