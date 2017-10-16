<template>
  <div>
    <Form ref="form" :model="form" :rules="rule" :label-width="80">
      <FormItem label="问题详情">
        <p>{{data.problemDetail}}</p>
        <ul>
          <li>xxx顾问:回答内容xxxxxxxxxxxxxxxx</li>
          <li>追问xxxxxxxxxxx</li>
        </ul>
      </FormItem>
      <FormItem prop="msg" label="回复消息" v-show="showForm">
        <Input type="textarea" v-model="form.msg" placeholder="回复消息" :rows="4" size="large">
        </Input>
      </FormItem>
    </Form>
    <div class="btn-area" style="padding-left:80px;" v-show="showForm">
      <Button class="btn-theme" type="primary" icon="android-send" :loading="loading" @click="submit()">发送</Button>
      <!--<Button :loading="loading" @click="showForm=false">取消</Button>-->
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
        showForm:true,
        form: {
          msg: ''
        },
        rule: {
          msg: {required: true, message: '消息不能为空!'}
        },
        loading: false
      }
    },
    methods: {
      answer:function(msg){
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
