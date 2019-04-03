<template>
  <div>
    <h4>会员等级</h4>
    <div class="container mgt10">
      <el-table :data="userLevelList" stripe style="width: 100%">
        <el-table-column prop="levelName" label="等级名称" width="180">
        </el-table-column>
        <el-table-column prop="teamScope" label="团队规模" width="180">
        </el-table-column>
        <el-table-column prop="teamArchitecture" label="团队架构" width="180">
        </el-table-column>
        <el-table-column prop="directlyReward" label="公益补贴" width="180">
        </el-table-column>
        <el-table-column prop="indirectReward" label="推广补贴"> </el-table-column>
        <el-table-column prop="charityFund" label="公益基金"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button
                    type="primary"
                    size="small"
                    @click="hangdleBanLogin(scope.row)"
            >详情</el-button>
            <el-button
                    type="warning"
                    size="small"
                    @click="hangdleBanLogin(scope.row)"
            >修改</el-button>
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
      userLevelList: []
    };
  },
  methods: {
    // 翻页
    handleCurrentChange(val){
      this.pageNum = val
      this.getUserLevelList(val)
    },
    // 获取用户列表
    getUserLevelList(pageNum) {
      let currentPage = pageNum ? pageNum : 1
      this.pageNum = currentPage
      let data = {
        pageSize: this.pageSize,
        pageNum: currentPage
      };
      this.$axios.getUserLevelList(data).then(res => {
        this.totalNum = res.data.totalNum;
        this.userLevelList = res.data.userLevelList;
      });
    },
  },
  created() {
    this.getUserLevelList(1);
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped></style>
