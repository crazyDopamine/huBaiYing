<template>
  <div class="user-main middle page">
    <Tabs class="margin-top-20" v-model="tab">
      <TabPane label="个人信息" icon="android-person">
        <div class="detail-area">
          <div class="detail-row">
            <label>姓名：</label><span>{{userInfo.nickName}}</span>
          </div>
          <div class="detail-row">
            <label>手机号：</label><span>{{userInfo.phone}}</span>
          </div>
          <div class="detail-row">
            <label>城市：</label><span>{{userInfo.cityId | selections(map.cityId, 'cityName')}}</span>
          </div>
          <div class="detail-row">
            <label>用户类型：</label>
            <span>{{consts.statusUserMap[userInfo.status]}}</span>
            <Button type="text" @click="showApply()" v-if="(userInfo.status=='effect'||userInfo.status=='auditNotPassed') && userInfo.serviceProvider==0">申请认证服务商</Button>
          </div>
        </div>
      </TabPane>
      <TabPane label="我的项目" icon="ios-paper">
        <Table :columns="projectList.columns" :data="projectList.dataList" border></Table>
        <div class="middle page-bar">
          <Page v-show="projectList.showPage" :current="projectList.page" :total="projectList.total"
                :page-size="projectList.pageSize"
                @on-change="refreshList($event,projectList)" show-elevator></Page>
        </div>
      </TabPane>
      <TabPane label="我的提问" icon="help">
        <Table :columns="problemList.columns" :data="problemList.dataList" border></Table>
        <div class="middle page-bar">
          <Page v-show="problemList.showPage" :current="problemList.page" :total="problemList.total"
                :page-size="problemList.pageSize"
                @on-change="refreshList($event,problemList)" show-elevator></Page>
        </div>
      </TabPane>
    </Tabs>
    <Modal v-model="applyPop" width="500" :closable="true" :mask-closable="false" title="申请认证企业服务商">
      <div class="form-area">
        <Form ref="applyForm" :model="applyForm" :rules="applyRule" :label-width="80">
          <FormItem prop="companyName" label="公司名称">
            <Input type="text" v-model="applyForm.companyName">
            </Input>
          </FormItem>
          <FormItem label="服务类型" prop="businessId">
            <Cascader :data="selections.businessId" placeholder="服务类型" v-model="applyFormBusinessId"
                      @on-change="onBusinessIdChange"></Cascader>
            <ul>
              <li v-for="(item,index) in businessLabelArray" :key="index">{{item}}<a class="float-right"
                                                                                     @click="removeBusiness(index)">
                <Icon type="close-round"></Icon>
              </a></li>
            </ul>
          </FormItem>
          <FormItem prop="realName" label="真实姓名">
            <Input type="text" v-model="applyForm.realName">
            </Input>
          </FormItem>
          <FormItem prop="idCard" label="身份证号">
            <Input type="text" v-model="applyForm.idCard">
            </Input>
          </FormItem>
          <FormItem prop="idCardPhoto" label="身份证正反照片">
            <img-input v-model="applyForm.idCardPhoto" :maxLength="2"></img-input>
            </Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="text-right">
        <Button class="btn-theme" type="primary" :loading="modalLoading" @click="applyService()">提交申请</Button>
      </div>
    </Modal>
  </div>
</template>
<script type="es6">
  import moduleList from '../../common/moduleList'
  import {loadedMixins} from '../../common/mixins'
  import {dateFormat} from 'vux'
  import problemExpandRow from './widget/problemExpandRow.widget.vue'
  import projectExpandRow from './widget/projectExpandRow.widget.vue'
  import {kvText,toVL} from '../../common/utils'
  export default {
    mixins: [moduleList],
    data: function () {
      return {
        tab: 0,
        modalLoading: false,
        applyPop: false,
        businessId:[],
        applyFormBusinessId:[],
        businessLabelArray:[],
        businessIdArray:[],
        applyForm: {
          companyName: '',
          realName:'',
          businessId:'',
          idCard:'',
          idCardPhoto: ''
        },
        applyRule: {
          companyName: {required: false, message: '公司名称不能为空', trigger: 'blur'},
          businessId: {required: false, message: '服务类型不能为空', trigger: 'blur'},
          realName: {required: false, message: '真实姓名不能为空', trigger: 'blur'},
          idCard: {required: false, message: '身份证号不能为空', trigger: 'blur'},
          idCardPhoto: {required: false, message: '身份证照片不能为空', trigger: 'blur'}
        },
        map: {
          cityId: {}
        },
        selections:{
          businessId:[]
        },
        projectList: {
          url: 'user/getProInfoBySelf',
          columns: [
            {
              type: 'expand',
              width: 50,
              render: (h, params) => {
                return h(projectExpandRow, {
                  props: {
                    data: params.row
                  }
                })
              }
            },
            {
              title: '项目名称',
              key: 'projectName'
            },
            {
              title:'项目类型',
              key:'businessId', render: (h, params) => {
                var businessId = eval('['+params.row.businessId+']')
                businessId = businessId[businessId.length-1]
                return h('span', {}, kvText(businessId,this.selections.businessIdAll,'id','businessName').join('/'));
              }
            },
            {
              title: '更新时间', key: 'updatedAt', render: (h, params) => {
                return h('span', {}, dateFormat(params.row.updatedAt, 'YYYY-MM-DD'));
              }
            },
            {
              title: '顾问',
              key:'publisherId',
              render: (h, params) => {
                return h('router-link', {props:{to:'/adviserDetail/'+params.row.consultantId}},params.row.consultantName);
              }
            }
          ]
        },
        problemList: {
          url: 'user/getProblemBySelf',
          columns: [
            {
              type: 'expand',
              width: 50,
              render: (h, params) => {
                return h(problemExpandRow, {
                  props: {
                    data: params.row
                  }
                })
              }
            },
            {
              title: '标题',
              key: 'problemTitle'
            },
            {
              title: '更新时间', key: 'updatedAt', render: (h, params) => {
                return h('span', {}, dateFormat(params.row.updatedAt, 'YYYY-MM-DD'));
              }
            },
            {
              title: '操作',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: (e) => {
                        this.finishProblem(params.row, e)
                      }
                    }
                  }, [h('Icon', {props: {type: 'checkmark-round'}, class: {'margin-right-10': true}}), '确认解决'])
                ]);
              }
            }
          ]
        }
      }
    },
    methods: {
      showApply: function () {
        if (this.userInfoLoaded != 1) {
          window.vm.$refs.header.showPop = true
          return
        }
        this.applyPop = true
        this.modalLoading = false
        this.$refs.applyForm.resetFields()
      },
      finishProblem:function(data){
        this.$Modal.confirm({
          title: '确认已解决',
          content: '<p>是否确认已解决！</p>',
          onOk: () => {
            this.$http.get('problem/resolvedProblem',{params:{id:data.id}}).then(()=>{
              this.refreshList(1, this.problemList)
            })
          }
        });

      },
      applyService: function () {
        this.applyForm.businessId = this.businessIdArray.join('/')
        this.$refs.applyForm.validate((valid) => {
          if (valid) {
            var params = this.applyForm
            this.modalLoading = true
            this.$http.post('user/companyRegister',params).then((rsp)=>{
              this.applyPop = false
              this.modalLoading = false
              window.vm.getUserInfo()
            },()=>{
              this.modalLoading = false
            })
          }
        });
      },
      onBusinessIdChange: function (value, datas) {
        this.businessLabelArray.push(datas[datas.length - 1].__label)
        this.businessIdArray.push(value.toString())
        this.applyFormBusinessId = []
      },
      removeBusiness: function (index) {
        this.businessLabelArray.splice(index, 1)
        this.businessIdArray.splice(index, 1)
      }
    },
    created: function () {
      window.vm.$refs.header.showBanners = false;
      this.initList(this.projectList)
      this.initList(this.problemList)
      this.getSelections('city').then((data) => {
        var map = {}
        data.each((item, index) => {
          map[item.id] = item
        })
        this.map.cityId = map
      })
      this.getSelections('business').then((data)=>{
        this.selections.businessId = toVL(data, 'id', 'businessName')
        this.selections.businessIdAll = data
      })
      this.$on(this.consts.loadedEvent, function () {
        if (this.tab === 1) {
          this.refreshList(1, this.projectList)
        } else if (this.tab === 2) {
          this.refreshList(1, this.problemList)
        }
      })
      this.$watch('tab', function (v) {
        if (v === 1) {
          this.refreshList(1, this.projectList)
        } else if (v === 2) {
          this.refreshList(1, this.problemList)
        }
      })
      if (this.$route.params.tab)this.tab = Number(this.$route.params.tab)
    }
  }
</script>
