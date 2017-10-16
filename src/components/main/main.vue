<template>
  <div class="layout-row">
    <div class="title-bar middle">
      <label>
        <Icon class="margin-right-10" type="ios-navigate"></Icon>
        热门服务</label>
      <!--<a class="title-detail float-right margin-left-10">商标注册</a>-->
      <!--<a class="title-detail float-right margin-left-10">商标注册</a>-->
      <!--<a class="title-detail float-right margin-left-10">商标注册</a>-->
    </div>
    <div class="middle" style="margin-bottom: 50px;">
      <Row v-for="(item,itemIndex) in hotBusiness" class="margin-bottom-20" :key="itemIndex">
        <Col span="8" :class="{'padding-right-10':index%3!=2}" v-for="(data,index) in item" :key="index">
        <Card class="hot-service">
          <p slot="title">
            {{data.businessName}}
          </p>
          <template v-for="(item,index) in data.children">
            <div class="fs-s border-bottom padding-bottom-10 margin-bottom-10">{{item.businessName}}</div>
            <ul class="hot-service-item margin-bottom-20">
              <li class="margin-right-20" v-for="(service,index) in item.children" :key="index">
                <router-link :to="'/serviceDetail/'+service.id">{{service.businessName}}</router-link>
              </li>
            </ul>
          </template>
        </Card>
        </Col>
      </Row>
    </div>
    <div class="title-bar middle text-center" style="line-height:30px;padding:20px 0;">
      从呼百应挑选你的专职顾问<br>
      20年的企业经验累积，为您企业发展提供全方位保驾护航
    </div>
    <!--<Tabs class="middle main-adviser-tabs">-->
      <!--<TabPane label="分类1" name="name1">-->
        <div class="main-adviser-area middle">
          <Row class="main-adviser-list">
            <router-link to="/adviserDetail/1">
              <Col span="6">
              <img :src="'imgs/avatar-test.jpeg' | localFile"><br>
              <label>董威</label><br>
              <span>专注撸代码</span>
              </Col>
            </router-link>
            <router-link to="/adviserDetail/1">
              <Col span="6">
              <img :src="'imgs/avatar-test.jpeg' | localFile"><br>
              <label>董威</label><br>
              <span>专注撸代码</span>
              </Col>
            </router-link>
            <router-link to="/adviserDetail/1">
              <Col span="6">
              <img :src="'imgs/avatar-test.jpeg' | localFile"><br>
              <label>董威</label><br>
              <span>专注撸代码</span>
              </Col>
            </router-link>
            <router-link to="/adviserDetail/1">
              <Col span="6">
              <img :src="'imgs/avatar-test.jpeg' | localFile"><br>
              <label>董威</label><br>
              <span>专注撸代码</span>
              </Col>
            </router-link>
          </Row>
        </div>
      <!--</TabPane>-->
    <!--</Tabs>-->
  </div>
</template>
<script type="es6">
  export default {
    data: function () {
      return {
        hotBusiness: []
      }
    },
    methods: {
      refresh: function () {
        this.$http.get('business/getHotBusiness').then((rsp)=> {
          var businessArray = []
          var businessArrayItem = []
          rsp.data.each((item,index)=>{
            if(index%3==0){
              businessArrayItem = []
            }
            businessArrayItem.push(item)
            if(index%3==2||index==rsp.data.length-1){
              businessArray.push(businessArrayItem)
            }
          })
          this.hotBusiness = businessArray
        })
      }
    },
    created: function () {
      window.vm.$refs.header.showBanners = true;
      this.refresh()
    }
  }
</script>
