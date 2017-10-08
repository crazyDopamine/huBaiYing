<template>
  <div class="user-main middle page">
    <Tabs class="margin-top-20" v-model="tab">
      <TabPane label="我的项目" icon="ios-paper">
        <Table :columns="projectList.columns" :data="projectList.dataList" border></Table>
        <div class="middle page-bar">
          <Page v-show="projectList.showPage" :current="projectList.page" :total="projectList.total"
                :page-size="projectList.pageSize"
                @on-change="refreshList($event,projectList)" show-elevator></Page>
        </div>
      </TabPane>
      <TabPane label="我的提问" icon="help">
        <Table :columns="problemList.columns" :data="problemList.dataList" border></Table>
        <div class="middle page-bar">
          <Page v-show="problemList.showPage" :current="problemList.page" :total="problemList.total"
                :page-size="problemList.pageSize"
                @on-change="refreshList($event,problemList)" show-elevator></Page>
        </div>
      </TabPane>
      <TabPane label="个人信息" icon="android-person">
        <div class="detail-area">
          <div class="detail-row">
            <label>姓名：</label><span>{{userInfo.nickName}}</span>
          </div>
          <div class="detail-row">
            <label>手机号：</label><span>{{userInfo.phone}}</span>
          </div>
          <div class="detail-row">
            <label>城市：</label><span>{{userInfo.cityId | selections(map.cityId, 'cityName')}}</span>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import moduleList from '../../common/moduleList'
  import {loadedMixins} from '../../common/mixins'
  import {dateFormat} from 'vux'
  export default {
    mixins: [moduleList, loadedMixins],
    data: function () {
      return {
        tab: 0,
        map: {
          cityId: {}
        },
        projectList: {
          url: 'user/getProInfoBySelf',
          columns: [
            {
              title: '项目名称',
              key: 'projectName'
            },
//            {
//              title: '详情',
//              key: 'projectDetail'
//            },
            {
              title: '更新时间', key: 'updatedAt', render: (h, params) => {
                return h('span', {}, dateFormat(params.row.updatedAt, 'YYYY-MM-DD'));
              }
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
                  }, [h('Icon', {props: {type: 'edit'}, class: {'margin-right-10': true}}), '修改'])
                ]);
              }
            }
          ]
        },
        problemList: {
          url: 'user/getProblemBySelf',
          columns: [
            {
              title: '标题',
              key: 'problemTitle'
            },
            {
              title: '详情',
              key: 'problemDetail'
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
                  }, [h('Icon', {props: {type: 'edit'}, class: {'margin-right-10': true}}), '修改'])
                ]);
              }
            }
          ]
        }

      }
    },
    methods: {},
    created: function () {
      this.initList(this.projectList)
      this.initList(this.problemList)
      this.getSelections('city').then((data) => {
        var map = {}
        data.each((item, index) => {
          map[item.id] = item
        })
        this.map.cityId = map
      })
      window.vm.$refs.header.showBanners = false;
      this.$on(this.consts.loadedEvent, function () {
        if (this.tab === 0) {
          this.refreshList(1, this.projectList)
        } else if (this.tab === 1) {
          this.refreshList(1, this.problemList)
        }
      })
      this.$watch('tab', function (v) {
        if (this.tab === 0) {
          this.refreshList(1, this.projectList)
        } else if (this.tab === 1) {
          this.refreshList(1, this.problemList)
        }
      })
    }
  }
</script>
