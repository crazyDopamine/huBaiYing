<template>
  <div class="register">
    <Form class="middle form-area half-input" ref="form" :model="form" :rules="rule" :label-width="100">
      <FormItem label="项目名称" prop="projectName">
        <Input type="text" v-model="form.projectName"></Input>
      </FormItem>
      <FormItem label="项目类型" prop="businessId">
        <Cascader :data="selections.businessId" v-model="businessId"></Cascader>
      </FormItem>
      <FormItem label="项目详情" prop="projectDetail">
        <Input type="textarea" :rows="4" v-model="form.projectDetail"></Input>
      </FormItem>
      <FormItem label="联系人手机" prop="phone">
        <Input type="text" v-model="form.phone"></Input>
      </FormItem>
      <FormItem label="城市" prop="cityId">
        <Select v-model="form.cityId">
          <Option v-for="item in selections.cityId" :value="item.id" :key="item.id">{{ item.cityName }}</Option>
        </Select>
      </FormItem>
      <div class="btn-area" style="padding-left:100px;">
        <Button class="btn btn-normal btn-theme" type="primary" :loading="modalLoading" @click="submit()">提交</Button>
      </div>
    </Form>
  </div>
</template>
<script type="es6">
  import {toVL , mix} from '../../common/utils'
  import {loadedMixins} from '../../common/mixins'
  export default {
    mixins: [loadedMixins],
    data: function () {
      return {
        modalLoading: false,
        businessId:[],
        form: {
          projectName: '',
          businessId:'',
          projectDetail: '',
          phone: '',
          cityId: ''
        },
        rule: {
          projectName: {required: true, message: '项目名称不能为空！', trigger: 'blur'},
          businessId: {required: true, message: '项目类型不能为空！', trigger: 'blur'},
          projectDetail: {required: true, message: '项目详情不能为空！', trigger: 'blur'},
          phone: {required: true, message: '联系人手机不能为空！', trigger: 'blur'},
          cityId: {type:'number',required: true, message: '城市不能为空！', trigger: 'blur'}
        },
        selections: {
          cityId: [],
          businessId: []
        }
      }
    },
    methods: {
      submit: function () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.modalLoading = true
            var params = this.form
            this.$http.post('project/createProject',params).then(()=>{
              this.$Message.success('发布成功!')
            	this.$router.push('/userMain')
            },()=>{
              this.modalLoading = false
            })
          }
        });
      },
      refresh: function () {
        if (this.$route.params.id) {

        }
        this.getSelections('business').then((data) => {
          this.selections.businessId = toVL(data, 'id', 'businessName')
        })
        this.getSelections('city').then((data)=>{
          this.selections.cityId = data
        })
      }
    },
    created: function () {
      window.vm.$refs.header.showBanners = false;
      this.refresh()
      this.$on(this.consts.loadedEvent,function(){
        this.form.phone = this.userInfo.phone+''
        console.log(this.$refs.form)
      })
      this.$watch('businessId',function(v){
      	this.form.businessId = v.toString()
      })
    }
  }
</script>
