<template>
  <div class="middle page">
    <Breadcrumb>
      <BreadcrumbItem href="/main">首页</BreadcrumbItem>
      <BreadcrumbItem href="/problemMain">问题</BreadcrumbItem>
      <BreadcrumbItem>问题详情</BreadcrumbItem>
    </Breadcrumb>
    <div class="problem-area">
      <h2 class="problem-title">{{detail.problemTitle}}<span class="margin-left-20 fc-theme fs-l">已解决</span><br>
        <span class="fs-m">工商记账,工商注册</span>
      </h2>
      <ul class="problem-detail">
        <li>浏览10次</li>
        <li>回答5次</li>
        <li>董威</li>
        <li>2017-9-27</li>
      </ul>
      <p class="problem-content">{{detail.problemDetail}}</p>
      <div class="problem-answer">
        <p class="clearfix">
          问题回答<br>
        </p>
        <ul class="problem-answer-detail">
          <template v-for="(msg,index) in detail.newsList">
            <li v-if="msg.newsType==1">顾问 {{msg.consultantName}}:{{msg.newsContent}}<br><span class="float-right">2017-9-28</span></li>
            <li v-if="msg.newsType==0">{{detail.createName}} 追问:{{msg.newsContent}}<br><span class="float-right">2017-9-28</span></li>
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
  export default {
    data: function () {
      return {
        detail:{}
      }
    },
    methods: {
    	refresh:function(){
    		if(this.$route.params.id){
    			this.$http.get('problem/queryDetailById',{params:{id:this.$route.params.id}}).then((rsp)=>{
    				this.detail = rsp.data
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
