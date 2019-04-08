<template>
  <div>
    <h4>会员列表</h4>
    <div class="content-bar mgb20 searchBar">
      <div class="searchBar">
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
        <div class="searchInput">
          <el-select v-model="levelId" placeholder="请选择" clearable>
            <el-option
              v-for="item in levelList"
              :key="item.id"
              :label="item.levelName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <el-button type="primary" @click="getUserList(1)">确定</el-button>
      </div>
    </div>
    <div class="container">
      <el-table :data="userList" stripe style="width: 100%">
        <el-table-column prop="id" label="用户编号" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="180">
        </el-table-column>
        <el-table-column prop="nickName" label="用户昵称" width="180">
        </el-table-column>
        <el-table-column prop="userLevel" label="用户等级" width="180">
        </el-table-column>
        <el-table-column prop="integral" label="账户积分"> </el-table-column>
        <el-table-column prop="balance" label="账户余额"> </el-table-column>
        <el-table-column prop="userState" label="用户状态">
          <template slot-scope="scope">
            {{ scope.row.userState == 1 ? "禁止登陆" : "正常登陆" }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                v-if="scope.row.userState == 1"
                type="primary"
                size="small"
                @click="hangdleBanLogin(scope.row)"
                >允许登陆</el-button
              >
              <el-button
                v-if="scope.row.userState == 0"
                type="danger"
                size="small"
                @click="hangdleBanLogin(scope.row)"
                >禁止登陆</el-button
              >
              <el-button
                type="primary"
                size="small"
                @click="hangdleDetail(scope.row)"
                >详情</el-button
              >
            </el-button-group>
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
    <el-dialog title="详情" :visible.sync="dialogDetailVisible">
      <el-row :gutter="20">
        <el-col :span="4"
          ><div class="grid-content bg-purple text-right">头像</div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple text-left">
          <img width="90px" height="90px" :src="detail.pic"/>
          </div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"
          ><div class="grid-content bg-purple text-right">用户状态</div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple text-left">
          {{detail.userState == 0 ? '正常': '禁止登陆'}}
          </div></el-col
        >
        <el-col :span="4"
          ><div class="grid-content bg-purple text-right">用户等级</div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple text-left">
            {{ detail.userLevel }}
          </div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"
          ><div class="grid-content bg-purple text-right">用户昵称</div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple text-left">
            {{ detail.nickName }}
          </div></el-col
        >
        <el-col :span="4"
          ><div class="grid-content bg-purple text-right">手机号</div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple text-left">
            {{ detail.phone }}
          </div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"
          ><div class="grid-content bg-purple text-right">姓名</div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple text-left">
            {{ detail.realName ? detail.realName : '暂无'}}
          </div></el-col
        >
        <el-col :span="4"
          ><div class="grid-content bg-purple text-right">
          性别
          </div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple text-left">
            {{ detail.sex == "0" ? "女" : "男" }}
          </div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"
          ><div class="grid-content bg-purple text-right">身份证号</div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple text-left">
            {{ detail.identityNumber ? detail.identityNumber : '暂无'}}
          </div></el-col
        >
        <el-col :span="4"
          ><div class="grid-content bg-purple text-right">注册时间</div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple text-left">
            {{ detail.createTime }}
          </div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"
          ><div class="grid-content bg-purple text-right">账户积分</div></el-col
        >
        <el-col :span="18"
          ><div class="grid-content bg-purple text-left">
            {{ detail.integral }}
          </div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"
          ><div class="grid-content bg-purple text-right">账户余额</div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple text-left">
            {{ detail.balance }}
          </div></el-col
        >
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogDetailVisible = false"
          >确 定</el-button
        >
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
      phone: "",
      levelId: "",
      levelList: [],
      userList: [],
      dialogDetailVisible: false,
      detail: {}
    };
  },
  methods: {
    // 翻页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getUserList(val);
    },
    // 详情
    hangdleDetail(row) {
      console.log(row);
      this.detail = row
      this.dialogDetailVisible = true
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
    // 获取用户列表
    getUserList(pageNum) {
      let currentPage = pageNum ? pageNum : 1;
      this.pageNum = currentPage;
      let data = {
        nickName: this.nickName,
        phone: this.phone,
        levelId: this.levelId,
        pageSize: this.pageSize,
        pageNum: currentPage
      };
      this.$axios.getUserList(data).then(res => {
        this.totalNum = res.data.totalNum;
        this.userList = res.data.userList;
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
    this.getUserList(1);
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped></style>
