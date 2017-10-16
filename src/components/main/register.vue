<template>
  <div class="register page">
    <Form class="middle form-area half-input" ref="form" :model="form" :rules="rule" :label-width="80">
      <!--<FormItem label="用户名" prop="username">-->
        <!--<Input type="text" v-model="form.username"></Input>-->
      <!--</FormItem>-->
      <FormItem label="手机号" prop="phone">
        <Input type="text" v-model="form.phone"></Input>
      </FormItem>
      <FormItem label="验证码" prop="verificationCode">
        <Input type="text" v-model="form.verificationCode"></Input>
        <Button class="btn-theme margin-left-10" @click="sendVerify()" :disabled="sendBtnDisabled">{{sendBtnText}}
        </Button>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input type="password" v-model="form.password"></Input>
      </FormItem>
      <FormItem label="确认密码" prop="passwordConfirm">
        <Input type="password" v-model="form.passwordConfirm"></Input>
      </FormItem>
      <FormItem label="昵称" prop="nickName">
        <Input type="text" v-model="form.nickName"></Input>
      </FormItem>
      <FormItem label="城市" prop="cityId">
        <Select v-model="form.cityId">
          <Option v-for="item in selections.cityId" :value="item.id" :key="item.id">{{ item.cityName }}</Option>
        </Select>
      </FormItem>
      <FormItem label="邀请码" prop="inviteCode">
        <Input type="text" v-model="form.inviteCode"></Input>
      </FormItem>
      <div class="btn-area" style="padding-left:80px;">
        <Button class="btn btn-normal btn-theme" type="primary" :loading="modalLoading" @click="submit()">注册</Button><br>
        <span style="line-height:30px;">点击注册则代表同意<router-link to="/register" class="fc-theme">呼百应平台用户协议</router-link></span>
      </div>
    </Form>
  </div>
</template>
<script type="es6">
  import {verify} from '../../common/mixins'
  export default {
    mixins: [verify],
    data: function () {
      return {
        modalLoading: false,
        form: {
          // username: '',
          phone: '',
          password: '',
          passwordConfirm: '',
          nickName: '',
          cityId: '',
          verificationCode: '',
          inviteCode: ''
        },
        rule: {
          // username: [{required: true, message: '用户名不能为空！', trigger: 'blur'}],
          phone: [{required: true, message: '手机号码不能为空！', trigger: 'blur'}],
          password: [{required: true, message: '密码不能为空！', trigger: 'blur'}],
          passwordConfirm: [{required: true, message: '确认密码不能为空！', trigger: 'blur'}],
          nickName: [{required: true, message: '昵称不能为空！', trigger: 'blur'}],
          verificationCode:[{required: true, message: '验证码不能为空！', trigger: 'blur'}],
          cityId: [{type: 'number', required: true, message: '城市不能为空！', trigger: 'blur'}]
        },
        selections: {
          cityId: []
        }
      }
    },
    methods: {
      refresh: function () {
        this.getSelections('city').then((data)=>{
          this.selections.cityId = data
        })
      },
      submit: function () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            var params = this.form
            if (params.passwordConfirm != params.password) {
              this.$Message.error('两次输入的密码图不相同!')
              return
            }
            this.modalLoading = true
            this.$http.post('user/register', params).then(()=> {
              this.$Message.success('注册成功')
              this.$router.push('/main')
            })
          }
        });
      }
    },
    created: function () {
      window.vm.$refs.header.showBanners = false;
      this.refresh()
    }
  }
</script>
