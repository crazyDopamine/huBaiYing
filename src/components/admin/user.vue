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
    <!--<Modal-->
    <!--v-model="pop"-->
    <!--:title="fieldSet.id?'修改':'新增'"-->
    <!--:mask-closable="false">-->
    <!--<div class="form-area">-->
    <!--<div class="form-row clearfix">-->
    <!--<label class="col-8">账号：</label>-->
    <!--<Input class="col-16" v-model="fieldSet.userName"></Input>-->
    <!--</div>-->
    <!--<div class="form-row clearfix">-->
    <!--<label class="col-8">密码：</label>-->
    <!--<Input class="col-16" type="password" v-model="fieldSet.passWord"></Input>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div slot="footer">-->
    <!--<Button type="primary" :loading="modalLoading" @click="submit()">{{fieldSet.id?'修改':'新增'}}</Button>-->
    <!--</div>-->
    <!--</Modal>-->
  </div>
</template>
<script type="es6">
  import formValidate from '../../common/formValidate'
  import moduleList from '../../common/moduleList'
  import {dateFormat} from 'vux'
  export default {
    mixins: [moduleList],
    data: function () {
      return {
        status: 0,
        pop: false,
        modalLoading: false,
        selections:{
          cityId:[]
        },
        list: {
          url: 'admin/queryUserList',
          columns: [
            {title: '昵称', key: 'nickName'},
            {title: '姓名', key: 'realName'},
            {title: '手机号', key: 'phone'},
            {
              title: '城市', key: 'phone', render: (h, params) => {
                return h('span', {}, this.selectionValue(params.row.cityId, this.selections.cityId,'cityName'));
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
                  }, [h('Icon', {props: {type: 'ios-paper-outline'}, class: {'margin-right-10': true}}), '查看详情'])
                ]);
              }
            }
          ]
        }
      }
    },
    methods: {
      // add: function () {
      //   this.reset()
      //   this.pop = true
      // },
      // edit:function(data){
      //   this.reset()
      //   this.setValues(data)
      //   this.fieldSet.passWord = '';
      //   this.pop = true
      // },
      showDetail: function (data) {
        console.log(data)
      },
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
      }
    },
    created: function () {
      this.initList(this.list)
      this.$on(this.consts.loadedEvent, function () {
        this.getSelections('city').then((data)=>{
          this.selections.cityId = data
          this.refreshList(1)
        })
      })
    }
  }
</script>
