<template>
  <div>
    <Form ref="form" :model="form" :rules="rule" :label-width="80">
      <FormItem>
        <div><span v-html="toContent(detail.problemDetail)"></span><a class="fc-theme margin-left-10"
                                                                      @click="ask()">追问</a></div>
        <ul class="problem-msg-list">
          <template v-for="msg in detail.newsList">
            <li v-if="msg.newsType==1">
              <Row>
                <Col span="3" class="text-right padding-right-10">
                顾问
                <router-link target="_blank" class="fc-theme margin-left-10" :to="'/adviserDetail/'+msg.replyId">
                  {{msg.replyName}}
                </router-link>
                :
                </Col>
                <Col span="21">
                <span v-html="toContent(msg.newsContent)"></span>
                <a class="fc-theme margin-left-10" @click="ask()">回复</a>
                <span class="float-right">{{msg.createdAt | date('YYYY-MM-DD HH:mm:ss')}}</span>
                </Col>
              </Row>
            </li>
            <li v-if="msg.newsType==0">
              <Row>
                <Col span="3" class="text-right padding-right-10">
                追问:
                </Col>
                <Col span="21">
                <span v-html="toContent(msg.newsContent)"></span>
                <span class="float-right">{{msg.createdAt | date('YYYY-MM-DD HH:mm:ss')}}</span>
                </Col>
              </Row>
            </li>
          </template>
        </ul>
      </FormItem>
      <FormItem prop="newsContent" label="回复消息" v-show="showForm">
        <Input type="textarea" v-model="form.newsContent" placeholder="回复消息" :rows="4" size="large">
        </Input>
      </FormItem>
    </Form>
    <div class="btn-area" style="padding-left:80px;" v-show="showForm">
      <Button class="btn-theme" type="primary" icon="android-send" :loading="loading" @click="submit()">发送</Button>
      <Button :loading="loading" @click="showForm=false">取消</Button>
    </div>
  </div>
</template>
<script type="es6">
  // import {kvText} from '../../../common/utils'
  let config = {
    props: {
      data: Object
    },
    data: function () {
      return {
        showForm: false,
        detail: this.data,
        form: {
          newsContent: '',
          consultantId: '',
          problemId: ''
        },
        rule: {
          newsContent: {required: true, message: '消息不能为空!', trigger: 'blur'}
        },
        selections: {
          businessId: []
        },
        loading: false
      }
    },
    methods: {
      ask: function (consultantId) {
        this.$refs.form.resetFields()
        this.showForm = true
        if (consultantId) {
          this.form.consultantId = consultantId
        } else {
          consultantId = ''
        }
      },
      refresh: function () {
        this.$http.get('problem/queryDetailById', {params: {id: this.detail.id}}).then((rsp) => {
          this.detail = rsp.data
        })
      },
      submit: function () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            var params = this.form
            this.loading = true
            this.$http.post('news/insertNews', params).then((rsp) => {
              this.loading = false
              this.refresh()
              this.showForm = false
            }, () => {
              this.loading = false
            })
          }
        });
      }
    },
    created: function () {
      this.form.problemId = this.data.id
      this.refresh()
    }
  }
  export default config
</script>
