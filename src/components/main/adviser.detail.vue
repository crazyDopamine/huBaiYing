<template>
  <div class="adviser-detail middle page">
    <div class="adviser-detail-area">
      <Avatar icon="person" size="large" :src="detail.headPhoto | img(3)"/>
      <div class="detail">
        <label class="title">{{detail.actualName}}</label><br>
        <ul>
          <li class="margin-right-10" v-for="(business,index) in detail.businessName" :key="index">{{business}}</li>
        </ul>
      </div>
      <router-link :to="'/projectForm/'+detail.id">
        <Button type="primary" class="btn-theme float-right" icon="plus-round">向他发送需求</Button>
      </router-link>
      <Button type="primary" class="btn-theme float-right margin-right-20" icon="plus-round" @click="showProblemPop()">提问</Button>
    </div>
    <div class="adviser-detail-container" v-html="detail.selfIntroduction">
    </div>
    <Modal v-model="problemPop" width="500" :closable="true" :mask-closable="false">
      <div class="form-area">
        <h1 class="text-center margin-bottom-20">提问题</h1>
        <Form ref="form" :model="problemForm" :rules="problemRule">
          <FormItem prop="businessId">
            <Cascader :data="selections.business" v-model="businessId" placeholder="服务类型"></Cascader>
          </FormItem>
          <FormItem prop="problemTitle">
            <Input type="text" v-model="problemForm.problemTitle" placeholder="问题标题" size="large">
            </Input>
          </FormItem>
          <FormItem prop="problemDetail">
            <Input type="textarea" v-model="problemForm.problemDetail" :rows="4" placeholder="问题详情" size="large">
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
  import {toVL} from '../../common/utils'
  export default {
    data: function () {
      return {
        detail: {},
        problemPop: false,
        modalLoading: false,
        businessId: [],
        problemForm: {
          businessId: '',
          problemTitle: '',
          problemDetail: '',
          problemDetail: '',
          consultantId: ''
        },
        problemRule: {
          businessId: {required: true, message: '服务类型不能为空！', trigger: 'blur'},
          problemTitle: {required: true, message: '问题标题不能为空！', trigger: 'blur'},
          problemDetail: {required: true, message: '问题详情不能为空！', trigger: 'blur'}
        },
        selections: {
          businessId: []
        }
      }
    },
    methods: {
      showProblemPop: function () {
        if (this.userInfoLoaded != 1) {
          window.vm.$refs.header.loginPop = true
          return
        }
        this.modalLoading = false
        this.problemPop = true
        this.$refs.form.resetFields()
        this.businessId = []
        this.problemForm.consultantId = this.$route.params.id
      },
      addProblem: function () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            var params = this.form
            this.modalLoading = true
            this.$http.post('problem/createProblem', params).then(() => {
              this.modalLoading = false
              this.problemPop = false
              this.$Message.success('提交成功')
            }, () => {
              this.modalLoading = false
            })
          }
        });
      },
      refresh: function () {
        this.getSelections('business').then((data) => {
          this.selections.business = toVL(data, 'id', 'businessName')
        })
        if (this.$route.params.id) {
          this.$http.get('consultant/getConsultantDetail', {params: {id: this.$route.params.id}}).then((rsp) => {
            this.detail = rsp.data
          })
        }
      }
    },
    created: function () {
      window.vm.$refs.header.showBanners = false;
      this.$watch('businessId', function (v) {
        this.form.businessId = v.toString()
      })
      this.refresh()
    }
  }
</script>
