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
      v-model="pop"
      title="修改"
      :mask-closable="false">
      <Form class="middle form-area" ref="form" :model="form" :rules="rule" :label-width="100">
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
          <!--<Select v-model="form.cityId">-->
            <!--<Option v-for="item in selections.cityId" :value="item.id" :key="item.id">{{ item.cityName }}</Option>-->
          <!--</Select>-->
          <city-input v-model="form.cityId"></city-input>
        </FormItem>
        <FormItem label="顾问" prop="consultantId">
          <Select v-model="form.consultantId">
            <Option v-for="item in selections.consultantId" :value="item.id" :key="item.id">{{ item.actualName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="价格" prop="price">
          <Input type="text" v-model="form.price"></Input>
        </FormItem>
        <FormItem label="服务商" prop="serviceId">
          <Select v-model="form.serviceId">
            <Option v-for="item in selections.serviceId" :value="item.id" :key="item.id">{{ item.realName+'-'+item.companyName}}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="modalLoading" @click="submit()">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script type="es6">
  import moduleList from '../../common/moduleList'
  import {dateFormat} from 'vux'
  import {toVL, kvTextAS, kvText} from '../../common/utils'
  import expandRow from './widget/projectExpandRow.widget.vue'
  export default {
    mixins: [moduleList],
    data: function () {
      return {
        status: 0,
        pop: false,
        modalLoading: false,
        businessId: [],
        form: {
          projectName: '',
          businessId: '',
          projectDetail: '',
          cityId: '',
          consultantId: '',
          phone: '',
          projectIndex: '',
          serviceId: '',
          price:''
        },
        rule: {
          projectName: {required: true, message: '项目名称不能为空!'},
          businessId: {required: true, message: '服务类型不能为空!'},
          cityId: {required: true, message: '城市不能为空!'},
          consultantId: {required: true, message: '顾问不能为空!'},
          phone: {required: true, message: '手机号不能为空!'},
          projectDetail: {required: true, message: '项目详情不能为空!'},
          projectIndex: {required: true, message: '项目序列不能为空!'}
        },
        selections: {
          cityId:[],
          businessAll: [],
          businessId: [],
          consultantId: [],
          serviceId: []
        },
        list: {
          url: 'admin/getProjectList',
          columns: [
            {
              type: 'expand',
              width: 50,
              render: (h, params) => {
                return h(expandRow, {
                  props: {
                    data: params.row
                  }
                })
              }
            },
            {title: '项目名称', key: 'projectName'},
            // {title: '手机号', key: 'phone'},
            {
              title: '项目类型', key: 'business', render: (h, params) => {
                return h('span', {}, kvTextAS(params.row.businessId, this.selections.businessAll, 'id', 'businessName').join('/'));
              }
            },
            {
              title: '城市', key: 'phone', render: (h, params) => {
              return h('span', {}, kvTextAS(params.row.cityId, this.selections.cityId,'value','label').join('/'));
            }
            },
            // {title: '项目预算', key: 'budget'},
            // {title: '项目价格', key: 'price'},
            {title: '发布人', key: 'publisherName'},
            {title: '顾问', key: 'consultantName'},
            {title: '服务商', key: 'serviceName'},
            {title: '状态', key: 'status', render: (h, params) => {
              return h('span', {}, this.consts.statusMap.projectStatus[params.row.status]);
            }},
            {
              title: '更新时间', key: 'updatedAt', render: (h, params) => {
              return h('span', {}, dateFormat(params.row.updatedAt, 'YYYY-MM-DD'));
            }
            },
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
      add: function () {
        this.reset()
        this.pop = true
      },
      edit: function (data) {
        this.$refs.form.resetFields()
        this.businessId = []
        this.setValues(this.form, data)
        this.form.id = data.id
        this.businessId = eval('[' + data.businessId + ']')
        this.pop = true
      },
      refresh: function () {
        this.getSelections('business').then((data) => {
          this.selections.businessAll = data
          this.selections.businessId = toVL(data, 'id', 'businessName')
        })
        this.getSelections('city').then((data) => {
          this.selections.cityId = data
        })
        this.$http.get('admin/getConsultantList', {params: {pageSize: 10000, pageNumber: 1}}).then((rsp) => {
          this.selections.consultantId = rsp.data.rows
        })
        this.$http.get('admin/getServiceList').then((rsp) => {
          this.selections.serviceId = rsp.data
        })
      },
      submit: function () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            var params = this.form
            this.modalLoading = true
            this.$http.post('admin/editProjectInfo', params).then(() => {
              this.modalLoading = false
              this.pop = false
              this.refreshList(1)
            }, () => {
              this.modalLoading = false
            })
          }
        });
      },
      // remove: function (data) {
      //   this.$Modal.confirm({
      //     title: '删除',
      //     content: '<p>确认是否删除！</p>',
      //     onOk: () => {
      //     }
      //   });
      // }
    },
    created: function () {
      this.refresh()
      this.initList(this.list)
      this.$on(this.consts.loadedEvent, function () {
        this.refreshList(1)
      })
      this.$watch('businessId', function (v) {
        this.form.businessId = v.toString()
      })
    }
  }
</script>
