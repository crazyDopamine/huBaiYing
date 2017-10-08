<template>
  <div class="adviser-main page">
    <div class="search-bar">
      <Row class="middle" type="flex">
        <Col span="6" class="padding-right-20">
        <Cascader :data="selections.business" placeholder="服务类型" v-model="list.businessType"></Cascader>
        </Col>
        <Col span="6" class="padding-right-20">
        <Input type="text" v-model="list.params.actualName" placeholder="顾问姓名"></Input>
        </Col>
        <Col span="3" class="padding-right-20">
        <Button class="margin-right-20" type="ghost" icon="ios-search" @click="refreshList(1)">查询</Button>
        </Col>
      </Row>
    </div>
    <div class="adviser-main-list">
      <ul class="middle">
        <li class="adviser-main-item" v-for="(data,index) in list.dataList" :key="index">
          <Avatar icon="person" size="large" :src="'' | localFile"/>
          <div class="item-content">
            <label class="item-title">{{data.actualName}}</label><br>
            <span>服务类型:商标注册</span><br>
            <span>手机号:{{data.phone}}</span>
          </div>
          <router-link to="/adviserDetail/1" class="btn btn-normal btn-theme btn-detail">查看详情</router-link>
        </li>
      </ul>
      <Spin size="large" v-if="list.showLoading"></Spin>
      <div class="empty-view" v-if="!list.showLoading&&list.dataList.length==0">
        <Icon type="ios-box-outline"></Icon><br/>
        无数据
      </div>
      <div class="middle page-bar">
        <Page v-show="list.showPage" :current="list.page" :total="list.total" :page-size="list.pageSize"
              @on-change="refreshList($event)" show-elevator></Page>
      </div>
    </div>
  </div>
</template>
<script>
  import moduleList from '../../common/moduleList'
  import {toVL} from '../../common/utils'
  export default {
    mixins: [moduleList],
    data: function () {
      return {
        list: {
          url: 'consultant/getConsultantShowList',
          businessType: [],
          params: {
            actualName: '',
            businessType:''
          },
        },
        selections: {
          business: []
        }
      }
    },
    methods: {
      refresh: function () {
        this.getSelections('business').then((data) => {
          this.selections.business = toVL(data, 'id', 'businessName')
        })
      }
    },
    created: function () {
      window.vm.$refs.header.showBanners = true;
      this.initList(this.list)
      this.refresh(1)
      this.refreshList()
      this.$watch('list.businessType', function (v) {
        this.list.params.businessType = v.toString()
      })
    }
  }
</script>
