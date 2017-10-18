<template>
  <div class="list-detail">
    <table>
      <tr>
        <td>价格:10000元</td>
        <td>服务商:服务商</td>
      </tr>
      <tr>
        <td colspan="3"></td>
        <td>
          <Button class="fc-theme" type="text">确认并支付</Button>
          <Button class="fc-theme" type="text">确认完成</Button>
        </td>
      </tr>
      <tr>
        <td>顾问服务:</td>
        <td colspan="3">
          <Rate allow-half v-model="form.scroll1"></Rate>
        </td>
      </tr>
      <tr>
        <td>服务商服务:</td>
        <td colspan="3">
          <Rate allow-half v-model="form.scroll1"></Rate>
        </td>
      </tr>
      <tr>
        <td style="height:auto;" colspan="3">
          <Input type="textarea" :rows="4" v-model="form.content"></Input>
        </td>
      </tr>
      <tr>
        <td>
          <Button class="fc-theme" type="text">确认评价</Button>
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
        showForm:false,
        form: {
          scroll1:5,
          content:''
        },
        rule: {
          msg: {required: true, message: '消息不能为空!', trigger: 'blur'}
        },
        loading: false
      }
    },
    methods: {
      ask:function(msg){
        this.showForm = true
      },
      submit: function () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            var params = this.form
            this.loading = true
            // this.$http.post('user/login',params).then((rsp)=>{
            //   this.$Message.success('登陆成功！')
            //   if(rsp.data){
            //     cookie.set(this.consts.ticketKey,rsp.data.token)
            //   }
            //   window.vm.getUserInfo()
            //   this.modalLoading = false
            //   this.loginPop = false
            // },()=>{
            //   this.modalLoading = false
            // })
          }
        });
      }
    }
  }
  export default config
</script>
