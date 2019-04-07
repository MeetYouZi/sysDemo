<template>
  <div>
    <h4>套餐购买记录</h4>
    <div class="content-bar mgb20 searchBar">
      <div class="searchBar">
        <div class="searchInput">
          <el-input placeholder="请输入用户名" v-model="nickName">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="searchInput">
          <el-input placeholder="请输入资格码" v-model="code">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <el-button type="primary" @click="getBuyPackageRecord(1)">确定</el-button>
      </div>
    </div>
    <div class="container">
      <el-table :data="buyPackageRecordsList" stripe style="width: 100%">
        <el-table-column prop="userId" label="用户编号" width="180">
        </el-table-column>
        <el-table-column prop="nickName" label="用户昵称" width="180">
        </el-table-column>
        <el-table-column prop="packageName" label="套餐名称" width="180">
        </el-table-column>
        <el-table-column prop="amount" label="价格" width="180">
        </el-table-column>
        <el-table-column prop="code" label="资格码" width="180">
        </el-table-column>
        <el-table-column prop="createTime" label="购买时间">
        </el-table-column>
      </el-table>
      <page-pagination
        :total="totalNum"
        :pageNum="pageNum"
        :pageSize="pageSize"
        @handleCurrentChange="handleCurrentChange"
      ></page-pagination>
    </div>
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
      levelList: [],
      buyPackageRecordsList: [],
      packForm: {}
    };
  },
  methods: {
    // 翻页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getBuyPackageRecord(val);
    },
    // 获取列表
    getBuyPackageRecord(pageNum) {
      let currentPage = pageNum ? pageNum : 1;
      this.pageNum = currentPage;
      let data = {
        nickName: this.nickName,
        code: this.code,
        pageSize: this.pageSize,
        pageNum: currentPage
      };
      this.$axios.buyPackageRecord(data).then(res => {
        this.totalNum = res.data.totalNum;
        this.buyPackageRecordsList = res.data.buyPackageRecordsList;
      });
    }
  },
  created() {
    this.getBuyPackageRecord(1);
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
