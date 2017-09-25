<template>
  <div class="middle page">
    <Breadcrumb>
      <BreadcrumbItem href="/main">首页</BreadcrumbItem>
      <BreadcrumbItem href="/problemMain">问题</BreadcrumbItem>
      <BreadcrumbItem>问题详情</BreadcrumbItem>
    </Breadcrumb>
    <div class="problem-area">
      <h2 class="problem-title">问题标题问题标题问题标题问题标题问题标题问题标题!<span class="margin-left-20 fc-theme fs-l">已解决</span></h2>
      <ul class="problem-detail">
        <li>浏览10次</li>
        <li>回答5次</li>
        <li>董威</li>
        <li>2017-9-27</li>
      </ul>
      <p class="problem-content">问题详情</p>
      <div class="problem-answer">
        <p class="clearfix">
          问题回答<br>
        </p>
        <ul class="problem-answer-detail">
          <li>
            <p>
              追问<br>
              <span class="float-right">2017-9-28</span>
            </p>
          </li>
          <li>
            <p>
              追答<br>
              <span class="float-right">2017-9-28</span>
            </p>
          </li>
          <li>
            <p>
              追问<br>
              <span class="float-right">2017-9-28</span>
            </p>
          </li>
          <li>
            <p>
              追答<br>
              <span class="float-right">2017-9-28</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="problem-adviser">
      <img :src="'imgs/avatar-test.jpeg' | localFile">
      <div class="item-content">
        <label class="item-title">董威</label><br>
        <span>服务类型:商标注册</span>
      </div>
      <router-link to="/adviserDetail/1" class="btn btn-normal btn-theme btn-detail">查看详情</router-link>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {}
    },
    methods: {},
    created: function () {
      window.vm.$refs.header.showBanners = false;
    }
  }
</script>
