<template>
  <div>
    <h4>商品列表</h4>
    <div class="content-bar mgb20 searchBar">
      <div class="searchBar">
        <div class="searchInput">
          <el-input placeholder="请输入商品编号" v-model="itemId">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="searchInput">
          <el-input placeholder="请输入商品名称" v-model="itemName">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="searchInput">
          <el-select v-model="itemState" placeholder="请选择" clearable>
            <el-option
              v-for="item in itemStateList"
              :key="item.id"
              :label="item.stateName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <el-button type="primary" @click="getUserList(1)">确定</el-button>
      </div>
    </div>
    <div class="container">
      <el-table :data="itemList" stripe style="width: 100%">
        <el-table-column prop="itemName" label="等级名称" width="180">
        </el-table-column>
        <el-table-column prop="itemState" label="商品状态">
          <template slot-scope="scope">
            {{ scope.row.itemState == 1 ? "下架" : "商家" }}
          </template>
        </el-table-column>
        <el-table-column prop="carriageExpense" label="运费" width="180">
        </el-table-column>
        <el-table-column prop="stock" label="库存" width="180">
        </el-table-column>
        <el-table-column prop="saleNum" label="销量" width="180">
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <!--<el-button-group>-->
            <el-button
              type="primary"
              size="small"
              @click="hangdleBanLogin(scope.row)"
              >详情</el-button
            >
            <el-button
              type="warning"
              size="small"
              @click="hangdleBanLogin(scope.row)"
              >修改</el-button
            >
            <!--</el-button-group>-->
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
      itemId: "",
      itemName: "",
      itemState: "",
      itemStateList: [
        {
          id:0,
          stateName: '商家'
        },{
          id:1,
          stateName: '下架'
        }
      ],
      itemList: []
    };
  },
  methods: {
    // 翻页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getUserList(val);
    },
    // 允许禁用
    hangdleBanLogin(row) {
      let data = {
        userId: row.id
      };
      let msgText = "";
      if (row.userState == 0) {
        msgText = "是否禁用该用户登陆";
      } else {
        msgText = "是否允许该用户登陆";
      }
      this.$confirm(msgText, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.banLogin(data).then(() => {
            row.userState = row.userState == 1 ? "0" : "1";
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
        })
        .catch(() => {});
    },
    // 获取商品列表
    getItemList(pageNum) {
      let currentPage = pageNum ? pageNum : 1;
      this.pageNum = currentPage;
      let data = {
        itemId: this.itemId,
        itemName: this.itemName,
        itemState: this.itemState,
        pageSize: this.pageSize,
        pageNum: currentPage
      };
      this.$axios.itemList(data).then(res => {
        this.totalNum = res.data.totalNum;
        this.itemList = res.data.itemList;
      });
    },
    // 获取等级列表
    getLevelList() {
      this.$axios.getLevelList().then(res => {
        this.levelList = res.data.levelList;
      });
    }
  },
  created() {
    this.getLevelList();
    this.getItemList(1);
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped></style>
