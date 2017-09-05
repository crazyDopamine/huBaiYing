<template>
  <div id="app">
    <hby-header></hby-header>
    <router-view></router-view>
  </div>
</template>
<script>
  import router from '../../mainRouter'
  export default {
    router,
    data: function () {
      return {}
    },
    methods: {},
    created: function () {
    }
  }
</script>
