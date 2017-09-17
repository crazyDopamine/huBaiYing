<template>
  <div class="register">
    <div class="middle form-area">
      <div class="form-row clearfix">
        <label class="col-3">账号：</label>
        <div class="col-8">
          <Input type="text" v-model="fieldSet.username" placeholder="账号"></Input>
        </div>
      </div>
      <div class="form-row clearfix">
        <label class="col-3">密码：</label>
        <div class="col-8">
          <Input type="password" v-model="fieldSet.password" placeholder="密码"></Input>
        </div>
      </div>
      <div class="form-row clearfix">
        <label class="col-3">确认密码：</label>
        <div class="col-8">
          <Input type="password" v-model="fieldSet.password" placeholder="确认密码"></Input>
        </div>
      </div>
      <div class="form-row clearfix">
        <label class="col-3">手机号：</label>
        <div class="col-8">
          <Input type="text" v-model="fieldSet.phone" placeholder="手机号"></Input>
        </div>
      </div>
      <div class="form-row clearfix">
        <label class="col-3">验证码：</label>
        <div class="col-5">
          <Input type="text" v-model="fieldSet.verify" placeholder="验证码"></Input>
        </div>
        <div class="padding-left-10 col-3 text-right">
          <Button class="btn-theme" long>{{sendBtn}}</Button>
        </div>
      </div>
      <div class="form-row clearfix">
        <label class="col-3">城市：</label>
        <div class="col-8">
          <Cascader :data="selections.city" v-model="fieldSet.city"></Cascader>
        </div>
      </div>
      <div class="form-row clearfix">
        <label class="col-3">邀请码：</label>
        <div class="col-8">
          <Input type="text" v-model="fieldSet.phone" placeholder="邀请码"></Input>
        </div>
      </div>
      <div class="btn-area">
        <Button class="btn btn-normal btn-theme" type="primary" :loading="modalLoading" @click="submit()">注册</Button>
      </div>

    </div>
  </div>
</template>
<script>
  import formValidate from '../../common/formValidate'
  export default {
    mixins: [formValidate],
    data: function () {
      return {
        modalLoading: false,
        sendBtn: '发送验证码',
        fieldSet: {
          username: '',
          password: '',
          phone: '',
          city: [],
          verify: ''
        },
        rule: {
          username: {
            label: '账号',
            required: true
          },
          password: {
            label: '密码',
            required: true
          }
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
        console.log(this.getValues())
      }
    },
    created: function () {
      window.vm.$refs.header.showBanners = false;
    }
  }
</script>
