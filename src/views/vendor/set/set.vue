<template>
  <div>
    <div class="mgb20 searchBar">系统设置</div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "set",
  data() {
    return {
      form: {}
    };
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.el-input
  width 260px
</style>
