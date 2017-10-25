<template>
  <div class="page-container" style="min-width:1300px;">
    <div class="form-area container">
      <Form class="middle form-area half-input" ref="form" :model="form" :rules="rule" :label-width="120">
        <!--<FormItem label="手机号" prop="phone">-->
          <!--<Input type="text" v-model="form.phone"></Input>-->
        <!--</FormItem>-->
        <FormItem label="手机号码" prop="phone">
          <Input type="text" v-model="form.phone"></Input>
        </FormItem>
        <FormItem label="姓名" prop="actualName">
          <Input type="text" v-model="form.actualName"></Input>
        </FormItem>
        <FormItem label="头像" prop="headPhoto" >
          <img-input v-model="form.headPhoto" :maxLength="1"></img-input>
        </FormItem>
        <FormItem label="服务类型" prop="businessId">
          <Cascader :data="selections.businessId" placeholder="服务类型" v-model="businessId" @on-change="onBusinessIdChange"></Cascader>
          <ul style="width:50%;">
            <li v-for="(item,index) in businessLabelArray" :key="index">{{item}}<a class="float-right" @click="removeBusiness(index)"><Icon type="close-round"></Icon></a></li>
          </ul>
        </FormItem>
        <!--<FormItem label="验证码" prop="verificationCode">-->
          <!--<Input type="text" v-model="form.verificationCode"></Input>-->
          <!--<Button class="btn-theme margin-left-10" @click="sendVerify()" :disabled="sendBtnDisabled">{{sendBtnText}}-->
          <!--</Button>-->
        <!--</FormItem>-->
        <FormItem label="身份证" prop="idCard">
          <Input type="text" v-model="form.idCard"></Input>
        </FormItem>
        <FormItem label="身份证正反面照片" prop="idCardPhoto" >
          <img-input v-model="form.idCardPhoto" :maxLength="2"></img-input>
        </FormItem>
        <FormItem label="城市" prop="cityId">
          <!--<Select v-model="form.cityId">-->
            <!--<Option v-for="item in selections.cityId" :value="item.id" :key="item.id">{{ item.cityName }}</Option>-->
          <!--</Select>-->
          <city-input v-model="form.cityId"></city-input>
        </FormItem>
        <FormItem prop="selfIntroduction" :label-width="1">
          <div class="text-right" style="width:120px;padding-right:12px;">自我介绍</div>
          <editor v-model="form.selfIntroduction"></editor>
        </FormItem>
        <div class="btn-area" style="padding-left:120px;">
          <Button class="btn btn-normal btn-theme" type="primary" :loading="modalLoading" @click="submit()">保存</Button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script type="es6">
  import moduleList from '../../common/moduleList'
  import {toVL,kvText} from '../../common/utils'
  import {dateFormat} from 'vux'
  export default {
    mixins: [ moduleList],
    data: function () {
      return {
        status: 0,
        pop: false,
        modalLoading: false,
        businessId:[],
        businessLabelArray:[],
        businessIdArray:[],
        form: {
          phone: '',
          actualName:'',
          headPhoto:'',
          cityId:'',
          selfIntroduction:'',
          businessId:'',
          idCard:'',
          idCardPhoto:''
        },
        rule:{
          phone: [{required: true, message: '手机号不能为空！', trigger: 'blur'}],
          actualName: {required: true, message: '姓名不能为空！', trigger: 'blur'},
          headPhoto: {required: true, message: '头像不能为空！', trigger: 'blur'},
          businessId: {required: true, message: '服务类型不能为空！', trigger: 'blur'},
          cityId: {required: true, message: '城市不能为空！', trigger: 'blur'},
          selfIntroduction: {required: true, message: '自我介绍不能为空！', trigger: 'blur'},
          idCard: {required: true, message: '身份证号不能为空！', trigger: 'blur'},
          idCardPhoto: {required: true, message: '请上传身份证正反面照片!', trigger: 'blur'},
        },
        selections:{
          cityId:[],
          businessId:[]
        }
      }
    },
    methods: {
      submit: function () {
        this.form.businessId = this.businessIdArray.join('/')
        this.$refs.form.validate((valid) => {
          if (valid) {
            var params = this.form
            this.modalLoading = true
            this.$http.post('admin/perfectPersonalInfo', params).then((rsp)=> {
              this.modalLoading = false
              this.$Message.success('保存成功')
              window.vm.getUserInfo()
            },()=>{
              this.modalLoading = false
            })
          }
        });
      },
      onBusinessIdChange:function(value,datas){
        this.businessLabelArray.push(datas[datas.length-1].__label)
        this.businessIdArray.push(value.toString())
        this.businessId = []
      },
      removeBusiness:function(index){
        this.businessLabelArray.splice(index,1)
        this.businessIdArray.splice(index,1)
      }
    },
    created: function () {
      this.$on(this.consts.loadedEvent, function () {
        this.setValues(this.form,this.userInfo)
        this.businessIdArray = this.userInfo.businessId.split('/')
        this.businessLabelArray = []
        this.getSelections('city').then((data)=>{
          this.selections.cityId = data
        })
        this.getSelections('business').then((data)=>{
          this.selections.businessId = toVL(data, 'id', 'businessName')
          this.businessIdArray.each((item,index)=>{
            var businessId = eval('['+item+']')
            businessId = businessId[businessId.length-1]
            this.businessLabelArray.push(kvText(businessId,data,'id','businessName').join('/'))
          })
        })
      })
    }
  }
</script>
