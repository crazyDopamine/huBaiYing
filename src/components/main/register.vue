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
        <Button class="btn-theme margin-left-10" @click="sendVerify(form.phone)" :disabled="sendBtnDisabled">
          {{sendBtnText}}
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
        <!--<Select v-model="form.cityId">-->
        <!--<Option v-for="item in selections.cityId" :value="item.id" :key="item.id">{{ item.cityName }}</Option>-->
        <!--</Select>-->
        <city-input v-model="form.cityId"></city-input>
      </FormItem>
      <FormItem label="邀请码" prop="inviteCode">
        <Input type="text" v-model="form.inviteCode"></Input>
      </FormItem>
      <FormItem label="注册服务商">
        <i-switch v-model="serviceProvider" size="large">
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-switch>
      </FormItem>
      <FormItem label="服务类型" prop="businessId" v-if="serviceProvider">
        <Cascader :data="selections.businessId" placeholder="服务类型" v-model="businessId"
                  @on-change="onBusinessIdChange"></Cascader>
        <ul style="width:50%;">
          <li v-for="(item,index) in businessLabelArray" :key="index">
            {{item}}
            <a class="float-right" @click="removeBusiness(index)">
              <Icon type="close-round"></Icon>
            </a>
          </li>
        </ul>
      </FormItem>
      <FormItem prop="realName" label="真实姓名" v-if="serviceProvider">
        <Input type="text" v-model="form.realName">
        </Input>
      </FormItem>
      <FormItem prop="idCard" label="身份证号" v-if="serviceProvider">
        <Input type="text" v-model="form.idCard">
        </Input>
      </FormItem>
      <FormItem prop="idCardPhoto" label="身份证正反照片" v-if="serviceProvider">
        <img-input v-model="form.idCardPhoto" :maxLength="2"></img-input>
        </Input>
      </FormItem>
      <FormItem label="企业认证">
        <i-switch v-model="companyAuthenticate" size="large">
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-switch>
      </FormItem>
      <FormItem prop="companyName" label="公司名称" v-if="companyAuthenticate">
        <Input type="text" v-model="form.companyName">
        </Input>
      </FormItem>
      <FormItem prop="businessLicensePhoto" label="营业执照" v-if="companyAuthenticate">
        <img-input v-model="form.businessLicensePhoto" :maxLength="1"></img-input>
        </Input>
      </FormItem>
      <div class="btn-area" style="padding-left:80px;">
        <Button class="btn btn-normal btn-theme" type="primary" :loading="modalLoading" @click="submit()">注册</Button>
        <br>
        <span style="line-height:30px;">点击注册即同意<router-link to="/register"
                                                            class="fc-theme">呼百应平台用户协议
        </router-link></span>
      </div>
    </Form>
  </div>
</template>
<script type="es6">
  import {verify} from '../../common/mixins'
  import {toVL} from '../../common/utils'
  export default {
    mixins: [verify],
    data: function () {
      return {
        modalLoading: false,
        businessLabelArray: [],
        businessIdArray: [],
        businessId: [],
        serviceProvider: false,
        companyAuthenticate: false,
        form: {
          // username: '',
          phone: '',
          password: '',
          passwordConfirm: '',
          nickName: '',
          cityId: '',
          verificationCode: '',
          inviteCode: '',
          serviceProvider: 0,
          realName: '',
          businessId: '',
          idCard: '',
          idCardPhoto: '',
          companyAuthenticate: 0,
          companyName: '',
          businessLicensePhoto: ''
        },
        rule: {
          phone: {required: true, message: '手机号码不能为空！', trigger: 'blur'},
          password: {required: true, message: '密码不能为空！', trigger: 'blur'},
          passwordConfirm: {required: true, message: '确认密码不能为空！', trigger: 'blur'},
          nickName: {required: true, message: '昵称不能为空！', trigger: 'blur'},
          verificationCode: {required: true, message: '验证码不能为空！', trigger: 'blur'},
          cityId: {required: true, message: '城市不能为空！', trigger: 'blur'},
          businessId: {required: false, message: '服务类型不能为空', trigger: 'blur'},
          realName: {required: false, message: '真实姓名不能为空', trigger: 'blur'},
          idCard: {required: false, message: '身份证号不能为空', trigger: 'blur'},
          idCardPhoto: {required: false, message: '身份证照片不能为空', trigger: 'blur'},
          companyName: {required: false, message: '公司名称不能为空', trigger: 'blur'},
          businessLicensePhoto: {required: false, message: '请上传营业执照', trigger: 'blur'},
        },
        selections: {
          businessId: []
        }
      }
    },
    methods: {
      refresh: function () {
        this.getSelections('business').then((data)=> {
          this.selections.businessId = toVL(data, 'id', 'businessName')
        })
      },
      submit: function () {
        this.form.businessId = this.businessIdArray.join('/')
        this.$refs.form.validate((valid) => {
          if (valid) {
            var params = this.form
            if (params.passwordConfirm != params.password) {
              this.$Message.error('两次输入的密码图不相同!')
              return
            }
            this.modalLoading = true
            this.$http.post('user/register', params).then(() => {
              this.$Message.success('注册成功')
              this.$router.push('/main')
              this.modalLoading = false
            }, () => {
              this.modalLoading = false
            })
          }
        });
      },
      onBusinessIdChange: function (value, datas) {
        this.businessLabelArray.push(datas[datas.length - 1].__label)
        this.businessIdArray.push(value.toString())
        this.businessId = []
      },
      removeBusiness: function (index) {
        this.businessLabelArray.splice(index, 1)
        this.businessIdArray.splice(index, 1)
      }
    },
    created: function () {
      window.vm.$refs.header.showBanners = false;
      this.refresh()
      this.$watch('serviceProvider', function (v) {
        if (v) {
          this.rule.realName.required = true
          this.rule.businessId.required = true
          this.rule.idCard.required = true
          this.rule.idCardPhoto.required = true
          this.form.serviceProvider = 1
        } else {
          this.rule.realName.required = false
          this.rule.businessId.required = false
          this.rule.idCard.required = false
          this.rule.idCardPhoto.required = false
          this.form.serviceProvider = 0
        }
      })
      this.$watch('companyAuthenticate', function (v) {
        if (v) {
          this.rule.companyName.required = true
          this.rule.businessLicensePhoto.required = true
          this.form.companyAuthenticate = 1
        } else {
          this.rule.companyName.required = false
          this.rule.businessLicensePhoto.required = false
          this.form.companyAuthenticate = 0
        }
      })
    }
  }
</script>
