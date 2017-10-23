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
        pop: false,
        modalLoading: false,
        selections: {
          cityId: []
        },
        list: {
          url: 'admin/queryUserList',
          columns: [
            {title: '昵称', key: 'nickName'},
            {title: '姓名', key: 'realName'},
            {title: '手机号', key: 'phone'},
            {
              title: '城市', key: 'phone', render: (h, params) => {
              return h('span', {}, this.selectionValue(params.row.cityId, this.selections.cityId, 'cityName'));
            }
            },
            {title: '用户类型', key: 'type'},
            {
              title: '状态', key: 'status', render: (h, params) => {
                return h('span', {}, this.consts.statusMap[params.row.status]);
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
                var btns = [
                  h('Button', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: (e) => {
                        this.confirmApply(params.row, e)
                      }
                    }
                  }, [h('Icon', {props: {type: 'ios-pricetag'}, class: {'margin-right-10': true}}), '认证为服务商'])
                ]
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
      confirmApply:function(){
        this.$Modal.confirm({
          title: '认证为服务商',
          content: '确认认证为服务商',
          onOk: () => {

          }
        });
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
