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
      <FormItem label="注册服务商">
        <i-switch v-model="form.isCompany" size="large">
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-switch>
      </FormItem>
      <FormItem prop="companyName" label="公司名称" v-if="form.isCompany">
        <Input type="text" v-model="form.companyName">
        </Input>
      </FormItem>
      <FormItem prop="realName" label="真实姓名" v-if="form.isCompany">
        <Input type="text" v-model="form.realName">
        </Input>
      </FormItem>
      <div class="btn-area" style="padding-left:80px;">
        <Button class="btn btn-normal btn-theme" type="primary" :loading="modalLoading" @click="submit()">注册</Button><br>
        <span style="line-height:30px;">点击注册即同意<router-link to="/register" class="fc-theme">呼百应平台用户协议</router-link></span>
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
          inviteCode: '',
          isCompany:false,
          companyName: '',
          realName:''
        },
        rule: {
          phone: {required: true, message: '手机号码不能为空！', trigger: 'blur'},
          password: {required: true, message: '密码不能为空！', trigger: 'blur'},
          passwordConfirm: {required: true, message: '确认密码不能为空！', trigger: 'blur'},
          nickName: {required: true, message: '昵称不能为空！', trigger: 'blur'},
          verificationCode:{required: true, message: '验证码不能为空！', trigger: 'blur'},
          cityId: {type: 'number', required: true, message: '城市不能为空！', trigger: 'blur'},
          companyName: {required: false, message: '公司名称不能为空', trigger: 'blur'},
          realName: {required: false, message: '真实姓名不能为空', trigger: 'blur'}
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
              this.modalLoading = false
            },()=>{
              this.modalLoading = false
            })
          }
        });
      }
    },
    created: function () {
      window.vm.$refs.header.showBanners = false;
      this.refresh()
      this.$watch('form.isCompany',function(v){
        if(v){
          this.rule.companyName.required = true
          this.rule.realName.required = true
        }else{
          this.rule.companyName.required = false
          this.rule.realName.required = false
        }
      })
    }
  }
</script>
