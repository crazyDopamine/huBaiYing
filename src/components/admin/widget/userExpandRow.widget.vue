<template>
  <div class="list-detail">
    <table>
      <tr v-if="detail.serviceProvider!=0">
        <td>服务商:{{consts.statusMap.serviceStatus[detail.serviceProvider]}}</td>
        <td>{{detail.businessId | kvTextAS(selections.businessId,'id', 'businessName')}}</td>
        <td>身份证号:{{detail.idCard}}</td>
        <td>
          <img-input v-model="detail.idCardPhoto" readOnly></img-input>
        </td>
      </tr>
      <tr v-if="detail.companyAuthenticate!=0">
        <td>企业认证:{{consts.statusMap.companyStatus[detail.companyAuthenticate]}}</td>
        <td>公司名称:{{detail.companyName}}</td>
        <td>
          <img-input v-model="detail.businessLicensePhoto" readOnly></img-input>
        </td>
      </tr>
    </table>
  </div>
</template>
<script type="es6">
  let config = {
    props: {
      data: Object
    },
    data: function () {
      return {
        detail:this.data,
        selections:{
          businessId:[]
        }
      }
    },
    methods: {
    },
    created: function () {
      this.getSelections('business').then((data)=> {
        this.selections.businessId = data
      })
    }
  }
  export default config
</script>
