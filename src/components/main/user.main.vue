<template>
  <div class="user-main middle">
    <Tabs class="margin-top-20">
      <TabPane label="我的项目" icon="ios-paper">标签一的内容</TabPane>
      <TabPane label="个人信息" icon="android-person">标签二的内容</TabPane>
    </Tabs>
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
