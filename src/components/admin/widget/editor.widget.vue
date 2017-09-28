<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="editor-area">
        <div class="editor-element" style="text-align:left"></div>
    </div>
</template>

<script type="es6">
    import E from 'wangeditor'
    import 'wangeditor/release/wangEditor.css'
    export default {
      name: 'editor',
      props:['value'],
      data () {
        return {
        }
      },
      methods: {

      },
      mounted() {
        // console.log(this.el)
        // this.$el.querySelector()
        var editor = new E('.editor-element')
        editor.customConfig.onchange = (html) => {
          this.$emit('input',html)
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
        editor.create()
        editor.txt.html(this.value)
      }
    }
</script>

<style scoped>
</style>
