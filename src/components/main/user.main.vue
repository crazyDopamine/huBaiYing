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
            <label>用户类型：</label><span>普通用户</span>
            <Button type="text" @click="showApply()">申请认证服务商</Button>
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
    <Modal v-model="applyPop" width="360" :closable="true" :mask-closable="false" title="申请认证企业服务商">
      <div class="form-area">
        <Form ref="applyForm" :model="applyForm" :rules="applyRule" :label-width="80">
          <FormItem prop="companyName" label="公司名称">
            <Input type="text" v-model="applyForm.companyName">
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
  export default {
    mixins: [moduleList],
    data: function () {
      return {
        tab: 0,
        modalLoading: false,
        applyPop: false,
        applyForm: {
          companyName: ''
        },
        applyRule: {
          companyName: {required: true, message: '公司名称不能为空', trigger: 'blur'}
        },
        map: {
          cityId: {}
        },
        projectList: {
          url: 'user/getProInfoBySelf',
          columns: [
            {
              title: '项目名称',
              key: 'projectName'
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
                        this.edit(params.row, e)
                      }
                    }
                  }, [h('Icon', {props: {type: 'edit'}, class: {'margin-right-10': true}}), '修改'])
                ]);
              }
            }
          ]
        },
        problemList: {
          url: 'user/getProblemBySelf',
          columns: [
            {
              title: '标题',
              key: 'problemTitle'
            },
            {
              title: '详情',
              key: 'problemDetail'
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
                        this.edit(params.row, e)
                      }
                    }
                  }, [h('Icon', {props: {type: 'edit'}, class: {'margin-right-10': true}}), '修改'])
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
      applyService: function () {
        this.$refs.applyForm.validate((valid) => {
          if (valid) {
            var params = this.applyForm
            this.modalLoading = true
            this.applyPop = false
            // this.$http.post('user/login',params).then((rsp)=>{
            //   this.$Message.success('登陆成功！')
            //   if(rsp.data){
            //     cookie.set(this.consts.ticketKey,rsp.data.token)
            //   }
            //   window.vm.getUserInfo()
            //   this.modalLoading = false
            //   this.loginPop = false
            // },()=>{
            //   this.modalLoading = false
            // })
          }
        });
      }
    },
    created: function () {
      this.initList(this.projectList)
      this.initList(this.problemList)
      this.getSelections('city').then((data) => {
        var map = {}
        data.each((item, index) => {
          map[item.id] = item
        })
        this.map.cityId = map
      })
      window.vm.$refs.header.showBanners = false;
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
    }
  }
</script>
