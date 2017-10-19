<template>
  <div class="list-detail" v-html="toContent(data.projectDetail)">
  </div>
</template>
<script type="es6">
  let config = {
    props: {
      data: Object
    },
    data: function () {
      return {
      }
    },
    methods: {
    },
    created:function(){
    }
  }
  export default config
</script>
