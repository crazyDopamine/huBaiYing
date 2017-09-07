<template>
  <div id="app">
    <hby-header></hby-header>
    <router-view></router-view>
    <hby-footer></hby-footer>
  </div>
</template>
<script>
  import router from '../../mainRouter'
  import widgetHeader from '../../components/main/widget/header.widget.vue'
  import widgetFooter from '../../components/main/widget/footer.widget.vue'
  export default {
    components:{
      'hby-header':widgetHeader,
      'hby-footer':widgetFooter
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
