<template>
  <div class="user-main middle page">
    <Tabs class="margin-top-20">
      <TabPane label="我的项目" icon="ios-paper">
        <Table :columns="list.columns" :data="list.dataList" border></Table>
      </TabPane>
      <TabPane label="我的提问" icon="help">
        <Table :columns="list.columns" :data="list.dataList" border></Table>
      </TabPane>
      <TabPane label="个人信息" icon="android-person">
        <div class="detail-area">
          <div class="detail-row">
            <label>
              姓名：
            </label>
            <span>
              董威
            </span>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import moduleList from '../../common/moduleList'
  export default {
    mixins: [moduleList],
    data: function () {
      return {
      	list:{
          columns:[
            {
              title: '项目名称',
              key: 'name'
            },
            {
              title: '更新时间',
              key: 'updateAt'
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
                  }, [h('Icon', {props: {type: 'edit'},class:{'margin-right-10':true}}), '修改'])
                ]);
              }
            }
          ]
        }

      }
    },
    methods: {},
    created: function () {
      this.initList(this.list)
      window.vm.$refs.header.showBanners = false;
    }
  }
</script>
