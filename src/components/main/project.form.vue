<template>
  <div class="register">
    <Form class="middle form-area half-input" ref="form" :model="form" :rules="rule" :label-width="80">
      <FormItem label="项目名称" prop="title">
        <Input type="text" v-model="form.username"></Input>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input type="password" v-model="form.password"></Input>
      </FormItem>
      <FormItem label="确认密码" prop="password">
        <Input type="password" v-model="form.password"></Input>
      </FormItem>
      <FormItem label="手机号" prop="phone">
        <Input type="password" v-model="form.phone"></Input>
      </FormItem>
      <FormItem label="验证码" prop="verify">
        <Input type="password" v-model="form.verify"></Input>
        <Button class="btn-theme margin-left-10" @click="sendVerify()" :disabled="sendBtnDisabled">{{sendBtnText}}</Button>
      </FormItem>
      <FormItem label="城市" prop="city">
        <Cascader :data="selections.city" v-model="form.city"></Cascader>
      </FormItem>
      <FormItem label="邀请码" prop="visitNum">
        <Input type="password" v-model="form.password"></Input>
      </FormItem>
      <div class="btn-area" style="padding-left:80px;">
        <Button class="btn btn-normal btn-theme" type="primary" :loading="modalLoading" @click="submit()">注册</Button>
      </div>
    </Form>
  </div>
</template>
<script>
  import {verify} from '../../common/mixins'
  export default {
    mixins: [verify],
    data: function () {
      return {
        modalLoading: false,
        form: {
          title: '',
          password: '',
          phone: '',
          city: [],
          verify: ''
        },
        rule: {
          title: [{required: true, message: '用户名不能为空！', trigger: 'blur'}],
          password: [{required: true, message: '密码不能为空！', trigger: 'blur'}]
        },
        selections: {
          city: [{
            value: 'beijing',
            label: '北京',
            children: [
              {
                value: 'gugong',
                label: '故宫'
              },
              {
                value: 'tiantan',
                label: '天坛'
              },
              {
                value: 'wangfujing',
                label: '王府井'
              }
            ]
          }, {
            value: 'jiangsu',
            label: '江苏',
            children: [
              {
                value: 'nanjing',
                label: '南京',
                children: [
                  {
                    value: 'fuzimiao',
                    label: '夫子庙',
                  }
                ]
              },
              {
                value: 'suzhou',
                label: '苏州',
                children: [
                  {
                    value: 'zhuozhengyuan',
                    label: '拙政园',
                  },
                  {
                    value: 'shizilin',
                    label: '狮子林',
                  }
                ]
              }
            ],
          }]
        }
      }
    },
    methods: {
      submit: function () {
        console.log(this.form)
      }
    },
    created: function () {
      window.vm.$refs.header.showBanners = false;
    }
  }
</script>
