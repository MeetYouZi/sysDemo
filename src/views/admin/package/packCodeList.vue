<template>
  <div>
    <h4>资格码列表</h4>
    <div class="content-bar mgb20 searchBar">
      <div class="searchBar">
        <div class="searchInput">
          <el-input placeholder="请输入资格码" v-model="code">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <el-button type="primary" @click="getPackageCodeList(1)"
          >确定</el-button
        >
        <el-button type="primary" @click="openCreateCode"
        >生成资格码</el-button
        >
      </div>
    </div>
    <div class="container">
      <el-table :data="packageCodeList" stripe style="width: 100%">
        <el-table-column prop="code" label="资格码">
        </el-table-column>
        <el-table-column prop="useState" label="资格码状态">
          <template slot-scope="scope">
            {{scope.row.useState == 1 ? '已使用' : '未使用'}}
          </template>
        </el-table-column>
        <el-table-column prop="user" label="使用用户信息">
          <template slot-scope="scope">
            <span v-if="scope.row.useState == 1">{{scope.row.user.nickName}}</span>
            <span v-if="scope.row.useState == 0">/</span>
          </template>
        </el-table-column>
        <el-table-column prop="useTime" label="使用时间" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.useTime != null && scope.row.useTime  ">{{scope.row.useTime}}</span>
            <span v-if="scope.row.useTime == null">/</span>
          </template>
        </el-table-column>
      </el-table>
      <page-pagination
        :total="totalNum"
        :pageNum="pageNum"
        :pageSize="pageSize"
        @handleCurrentChange="handleCurrentChange"
      ></page-pagination>
    </div>
    <el-dialog title="生成资格码" :visible.sync="dialogFormVisible" width="600px">
      <el-form>
        <el-form-item label="资格码数" :label-width="formLabelWidth">
          <el-input placeholder="请输入资格码数" v-model="num" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createCode">生成资格码</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagePagination from "@/components/common/pagePagination";
export default {
  name: "membersList",
  components: {
    pagePagination
  },
  data() {
    return {
      totalNum: 0,
      pageNum: 1,
      pageSize: 15,
      nickName: "",
      code: "",
      levelId: "",
      num: "",
      levelList: [],
      packageCodeList: [],
      packForm: {},
      dialogFormVisible: false,
      formLabelWidth: '120px'
    };
  },
  methods: {
    // 翻页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getPackageCodeList(val);
    },
    openCreateCode(){
      this.dialogFormVisible = true
      this.num = ''
    },
    createCode(){
      if(!this.num){
        return this.$message.error('请输入资格码数')
      }
      let data = {
        num: this.num
      }
      this.$axios.generateCode(data).then(() => {
        this.$message.success('资格码生成成功')
        this.dialogFormVisible = false
        this.getPackageCodeList(1);
      });
    },
    // 获取列表
    getPackageCodeList(pageNum) {
      let currentPage = pageNum ? pageNum : 1;
      this.pageNum = currentPage;
      let data = {
        nickName: this.nickName,
        code: this.code,
        pageSize: this.pageSize,
        pageNum: currentPage
      };
      this.$axios.packageCodeList(data).then(res => {
        this.totalNum = res.data.totalNum;
        this.packageCodeList = res.data.packageCodeList;
      });
    }
  },
  created() {
    this.getPackageCodeList(1);
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.addBar
  display flex
  justify-content flex-end
  align-items center
.el-input
  width 200px
</style>
