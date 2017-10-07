<template>
  <div class="problem-main page">
    <div class="search-bar">
      <Row class="middle" type="flex">
        <Col span="6" class="padding-right-20">
        <Cascader :data="selections.business" placeholder="服务类型" v-model="list.serviceType"></Cascader>
        </Col>
        <Col span="12" class="padding-right-20">
        <Input type="text" v-model="list.params.title" placeholder="问题标题"></Input>
        </Col>
        <Col span="3" class="padding-right-20">
        <Button class="margin-right-20" type="ghost" icon="ios-search" @click="refreshList(1)">查询</Button>
        </Col>
        <Col span="3" class="text-right">
        <Button type="primary" class="btn-theme" icon="help" @click="showPop()">提问</Button>
        </Col>
      </Row>
    </div>
    <div class="problem-main-list">
      <ul class="middle">
        <li class="problem-main-item" v-for="(data,index) in list.dataList">
          <router-link class="problem-main-item-title" to="/problemDetail/1">问题标题</router-link>
          <span class="margin-left-20 problem-main-item-status fc-theme">已解决</span>
          <span class="problem-main-item-date float-right">2017-9-17 14：45</span><br>
          <p class="problem-main-item-content">内容</p>
        </li>
      </ul>
      <Spin size="large" v-if="list.showLoading"></Spin>
      <div class="empty-view" v-if="!list.showLoading&&list.dataList.length==0">
        <Icon type="ios-box-outline"></Icon><br/>
        无数据
      </div>
      <div class="middle page-bar">
        <Page v-show="list.showPage" :current="list.page" :total="list.total" :page-size="list.pageSize"
              @on-change="refreshList($event)" show-elevator></Page>
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
<script type="es6">
  import moduleList from '../../common/moduleList'
  import {toVL} from '../../common/utils'
  export default {
    mixins:[moduleList],
    data: function () {
      return {
        list: {
          url: 'problem/queryAllProblem',
          serviceType:[],
          params: {
            serviceType:'',
            title: ''
          }
        },
        formPop: false,
        modalLoading:false,
        form:{
          serviceType:[],
          title:'',
          content:'',
          type:[]
        },
        rule:{

        },
        selections: {
          business: []
        }
      }
    },
    methods: {
      showPop:function(){
      	this.formPop = true;
      },
      addProblem:function(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.modalLoading = true
//            this.
          }
        });
      },
      refresh:function(){
        this.getSelections('business').then((data)=>{
          this.selections.business = toVL(data,'id','businessName')
        })
      }
    },
    created: function () {
      window.vm.$refs.header.showBanners = true;
      this.initList(this.list)
      this.refresh()
      this.refreshList()
      this.$watch('list.serviceType',function(v){
        this.list.params.serviceType = v.toString()
      })
    }
  }
</script>
