<template>
  <div class="page-container">
    <div class="table-area container">
      <div class="table-top-bar">
        <Button type="primary" class="float-right" @click="add()">添加</Button>
      </div>
      <Table :columns="list.columns" :data="list.dataList" border></Table>
      <div class="table-bottom-bar">
        <Page v-show="list.showPage" :current="list.page" :total="list.total" :page-size="list.pageSize"
              @on-change="refreshList($event)"
              show-elevator></Page>
      </div>
    </div>
    <Modal
      v-model="formPop"
      :title="form.id?'修改':'新增'"
      :mask-closable="false">
      <div class="form-area">
        <Form ref="form" :model="form" :rules="rule">
          <FormItem prop="phone" label="手机号" :label-width="100">
            <Input type="text" v-model="form.phone" placeholder="手机号" size="large">
            </Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" :loading="modalLoading" @click="submit()">{{form.id?'修改':'新增'}}</Button>
      </div>
    </Modal>
    <Modal
      v-model="detailPop"
      title="详情">
      <div class="detail-area">
        <div class="detail-row">
          <label class="col-6">姓名：</label>
          <span>{{detail.actualName}}</span>
        </div>
        <div class="detail-row">
          <label class="col-6">手机号：</label>
          <span>{{detail.phone}}</span>
        </div>
        <!--<div class="detail-row">-->
          <!--<div class="text-left margin-top-10" v-if="detail.applyList">-->
            <!--<label class="col-6">申请人：</label>-->
            <!--<Collapse class="col-18">-->
              <!--<Panel v-for="(item,index) in detail.applyList" :key="index">-->
                <!--{{item.nickName}}-->
                <!--<span class="float-right margin-right-20">{{item.status}}</span>-->
                <!--<p slot="content">-->
                  <!--手机：{{item.phone}}<br/>-->
                  <!--综合评分：{{item.score}}<br/>-->
                  <!--日薪：{{item.dailyWage}}元/天<br/>-->
                  <!--简介：{{item.selfIntroduction}}-->
                  <!--<img-input v-model="item.imgUrls" readOnly></img-input>-->
                <!--</p>-->
              <!--</Panel>-->
            <!--</Collapse>-->
          <!--</div>-->
        <!--</div>-->
      </div>
      <div slot="footer">
        <!--<template v-if="detail.status=='待审核'">-->
          <!--<label class="float-left margin-right-10" style="line-height:30px;">理由:</label>-->
          <!--<Input type="text" class="col-12" v-model="fieldSet.reason"></Input>-->
          <!--<Button type="error" :loading="modalLoading" @click="check(detail,'不通过')">不通过</Button>-->
          <!--<Button type="primary" :loading="modalLoading" @click="check(detail,'审核通过')">通过</Button>-->
        <!--</template>-->
        <template>
          <Button type="primary" @click="detailPop=false">关闭</Button>
          <!--<Button type="primary" @click="check(detail,'待审核')">重置</Button>-->
        </template>
      </div>
    </Modal>
  </div>
</template>
<script type="es6">
  import moduleList from '../../common/moduleList'
  import {dateFormat} from 'vux'
  export default {
    mixins: [moduleList],
    data: function () {
      return {
        status: 0,
        formPop: false,
        detailPop: false,
        modalLoading: false,
        detail:{},
        form: {
          phone: ''
        },
        rule:{
          phone:{required: true, message: '手机号码不能为空！', trigger: 'blur'}
        },
        list: {
          url:'admin/getConsultantList',
          columns: [
            {title: '姓名', key: 'actualName'},
            {title: '手机号', key: 'phone'},
            {
              title: '操作',
              key: 'action',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: (e) => {
                        this.showDetail(params.row, e)
                      }
                    }
                  }, [h('Icon', {props: {type: 'ios-paper-outline'}, class: {'margin-right-10': true}}), '查看详情']),
                  h('Button', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: (e) => {
                        this.remove(params.row, e)
                      }
                    }
                  }, [h('Icon', {props: {type: 'trash-a'}, class: {'margin-right-10': true}}), '删除'])
                ]);
              }
            }
          ]
        }
      }
    },
    methods: {
      add: function () {
        this.$refs.form.resetFields()
        this.resetObject(this.form)
        delete this.form.id
        this.modalLoading = false
        this.pop = true
      },
      showDetail:function(data){
        this.detailPop = true
        this.detail = {}
        this.$http.get(this.url('admin/getConsultantDetail'),{params:{id:data.id}}).then(this.rspHandler((data)=>{
          this.detail = data
        }))
      },
      // edit: function (data) {
      //   this.$refs.form.resetFields()
      //   this.resetObject(this.form)
      //   this.setValues(this.form,data)
      //   this.$set(this.form,'id',data.id)
      //   this.modalLoading = false
      //   this.pop = true
      // },
      submit: function () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.modalLoading = true
            var params = this.form
            this.$http.post(this.url('admin/insertConsultant'),params).then(this.rspHandler((data)=>{
              this.modalLoading = false
              this.pop = false
              this.refreshList(1)
            },()=>{
              this.modalLoading = false
            }))
          }
        });
      },
      remove: function (data) {
        this.$Modal.confirm({
          title: '删除',
          content: '<p>确认是否删除！</p>',
          onOk: () => {
            this.$http.get(this.url('admin/failCity'), {params: {id: data.id}}).then(this.rspHandler(() => {
              this.refreshList(1)
            }))
          }
        });
      }
    },
    created: function () {
      this.initList(this.list)
      this.$on(this.consts.loadedEvent, function () {
        this.refreshList(1)
      })
    }
  }
</script>
