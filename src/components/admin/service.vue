<template>
  <div class="page-container">
    <div class="table-area container">
      <div class="table-top-bar">
        <Button type="primary" class="float-right" @click="add()">添加</Button>
      </div>
      <Table :columns="list.columns" :data="list.dataList" border></Table>
      <div class="table-bottom-bar">
        <Page v-show="list.showPage" :current="list.page" :total="list.total" :page-size="list.pageSize" @on-change="refreshList($event)"
              show-elevator></Page>
      </div>
    </div>
    <Modal
      v-model="pop"
      :title="fieldSet.id?'修改':'新增'"
      :width="1332"
      :mask-closable="false">
      <Form ref="loginForm" :model="fieldSet" :rules="rule" :label-width="100">
        <FormItem prop="user" label="服务名称：">
          <Input type="text" v-model="fieldSet.username" placeholder="服务名称" size="large">
          </Input>
        </FormItem>
        <FormItem prop="user" label="服务logo：">
          <img-input v-model="fieldSet.img"></img-input>
          </Input>
        </FormItem>
        <FormItem prop="password" label="详情：">
          <editor v-model="fieldSet.content"></editor>
          </Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="modalLoading" @click="submit()">{{fieldSet.id?'修改':'新增'}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script type="es6">
  import moduleList from '../../common/moduleList'
  import consts from '../../common/const'
  import {dateFormat} from 'vux'
  export default {
    mixins: [moduleList],
    data: function () {
      return {
        status: 0,
        pop: false,
        modalLoading: false,
        editorOption:consts.quillOptions,
        fieldSet: {
          userName: '',
          passWord:'',
          img:'',
          content:'<p>test</p>'
        },
        rule:{

        },
        list: {
          columns: [
            {title: '账号', key: 'userName'},
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
                  }, [h('Icon', {props: {type: 'edit'},class:{'margin-right-10':true}}), '修改'])
                ]);
              }
            }
          ],
          url: 'admin/getUsers',
        }
      }
    },
    methods: {
      add: function () {
        this.reset()
        this.pop = true
      },
      edit:function(data){
        this.reset()
        this.setValues(data)
        this.fieldSet.passWord = '';
        this.pop = true
      },
      submit: function () {
        console.log(this.fieldSet)
      },
      reset: function () {
        this.fieldSet = {
          userName: '',
          passWord:''
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
        this.refreshList(1)
      })
    }
  }
</script>
