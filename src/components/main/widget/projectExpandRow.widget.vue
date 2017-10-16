<template>
  <div class="list-detail">
    <table>
      <tr></tr>
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
          msg: ''
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
