<template>
  <div class="problem-main">
    <div class="search-bar">
      <Row class="middle" type="flex">
        <Col span="6" class="padding-right-20">
        <Cascader :data="data"></Cascader>
        </Col>
        <Col span="12" class="padding-right-20">
        <Input></Input>
        </Col>
        <Col span="3" class="padding-right-20">
        <Button class="margin-right-20" type="ghost" icon="ios-search">查询</Button>
        </Col>
        <Col span="3" class="text-right">
        <Button type="primary" icon="help">提问</Button>
        </Col>
      </Row>
    </div>
    <div class="problem-main-list">
      <ul class="middle">
        <li class="problem-main-item">
          <router-link class="problem-main-item-title" to="/probleDetail/1">问题标题</router-link>
          <span class="margin-left-20 problem-main-item-status fc-theme">已解决</span>
          <span class="problem-main-item-date float-right">2017-9-17 14：45</span><br>
          <p class="problem-main-item-content">内容</p>
        </li>
        <li class="problem-main-item">
          <router-link class="problem-main-item-title" to="/probleDetail/1">问题标题</router-link>
          <span class="margin-left-20 problem-main-item-status fc-theme">已解决</span>
          <span class="problem-main-item-date float-right">2017-9-17 14：45</span><br>
          <p class="problem-main-item-content">内容</p>
        </li>
        <li class="problem-main-item">
          <router-link class="problem-main-item-title" to="/probleDetail/1">问题标题</router-link>
          <span class="margin-left-20 problem-main-item-status fc-theme">已解决</span>
          <span class="problem-main-item-date float-right">2017-9-17 14：45</span><br>
          <p class="problem-main-item-content">内容</p>
        </li>
      </ul>
      <div class="middle page-bar">
        <Page :total="100" show-elevator></Page>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        data: [{
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        }, {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙',
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园',
                },
                {
                  value: 'shizilin',
                  label: '狮子林',
                }
              ]
            }
          ],
        }]
      }
    },
    methods: {},
    created: function () {
    }
  }
</script>
