<template>
  <div class="page-container">
    <div class="table-area container">
      <!--<div class="table-top-bar">-->
      <!--<Button type="primary" class="float-right" @click="add()">添加</Button>-->
      <!--</div>-->
      <Table :columns="list.columns" :data="list.dataList" :loading="list.loading" border></Table>
      <div class="table-bottom-bar">
        <Page v-show="list.showPage" :current="list.page" :total="list.total" :page-size="list.pageSize"
              @on-change="refreshList($event)"
              show-elevator></Page>
      </div>
    </div>
    <Modal v-model="confirmPop" width="360" title="认证为服务商">
      <div>确认认证为服务商?</div>
      <div slot="footer">
        <Button type="text" size="large" :loading="modalLoading" @click="confirmApply(3)">不通过</Button>
        <Button type="primary" class="btn-theme" size="large" :loading="modalLoading" @click="confirmApply(2)">通过
        </Button>
      </div>
    </Modal>
    <Modal v-model="confirmCompanyPop" width="360" title="认证企业">
      <div>确认认证为企业?</div>
      <div slot="footer">
        <Button type="text" size="large" :loading="modalLoading" @click="confirmCompanyApply(3)">不通过</Button>
        <Button type="primary" class="btn-theme" size="large" :loading="modalLoading" @click="confirmCompanyApply(2)">通过
        </Button>
      </div>
    </Modal>
  </div>
</template>
<script type="es6">
  import moduleList from '../../common/moduleList'
  import {dateFormat} from 'vux'
  import {kvTextAS} from '../../common/utils'
  import expandRow from './widget/userExpandRow.widget.vue'
  export default {
    mixins: [moduleList],
    data: function () {
      return {
        status: 0,
        pop: false,
        modalLoading: false,
        confirmPop: false,
        confirmCompanyPop: false,
        currentId: '',
        selections: {
          cityId: []
        },
        list: {
          url: 'admin/queryUserList',
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
            {title: '昵称', key: 'nickName'},
            {title: '姓名', key: 'realName'},
            {title: '手机号', key: 'phone'},
            {
              title: '城市', key: 'phone', render: (h, params) => {
              return h('span', {}, kvTextAS(params.row.cityId, this.selections.cityId, 'value', 'label'));
            }
            },
            {
              title: '用户类型', key: 'serviceProvider', render: (h, params) => {
              var type = params.row.serviceProvider==2?'服务商':'普通用户'
              return h('span', {}, type);
            }
            },
            {
              title: '更新时间', key: 'updatedAt', render: (h, params) => {
              return h('span', {}, dateFormat(params.row.updatedAt, 'YYYY-MM-DD'));
            }
            },

            {
              title: '操作',
              key: 'action',
              render: (h, params) => {
                var btns = []
                if (params.row.serviceProvider == 1) {
                  btns.push(h('Button', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: (e) => {
                        this.showPop(params.row,1, e)
                      }
                    }
                  }, [h('Icon', {props: {type: 'ios-pricetag'}, class: {'margin-right-10': true}}), '服务商认证']))
                }
                if (params.row.companyAuthenticate == 1) {
                  btns.push(h('Button', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: (e) => {
                        this.showPop(params.row,2, e)
                      }
                    }
                  }, [h('Icon', {props: {type: 'ios-pricetag'}, class: {'margin-right-10': true}}), '企业认证']))
                }
                return h('div', btns);
              }
            }
          ]
        }
      }
    },
    methods: {
      submit: function () {
      },
      reset: function () {
        this.fieldSet = {
          userName: '',
          passWord: ''
        }
      },
      remove: function (data) {
        this.$Modal.confirm({
          title: '删除',
          content: '<p>确认是否删除！</p>',
          onOk: () => {
          }
        });
      },
      showPop: function (data, type) {
        if (type == 1) {
          this.confirmPop = true
        } else if (type == 2) {
          this.confirmCompanyPop = true
        }
        this.currentId = data.id
        this.modalLoading = false
      },
      confirmApply: function ( status) {
        this.modalLoading = true
        this.$http.get('admin/authorServiceProvider', {params: {id: this.currentId, status: status}}).then(()=> {
          this.modalLoading = true
          this.confirmPop = false
          this.refreshList()
        })
      },
      confirmCompanyApply: function ( status) {
        this.modalLoading = true
        this.$http.get('admin/authorCompany', {params: {id: this.currentId, status: status}}).then(()=> {
          this.confirmCompanyPop = false
          this.modalLoading = true
          this.refreshList()
        })
      }
    },
    created: function () {
      this.initList(this.list)
      this.$on(this.consts.loadedEvent, function () {
        this.getSelections('city').then((data) => {
          this.selections.cityId = data
          this.refreshList(1)
        })
      })
    }
  }
</script>
