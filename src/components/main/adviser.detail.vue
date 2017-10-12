<template>
  <div class="adviser-detail middle page">
    <div class="adviser-detail-area">
      <img :src="'imgs/avatar-test.jpeg' | localFile">
      <div class="detail">
        <label class="title">董威</label><br>
        <span>服务类型:商标注册</span>
      </div>
      <Button type="primary" class="btn-theme float-right" icon="help" @click="showProblemPop()">提问</Button>
    </div>
    <div class="adviser-detail-container">
      顾问详情
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
  export default {
    data: function () {
      return {
        problemPop: false,
        modalLoading:false,
        businessId:[],
        problemForm: {
          businessId: '',
          problemTitle: '',
          problemDetail: '',
          problemDetail: '',
          consultantId:''
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
      showProblemPop:function(){
        if(this.userInfoLoaded != 1){
          window.vm.$refs.header.loginPop = true
          return
        }
        this.modalLoading = false
        this.problemPop = true
        this.$refs.form.resetFields()
        this.businessId = []
        this.problemForm.consultantId = this.$route.params.id
      },
      addProblem:function(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            var params = this.form
            this.modalLoading = true
            this.$http.post('problem/createProblem', params).then(() => {
              this.modalLoading = false
              this.problemPop = false
              this.$Message.success('提交成功')
            },()=>{
              this.modalLoading = false
            })
          }
        });
      },
      refrsh:function(){
        this.getSelections('business').then((data) => {
          this.selections.business = toVL(data, 'id', 'businessName')
        })
        if(this.$route.params.id){
          this.$http.get('consultant/getConsultantDetail',{params:{id:this.$route.params.id}}).then((rsp)=>{
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
    }
  }
</script>
