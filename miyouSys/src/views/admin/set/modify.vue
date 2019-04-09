<template>
  <div>
    <h4 class="mgb20">修改密码</h4>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="旧密码">
        <el-input type="password" v-model="form.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input type="password" v-model="form.newPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="modify">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import md5 from "js-md5";
export default {
  name: 'modify',
  data() {
    return {
      form: {}
    }
  },
  methods:{
    modify(){
      if(!this.form.oldPassword){
        return this.$message.error('请输入旧密码')
      }
      if(!this.form.newPassword){
        return this.$message.error('请输入新密码')
      }
      let data = {
        oldPassword: md5(this.form.oldPassword),
        newPassword: md5(this.form.newPassword)
      }
      this.$axios.changePassword(data).then(() => {
        this.$message.success('操作成功')
        this.changeToken('');
          this.$router.push({path: '/'})
      })
    },
    ...mapMutations(["changeToken"])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .el-input
    width 260px
</style>
