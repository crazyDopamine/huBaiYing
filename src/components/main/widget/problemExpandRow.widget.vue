<template>
  <div>
    <Form ref="form" :model="form" :rules="rule" :label-width="80">
      <FormItem label="问题详情"><a class="fc-theme margin-left-10" @click="ask()">追问</a>
        <p>{{detail.problemDetail}}</p>
        <ul>
          <template v-for="msg in detail.newsList">
            <li v-if="msg.newsType==1">顾问 {{msg.consultantName}}:{{msg.newsContent}}<a class="fc-theme margin-left-10" @click="ask()">回复</a></li>
            <li v-if="msg.newsType==0">追问:{{msg.newsContent}}</li>
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
  let config = {
    props: {
      data: Object
    },
    data: function () {
      return {
        showForm:false,
        detail:this.data,
        form: {
          newsContent: '',
          consultantId:'',
          problemId:''
        },
        rule: {
          newsContent: {required: true, message: '消息不能为空!', trigger: 'blur'}
        },
        loading: false
      }
    },
    methods: {
      ask:function(consultantId){
        this.showForm = true
        if(consultantId){
          this.form.consultantId = consultantId
        }else {
          consultantId = ''
        }
      },
      refresh:function(){
        this.$http.get('problem/queryDetailById',{params:{id:this.detail.id}}).then((rsp)=>{
          this.detail = rsp.data
        })
      },
      submit: function () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            var params = this.form
            this.loading = true
            this.$http.post('news/insertNews',params).then((rsp)=>{
              this.loading = false
              this.refresh()
            },()=>{
              this.loading = false
            })
          }
        });
      }
    },
    created:function(){
      this.form.problemId = this.data.id
      this.refresh()
    }
  }
  export default config
</script>
