<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="editor-area" style="width:1222px;">
    <div class="editor-element" style="text-align:left"></div>
  </div>
</template>

<script type="es6">
  import E from 'wangeditor'
  import 'wangeditor/release/wangEditor.css'
  import {cookie} from 'vux'
  import {url} from '../../../common/utils'
  export default {
    name: 'editor',
    props: ['value'],
    data () {
      return {}
    },
    methods: {},
    mounted() {
      var editor = new E('.editor-element')
      editor.customConfig.onchange = (html) => {
        this.$emit('input', html)
      }
      this.$watch('value',function(v){
        editor.txt.html(this.value)
      })
      editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'code',  // 插入代码
        'undo',  // 撤销
        'redo',  // 重复
        'emoticon',  // 表情
        'table',  // 表格
        'link',  // 插入链接
        'image',  // 插入图片
        'video',  // 插入视频
      ];
      editor.customConfig.uploadImgServer = url('admin/multiUpload')
      editor.customConfig.uploadImgMaxLength = 10
      editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024
      editor.customConfig.uploadImgParams = {}
      var headers = {}
      var ticket = cookie.get(this.consts.adminTicketKey)
      if (ticket) {
        headers[this.consts.adminTicketKey] = ticket
      }
      editor.customConfig.uploadImgHeaders = headers
      editor.customConfig.withCredentials = true
      editor.customConfig.customAlert = (info)=> {
        this.$Message.info(info)
      }
      editor.create()
      editor.txt.html(this.value)
    }
  }
</script>

<style scoped>
</style>
