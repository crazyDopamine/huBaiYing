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
      :title="form.id?'修改':'新增'"
      :mask-closable="false">
      <div class="form-area">
        <Form ref="form" :model="form" :rules="rule">
          <FormItem prop="cityName" label="城市名称" :label-width="100">
            <Input type="text" v-model="form.cityName" placeholder="城市名称" size="large">
            </Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" :loading="modalLoading" @click="submit()">{{form.id?'修改':'新增'}}</Button>
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
        pop: false,
        modalLoading: false,
        form: {
          cityName: '',
          // cityCode: '',
          hotTop: 0
        },
        rule:{
          cityName:{required: true, message: '城市名称不能为空！', trigger: 'blur'}
        },
        list: {
          url:'admin/queryCityList',
          columns: [
            {title: '城市名称', key: 'cityName'},
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
                        this.remove(params.row, e)
                      }
                    }
                  }, [h('Icon', {props: {type: 'trash-a'}, class: {'margin-right-10': true}}), '删除']),
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
        this.$refs.form.resetFields()
        this.resetObject(this.form)
        this.form.hotTop = 0
        delete this.form.id
        this.modalLoading = false
        this.pop = true
      },
      edit: function (data) {
        this.$refs.form.resetFields()
        this.resetObject(this.form)
        this.setValues(this.form,data)
        this.$set(this.form,'id',data.id)
        this.modalLoading = false
        this.pop = true
      },
      submit: function () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.modalLoading = true
            var params = this.form
            this.$http.post(this.url('admin/addOrUpdateCity'),params).then(this.rspHandler((data)=>{
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
