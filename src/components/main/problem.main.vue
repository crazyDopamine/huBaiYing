<template>
  <div class="problem-main page">
    <div class="search-bar">
      <Row class="middle" type="flex">
        <Col span="6" class="padding-right-20">
        <Cascader :data="selections.city" placeholder="服务类型"></Cascader>
        </Col>
        <Col span="12" class="padding-right-20">
        <Input type="text" v-model="list.params.title" placeholder="问题标题"></Input>
        </Col>
        <Col span="3" class="padding-right-20">
        <Button class="margin-right-20" type="ghost" icon="ios-search">查询</Button>
        </Col>
        <Col span="3" class="text-right">
        <Button type="primary" class="btn-theme" icon="help" @click="showPop()">提问</Button>
        </Col>
      </Row>
    </div>
    <div class="problem-main-list">
      <ul class="middle">
        <li class="problem-main-item">
          <router-link class="problem-main-item-title" to="/problemDetail/1">问题标题</router-link>
          <span class="margin-left-20 problem-main-item-status fc-theme">已解决</span>
          <span class="problem-main-item-date float-right">2017-9-17 14：45</span><br>
          <p class="problem-main-item-content">内容</p>
        </li>
      </ul>
      <div class="middle page-bar">
        <Page :total="100" show-elevator></Page>
      </div>
    </div>
    <Modal v-model="formPop" width="500" :closable="true" :mask-closable="false">
      <div class="form-area">
        <h1 class="text-center margin-bottom-20">提问题</h1>
        <Form ref="form" :model="form" :rules="rule">
          <FormItem prop="type">
            <Cascader :data="selections.city" v-model="form.type" placeholder="服务类型"></Cascader>
            </Input>
          </FormItem>
          <FormItem prop="title">
            <Input type="text" v-model="form.title" placeholder="问题标题" size="large">
            </Input>
          </FormItem>
          <FormItem prop="content">
            <Input type="textarea" v-model="form.content" :rows="4" placeholder="问题详情" size="large">
            </Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="text-right">
        <Button class="btn-theme" type="primary" :loading="modalLoading" @click="addProblem()">提交</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        formPop: false,
        modalLoading:false,
        form:{
          title:'',
          content:'',
          type:[]
        },
        rule:{

        },
        list: {
          params: {
            title: ''
          },
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
      showPop:function(){
      	this.formPop = true;
      },
      addProblem:function(){
        this.modalLoading = true
        this.$refs.form.validate((valid) => {
          this.modalLoading = false
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        });
      }
    },
    created: function () {
      window.vm.$refs.header.showBanners = true;
    }
  }
</script>
