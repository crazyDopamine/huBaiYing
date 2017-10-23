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
  </div>
</template>
<script type="es6">
  import moduleList from '../../common/moduleList'
  import expandRow from './widget/problemExpandRow.widget.vue'
  import {dateFormat} from 'vux'
  export default {
    mixins: [moduleList],
    data: function () {
      return {
        status: 0,
        pop: false,
        modalLoading: false,
        fieldSet: {
          userName: '',
          passWord: ''
        },
        rule: {
          userName: {
            label: '账号',
            required: true
          },
          passWord: {
            label: '密码',
            required: true
          }
        },
        list: {
          url: 'admin/getProblemList',
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
            {
              title: '标题',
              key: 'problemTitle'
            },
            {
              title: '更新时间', key: 'updatedAt', render: (h, params) => {
                return h('span', {}, dateFormat(params.row.updatedAt, 'YYYY-MM-DD'));
              }
            }
          ]
        }
      }
    },
    methods: {
      submit: function () {
        if (this.validate(true)) {
          var params = this.getValues()
          this.modalLoading = true
          this.$http.post('admin/addUser', params).then(() => {
            this.modalLoading = false
            this.pop = false
            this.refreshList(1)
          })
        }
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
