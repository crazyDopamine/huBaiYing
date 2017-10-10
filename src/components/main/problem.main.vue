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
          <router-link class="problem-main-item-title" :to="'/problemDetail/'+data.id">{{data.problemTitle}}</router-link>
          <span class="margin-left-20 problem-main-item-status fc-theme">已解决</span>
          <span class="problem-main-item-date float-right">{{data.createdAt | date}}</span><br>
          <p class="problem-main-item-content">{{data.problemDetail}}</p>
        </li>
      </ul>
      <Spin size="large" v-if="list.showLoading"></Spin>
      <div class="empty-view" v-if="!list.showLoading&&list.dataList.length==0">
        <Icon type="ios-box-outline"></Icon>
        <br/>
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
          <FormItem prop="businessId">
            <Cascader :data="selections.business" v-model="businessId" placeholder="服务类型"></Cascader>
          </FormItem>
          <FormItem prop="problemTitle">
            <Input type="text" v-model="form.problemTitle" placeholder="问题标题" size="large">
            </Input>
          </FormItem>
          <FormItem prop="problemDetail">
            <Input type="textarea" v-model="form.problemDetail" :rows="4" placeholder="问题详情" size="large">
            </Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="text-right">
        <Button class="btn-theme" type="primary" :loading="modalLoading" @click="submit()">提交</Button>
      </div>
    </Modal>
  </div>
</template>
<script type="es6">
  import moduleList from '../../common/moduleList'
  import {toVL} from '../../common/utils'
  export default {
    mixins: [moduleList],
    data: function () {
      return {
        list: {
          url: 'problem/queryAllProblem',
          serviceType: [],
          params: {
            serviceType: '',
            title: ''
          }
        },
        formPop: false,
        modalLoading: false,
        businessId: [],
        form: {
          businessId: '',
          problemTitle: '',
          problemDetail: ''
        },
        rule: {
          businessId: {required: true, message: '服务类型不能为空！', trigger: 'blur'},
          problemTitle: {required: true, message: '问题标题不能为空！', trigger: 'blur'},
          problemDetail: {required: true, message: '问题详情不能为空！', trigger: 'blur'}
        },
        selections: {
          business: []
        }
      }
    },
    methods: {
      showPop: function () {
        if(this.userInfoLoaded != 1){
          window.vm.$refs.header.loginPop = true
        }
        this.modalLoading = false
        this.formPop = true
        this.$refs.form.resetFields()
        this.businessId = []
      },
      submit: function () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            var params = this.form
            this.modalLoading = true
            this.$http.post(this.url('problem/createProblem'), params).then(this.rspHandler((data) => {
              this.modalLoading = false
              this.formPop = false
              this.$Message.success('提交成功')
              this.refreshList(1)
            },()=>{
              this.modalLoading = false
            }))
          }
        });
      },
      refresh: function () {
        this.getSelections('business').then((data) => {
          this.selections.business = toVL(data, 'id', 'businessName')
        })
      }
    },
    created: function () {
      window.vm.$refs.header.showBanners = true;
      console.log(this.$route.params)
      if(this.$route.params.title){
      	this.list.params.title = this.$route.params.title
      }
      this.initList(this.list)
      this.refresh()
      this.refreshList()
      this.$watch('list.serviceType', function (v) {
        this.list.params.serviceType = v.toString()
      })
      this.$watch('businessId', function (v) {
        this.form.businessId = v.toString()
      })
    }
  }
</script>
