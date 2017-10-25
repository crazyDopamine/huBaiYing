<template>
  <div class="list-detail">
    <table>
      <tr>
        <td>
          手机号:{{data.phone}}
        </td>
        <td>
          项目预算:{{data.budget}}
        </td>
        <td>
          项目价格:{{data.price}}
        </td>
      </tr>
    </table>
    <div class="list-detail-content" v-html="toContent(data.projectDetail)">

    </div>
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
