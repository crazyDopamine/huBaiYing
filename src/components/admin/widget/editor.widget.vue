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
      editor.customConfig.uploadImgServer = url('/upload')
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
      // editor.customConfig.uploadImgHooks = {
      //   before: function (xhr, editor, files) {
      //     // 图片上传之前触发
      //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
      //
      //     // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
      //     // return {
      //     //     prevent: true,
      //     //     msg: '放弃上传'
      //     // }
      //   },
      //   success: function (xhr, editor, result) {
      //     // 图片上传并返回结果，图片插入成功之后触发
      //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      //   },
      //   fail: function (xhr, editor, result) {
      //     // 图片上传并返回结果，但图片插入错误时触发
      //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      //   },
      //   error: function (xhr, editor) {
      //     // 图片上传出错时触发
      //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      //   },
      //   timeout: function (xhr, editor) {
      //     // 图片上传超时时触发
      //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      //   },
      //
      //   // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      //   // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      //   customInsert: function (insertImg, result, editor) {
      //     // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
      //     // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
      //
      //     // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
      //     var url = result.url
      //     insertImg(url)
      //
      //     // result 必须是一个 JSON 格式字符串！！！否则报错
      //   }
      // }
      editor.create()
      editor.txt.html(this.value)
    }
  }
</script>

<style scoped>
</style>
