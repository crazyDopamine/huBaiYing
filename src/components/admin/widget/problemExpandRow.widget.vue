<template>
  <div>
    <Form ref="form" :model="form" :rules="rule" :label-width="80">
      <FormItem label="问题详情">
        <p>{{detail.problemDetail}}</p>
        <ul>
          <template v-for="msg in detail.newsList">
            <li v-if="msg.newsType==1">
              <Row>
                <Col span="3" class="text-right padding-right-10">
                顾问{{msg.replyName}}:
                </Col>
                <Col span="21">
                <span v-html="toContent(msg.newsContent)"></span>
                <span class="float-right">{{msg.createdAt | date('YYYY-MM-DD HH:mm:ss')}}</span>
                </Col>
              </Row>
            </li>
            <li v-if="msg.newsType==0">
              <Row>
                <Col span="3" class="text-right padding-right-10">
                {{detail.createName}}追问:
                </Col>
                <Col span="21">
                <span v-html="toContent(msg.newsContent)"></span>
                <span class="float-right">{{msg.createdAt | date('YYYY-MM-DD HH:mm:ss')}}</span>
                </Col>
              </Row>
            </li>
          </template>
          <!--<template v-for="msg in detail.newsList">-->
            <!--<li v-if="msg.newsType==1">顾问 {{msg.replyName}}:{{msg.newsContent}}</li>-->
            <!--<li v-if="msg.newsType==0">{{detail.createName}} 追问:{{msg.newsContent}}</li>-->
          <!--</template>-->
        </ul>
      </FormItem>
      <FormItem prop="newsContent" label="回复消息" v-show="showForm">
        <Input type="textarea" v-model="form.newsContent" placeholder="回复消息" :rows="4" size="large">
        </Input>
      </FormItem>
    </Form>
    <div class="btn-area" style="padding-left:80px;" v-show="showForm">
      <Button class="btn-theme" type="primary" icon="android-send" :loading="loading" @click="submit()">发送</Button>
      <!--<Button :loading="loading" @click="showForm=false">取消</Button>-->
    </div>
  </div>
</template>
<script type="es6">
  let config = {
    props: {
      data: Object
    },
    data: function () {
      return {
        showForm:true,
        detail:this.data,
        form: {
          newsContent: '',
          problemId:this.data.id
        },
        rule: {
          newsContent: {required: true, message: '消息不能为空!'}
        },
        loading: false
      }
    },
    methods: {
      answer:function(){
        this.$refs.form.resetFields()
        this.showForm = true
      },
      refresh:function(){
        this.$http.get('admin/queryDetailById',{params:{id:this.data.id}}).then((rsp)=>{
          this.detail = rsp.data
        })
      },
      submit: function () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            var params = this.form
            this.loading = true
            this.$http.post('admin/insertNews',params).then((rsp)=>{
              this.loading = false
              this.$refs.form.resetFields()
              this.resetObject(this.form)
              this.refresh()
              this.showForm = false
            },()=>{
              this.loading = false
            })
          }
        });
      },
    },
    created:function(){
      this.refresh()
    }
  }
  export default config
</script>
