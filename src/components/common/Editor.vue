<template>
  <div>
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>

<script>
import E from "wangeditor";

export default {
  name: "editor",
  props: ['content'],
  data() {
    return {
      editorContent: ""
    };
  },
  watch: {
    content() {
      this.editor.txt.html(this.content)
    }
  },
  methods: {
    getContent: function() {
      alert(this.editorContent);
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editor);
    this.editor.customConfig.onchange = html => {
      console.log(html,'html')
      this.editorContent = html;
      this.$emit('catchData', this.editorContent)
    };
    this.editor.customConfig.menus = [          // 菜单配置
      'head',  // 标题
      'bold',  // 粗体
      'fontSize',  // 字号
      'fontName',  // 字体
      'italic',  // 斜体
      'underline',  // 下划线
      'strikeThrough',  // 删除线
      'foreColor',  // 文字颜色
      'backColor',  // 背景颜色
      'link',  // 插入链接
      'list',  // 列表
      'justify',  // 对齐方式
      'code',  // 插入代码
      'undo',  // 撤销
      'redo'  // 重复
    ]
    this.editor.create();
  }
};
</script>

<style scoped></style>
