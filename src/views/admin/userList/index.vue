<template>
  <div>
    <h4>管理员列表</h4>
    <div class="content-bar mgb20 searchBar">
      <div class="searchBar">
        <div class="searchInput">
          <el-input placeholder="管理员名称" v-model="username">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="searchInput">
          <el-select v-model="type" placeholder="请选择" clearable>
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <el-button type="primary" @click="girAdminList(1)">确定</el-button>
        <el-button type="primary" @click="getAdminAdd">新增管理员</el-button>
      </div>
    </div>
    <div class="container">
      <el-table :data="adminList" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="account" label="登录帐号"> </el-table-column>
        <el-table-column prop="userName" label="管理员名称"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                type="warning"
                size="small"
                @click="handleEdit(scope.row)"
                >编辑</el-button
              >
            </el-button-group>
            <el-button-group>
              <el-button
                type="primary"
                size="small"
                @click="handleEditPassword(scope.row)"
                >修改密码</el-button
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="userForm" :rules="rules" ref="userForm">
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="account"
        >
          <el-input v-model="userForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
          type="password"
          v-show="!isEdit"
        >
          <el-input v-model="userForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth">
          <el-tree
            :data="authList"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-expanded-keys="[]"
            :default-checked-keys="auth"
            :props="defaultProps"
          >
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAdmin('userForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="dialogPassVisible">
      <el-form :model="userForm" :rules="rules" ref="userForm">
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
          type="password"
        >
          <el-input v-model="userForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth" v-show="false">
          <el-tree
            :data="authList"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-expanded-keys="[]"
            :default-checked-keys="auth"
            :props="defaultProps"
          >
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPassVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAdmin('userForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import md5 from "js-md5";
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
      username: "",
      type: "",
      typeList: [
        {
          id: "1",
          name: "满减"
        },
        {
          id: "2",
          name: "全场通用减免券"
        },
        {
          id: "3",
          name: "商品抵扣券"
        }
      ],
      rules: {
        account: [
          { required: true, message: "请输入管理员名称", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      dialogTitle: "编辑管理员",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      adminList: [],
      userForm: {},
      authList: [
        {
          id: 0,
          label: "会员管理"
        },
        {
          id: 1,
          label: "商品管理"
        },
        {
          id: 2,
          label: "订单管理"
        },
        {
          id: 3,
          label: "绑定样品管理"
        },
        {
          id: 4,
          label: "套餐管理"
        },
        {
          id: 5,
          label: "优惠券列表"
        },
        {
          id: 6,
          label: "设置"
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      auth: [2, 3],
      isEdit: false,
      dialogPassVisible: false
    };
  },
  methods: {
    // 翻页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.girAdminList(val);
    },
    // 修改密码
    handleEditPassword(row) {
      this.isEdit = false;
      this.userForm = JSON.parse(JSON.stringify(row));
      this.userForm.password = ""
      this.auth = this.userForm.authIds;
      this.dialogPassVisible = true;
    },
    handleEdit(row) {
      this.dialogTitle = "编辑管理员";
      this.isEdit = true;
      this.userForm = JSON.parse(JSON.stringify(row));
      this.auth = this.userForm.authIds;
      this.dialogFormVisible = true;
      // this.$refs.tree.setCheckedKeys(this.userForm.authIds)
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    // 新增
    getAdminAdd() {
      this.userForm = {};
      this.isEdit = false;
      this.dialogTitle = "新增管理员";
      this.dialogFormVisible = true;
    },
    // 保存
    saveAdmin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let auth = this.$refs.tree.getCheckedKeys();
          let data = {
            id: this.userForm.id,
            account: this.userForm.account,
            password: this.userForm.password,
            auth: `[${auth}]`
          };
          if (this.isEdit) {
            data.password = this.userForm.password;
          } else {
            data.password = md5(this.userForm.password);
          }
          this.$axios.addAdmin(data).then(res => {
            this.$message.success("操作成功");
            this.dialogFormVisible = false;
            this.dialogPassVisible = false;
            this.girAdminList(1);
          });
        } else {
          return false;
        }
      });
    },
    // 获取用户列表
    girAdminList(pageNum) {
      let currentPage = pageNum ? pageNum : 1;
      this.pageNum = currentPage;
      let data = {
        username: this.username,
        pageSize: this.pageSize,
        pageNum: currentPage
      };
      this.$axios.adminList(data).then(res => {
        this.totalNum = res.data.totalNum;
        this.adminList = res.data.adminList;
      });
    }
  },
  created() {
    this.girAdminList(1);
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.el-input
  width 300px
</style>
