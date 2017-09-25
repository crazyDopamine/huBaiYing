<template>
  <div class="adviser-main page">
    <div class="search-bar">
      <Row class="middle" type="flex">
        <Col span="6" class="padding-right-20">
        <Cascader :data="selections.city" placeholder="服务类型"></Cascader>
        </Col>
        <Col span="6" class="padding-right-20">
        <Input type="text" v-model="list.params.title" placeholder="顾问姓名"></Input>
        </Col>
        <Col span="3" class="padding-right-20">
        <Button class="margin-right-20" type="ghost" icon="ios-search">查询</Button>
        </Col>
      </Row>
    </div>
    <div class="adviser-main-list">
      <ul class="middle">
        <li class="adviser-main-item">
          <img :src="'imgs/avatar-test.jpeg' | localFile">
          <div class="item-content">
            <label class="item-title">董威</label><br>
            <span>服务类型:商标注册</span>
          </div>
          <router-link to="/adviserDetail/1" class="btn btn-normal btn-theme btn-detail">查看详情</router-link>
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
        list: {
          params: {
            title: ''
          },
        },
        selections: {
          city: [{
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
      }
    },
    methods: {},
    created: function () {
      window.vm.$refs.header.showBanners = true;
    }
  }
</script>
