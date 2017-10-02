<template>
  <div id="app">
    <hby-header ref="header"></hby-header>
    <router-view></router-view>
    <hby-footer></hby-footer>
  </div>
</template>
<script type="es6">
  import router from '../../mainRouter'
  import widgetHeader from '../../components/main/widget/header.widget.vue'
  import widgetFooter from '../../components/main/widget/footer.widget.vue'
  import {loadedMixins} from '../../common/mixins'
  export default {
    mixins:[loadedMixins],
    components:{
      'hby-header':widgetHeader,
      'hby-footer':widgetFooter
    },
    router,
    data: function () {
      return {
      }
    },
    methods: {
      getUserInfo: function () {
        this.$http.get(this.url('techMaster/queryMasterDetail')).then(this.rspHandler((data) => {
          this.userInfo = data
          this.userInfoLoaded = 1
        this.$emit(this.consts.loadedEvent, data, this.consts.loadedStatus)
      }))
      }
    },
    created: function () {
      window.vm = this;
    }
  }
</script>
