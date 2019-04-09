<template>
  <div>
    <h4>积分列表</h4>
    <div class="content-bar mgb20 searchBar">
      <div class="searchBar">
        <div class="searchInput">
          <el-input placeholder="请输入用户id" v-model="userId">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="searchInput">
          <el-input placeholder="请输入昵称" v-model="nickName">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="searchInput">
          <el-input placeholder="请输入手机号" max-length="11" v-model="phone">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <el-button type="primary" @click="getRecordList(1)">确定</el-button>
      </div>
    </div>
    <div class="container">
      <el-table :data="integralRecordList" stripe style="width: 100%">
        <el-table-column prop="userId" label="用户编号" width="180">
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="180">
        </el-table-column>
        <el-table-column prop="amount" label="积分" width="180">
        </el-table-column>
        <el-table-column prop="operDesc" label="说明"> </el-table-column>
        <el-table-column prop="resourceType" label="来源">
          <template slot-scope="scope">
            {{ scope.row.resourceType == 1 ? "下级购买商品返佣" : "推荐用户" }}
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
      phone: "",
      userId: "",
      integralRecordList: []
    };
  },
  methods: {
    // 翻页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getRecordList(val);
    },
    // 获取用户列表
    getRecordList(pageNum) {
      let currentPage = pageNum ? pageNum : 1;
      this.pageNum = currentPage;
      let data = {
        userId: this.userId,
        nickName: this.nickName,
        phone: this.phone,
        pageSize: this.pageSize,
        pageNum: currentPage
      };
      this.$axios.integralRecordList(data).then(res => {
        this.totalNum = res.data.totalNum;
        this.integralRecordList = res.data.integralRecordList;
      });
    },
  },
  created() {
    this.getRecordList(1);
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped></style>
