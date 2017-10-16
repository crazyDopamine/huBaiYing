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
      :title="form.id?'修改':'新增'"
      :width="1350"
      :mask-closable="false">
      <Form ref="form" :model="form" :rules="rule" :label-width="100">
        <FormItem prop="businessName" label="服务名称：">
          <Input type="text" v-model="form.businessName" placeholder="服务名称" size="large">
          </Input>
        </FormItem>
        <FormItem prop="parentId" label="服务类型：">
          <Cascader :data="selections.parentId" placeholder="服务类型" v-model="parentId"></Cascader>
          </Input>
        </FormItem>
        <FormItem prop="businessTitle" label="广告标语：">
          <Input type="text" v-model="form.businessTitle" placeholder="广告标语" size="large">
          </Input>
        </FormItem>
        <FormItem prop="businessHot" label="热门：">
          <Input type="text" v-model="form.businessHot" placeholder="热门指数>=1为热门" size="large">
          </Input>
        </FormItem>
        <FormItem prop="businessImage" label="服务logo：">
          <img-input v-model="form.businessImage" :maxLength="1"></img-input>
          </Input>
        </FormItem>
        <FormItem prop="businessDetail" label="详情：">
          <editor v-model="form.businessDetail"></editor>
          </Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="modalLoading" @click="submit()">{{form.id?'修改':'新增'}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script type="es6">
  import moduleList from '../../common/moduleList'
  import consts from '../../common/const'
  import {dateFormat} from 'vux'
  import {toVL,kvValue} from '../../common/utils'
  export default {
    mixins: [moduleList],
    data: function () {
      return {
        status: 0,
        pop: false,
        modalLoading: false,
        parentId:[],
        form: {
          businessName:'',
          parentId:'',
          businessTitle:'',
          businessImage:'',
          businessDetail:'',
          businessHot:''
        },
        rule:{
          businessName:{required: true, message: '服务名称不能为空！', trigger: 'blur'},
          parentId:{type:'number',required: true, message: '服务类型不能为空！', trigger: 'blur'},
          businessImage:{required: true, message: '服务logo不能为空！', trigger: 'blur'}
        },
        selections:{
          parentId:[],
          parentIdAll:[]
        },
        list: {
          url: 'admin/queryBusinessList',
          columns: [
            {title: '服务名称', key: 'businessName'},
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
                  }, [h('Icon', {props: {type: 'edit'},class:{'margin-right-10':true}}), '修改']),
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
                  }, [h('Icon', {props: {type: 'trash-a'},class:{'margin-right-10':true}}), '删除'])
                ]);
              }
            }
          ]
        }
      }
    },
    methods: {
      add: function () {
        this.resetObject(this.form)
        delete this.form.id
        this.$refs.form.resetFields()
        this.pop = true
      },
      edit:function(data){
        this.resetObject(this.form)
        this.$refs.form.resetFields()
        this.setValues(this.form,data)
        this.form.id = data.id
        if(data.parentId)this.parentId = kvValue(data.parentId,this.selections.parentIdAll,'id','businessName')
        else this.parentId = []
        this.pop = true
      },
      submit: function () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.modalLoading = true
            var params = this.form
            this.$http.post('admin/addOrUpdateBusiness',params).then(()=>{
              this.modalLoading = false
              this.pop = false
              this.refreshList(1)
            },()=>{
              this.modalLoading = false
            })
          }
        });
      },
      remove: function (data) {
        this.$Modal.confirm({
          title: '删除',
          content: '<p>确认是否删除！</p>',
          onOk: () => {
          	this.$http.get('admin/delBusinessById',{params:{id:data.id}}).then(()=>{
              this.refreshList()
            })
          }
        });
      }
    },
    created: function () {
      this.initList(this.list)
      this.getSelections('business').then((data)=>{
        this.selections.parentIdAll = data
      	this.selections.parentId = toVL(data, 'id', 'businessName',2)
      })
      this.$on(this.consts.loadedEvent, function () {
        this.refreshList(1)
      })
      this.$watch('parentId',function(v){
      	if(v.length>0){
      		this.form.parentId = v[v.length-1]
        }else{
      		this.form.parentId = 0
        }
      })
    }
  }
</script>
