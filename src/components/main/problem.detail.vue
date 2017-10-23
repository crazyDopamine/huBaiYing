<template>
  <div class="middle page">
    <Breadcrumb>
      <BreadcrumbItem href="/main">首页</BreadcrumbItem>
      <BreadcrumbItem href="/problemMain">问题</BreadcrumbItem>
      <BreadcrumbItem>问题详情</BreadcrumbItem>
    </Breadcrumb>
    <div class="problem-area">
      <h2 class="problem-title">{{detail.problemTitle}}<span class="margin-left-20 fc-theme fs-l">已解决</span><br>
        <span class="fs-m">{{detail.businessName}}</span>
      </h2>
      <ul class="problem-detail">
        <li>浏览10次</li>
        <li>回答5次</li>
        <li>{{detail.createName}}</li>
        <li>{{detail.createdAt | date('YYYY-MM-DD HH:mm:ss')}}</li>
      </ul>
      <p class="problem-content">{{detail.problemDetail}}</p>
      <div class="problem-answer">
        <p class="clearfix">
          问题回答<br>
        </p>
        <ul class="problem-answer-detail">
          <template v-for="(msg,index) in detail.newsList">
            <li v-if="msg.newsType==1">顾问 {{msg.consultantName}}:{{msg.newsContent}}<br><span class="float-right">{{msg.createdAt | date('YYYY-MM-DD HH:mm:ss')}}</span></li>
            <li v-if="msg.newsType==0">{{detail.createName}} 追问:{{msg.newsContent}}<br><span class="float-right">{{msg.createdAt | date('YYYY-MM-DD HH:mm:ss')}}</span></li>
          </template>
        </ul>
      </div>
    </div>
    <!--<div class="problem-adviser">-->
      <!--<img :src="'imgs/avatar-test.jpeg' | localFile">-->
      <!--<div class="item-content">-->
        <!--<label class="item-title">董威</label><br>-->
        <!--<span>服务类型:商标注册</span>-->
      <!--</div>-->
      <!--<router-link to="/adviserDetail/1" class="btn btn-normal btn-theme btn-detail">查看详情</router-link>-->
    <!--</div>-->
  </div>
</template>
<script type="es6">
  import {kvText} from '../../common/utils'
  export default {
    data: function () {
      return {
        detail:{},
        selections:{
          businessId:[]
        }
      }
    },
    methods: {
    	refresh:function(){
    		if(this.$route.params.id){
          this.getSelections('business').then((data) => {
            this.selections.businessId = data
            this.$http.get('problem/queryDetailById',{params:{id:this.$route.params.id}}).then((rsp)=>{
              this.detail = rsp.data
              var businessId = eval('['+rsp.data.businessId+']')
              businessId = businessId[businessId.length-1]
              this.detail.businessName = kvText(businessId,this.selections.businessId,'id','businessName').join('/')
            })
          })
        }
      }
    },
    created: function () {
      window.vm.$refs.header.showBanners = false;
      this.refresh()
    }
  }
</script>
