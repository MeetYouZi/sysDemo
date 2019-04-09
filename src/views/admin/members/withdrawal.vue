<<<<<<< HEAD
<template>
  <div>
    <h4>用户提现列表</h4>
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
        <el-button type="primary" @click="getApplyList(1)">确定</el-button>
      </div>
    </div>
    <div class="container">
      <el-table :data="withdrawApplyList" stripe style="width: 100%">
        <el-table-column prop="userId" label="用户编号" width="180">
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="180">
        </el-table-column>
        <el-table-column prop="amount" label="金额" width="180">
        </el-table-column>
        <!--<el-table-column prop="withdrawState" label="审核状态">
          <template slot-scope="scope">
            <span v-if="scope.row.withdrawState == 0">待审核</span>
            <span v-if="scope.row.withdrawState == 1">审核通过</span>
            <span v-if="scope.row.withdrawState == 2">审核不通过</span>
          </template>
        </el-table-column>-->
        <el-table-column prop="handleState" label="处理状态">
          <template slot-scope="scope">
            <span v-if="scope.row.handleState == 0">未处理</span>
            <span v-if="scope.row.handleState == 1">已处理</span>
            <span v-if="scope.row.handleState == 2">已拒绝</span>
          </template>
        </el-table-column>
        <el-table-column prop="handleTime" label="处理时间"> </el-table-column>
        <el-table-column fixed="right" label="处理" width="300">
          <template slot-scope="scope">
            <el-button
                    type="primary"
                    size="small"
                    @click="hangdleDispose(scope.row)"
            >处理</el-button>
            <el-button
                    type="danger"
                    size="small"
                    @click="hangdleEdit(scope.row)"
            >拒绝</el-button>
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
    <el-dialog title="拒绝处理" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="拒绝原因" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.reason" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClickPass">确 定</el-button>
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
      userId: "",
      formLabelWidth: '120px',
      dialogFormVisible: false,
      withdrawApplyList: [],
      form: {}
    };
  },
  methods: {
    //拒绝
    hangdleEdit(row){
      this.form.id = row.id
      this.dialogFormVisible = true
    },
    handleClickPass(){
      let data = {
        id: this.form.id,
        handleResult: 2,
        remark: this.form.remark,
        reason: this.form.reason
      }
      this.handleWithdraw(data)
    },
    // 处理操作
    hangdleDispose(row){
      let data = {
        id: row.id,
        handleResult: 1,
      }
      let msgText = '确定同意该用户提现吗？'
      this.$confirm(msgText, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleWithdraw(data)
      }).catch(() => {

      });
    },
    handleWithdraw(data){
      this.$axios.handleWithdraw(data).then( () =>{
        this.getApplyList(1)
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '操作成功!'
        });
      })
    },
    // 翻页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getApplyList(val);
    },
    // 获取用户列表
    getApplyList(pageNum) {
      let currentPage = pageNum ? pageNum : 1;
      this.pageNum = currentPage;
      let data = {
        userId: this.userId,
        nickName: this.nickName,
        phone: this.phone,
        pageSize: this.pageSize,
        pageNum: currentPage
      };
      this.$axios.withdrawApplyList(data).then(res => {
        this.totalNum = res.data.totalNum;
        this.withdrawApplyList = res.data.withdrawApplyList;
      });
    }
  },
  created() {
    this.getApplyList(1);
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped></style>
=======
<template>
  <div>
    <h4>用户提现列表</h4>
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
        <el-button type="primary" @click="getApplyList(1)">确定</el-button>
      </div>
    </div>
    <div class="container">
      <el-table :data="withdrawApplyList" stripe style="width: 100%">
        <el-table-column prop="userId" label="用户编号" width="180">
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="180">
        </el-table-column>
        <el-table-column prop="amount" label="金额" width="180">
        </el-table-column>
        <!--<el-table-column prop="withdrawState" label="审核状态">
          <template slot-scope="scope">
            <span v-if="scope.row.withdrawState == 0">待审核</span>
            <span v-if="scope.row.withdrawState == 1">审核通过</span>
            <span v-if="scope.row.withdrawState == 2">审核不通过</span>
          </template>
        </el-table-column>-->
        <el-table-column prop="handleState" label="处理状态">
          <template slot-scope="scope">
            <span v-if="scope.row.handleState == 0">未处理</span>
            <span v-if="scope.row.handleState == 1">已处理</span>
            <span v-if="scope.row.handleState == 2">已拒绝</span>
          </template>
        </el-table-column>
        <el-table-column prop="handleTime" label="处理时间"> </el-table-column>
        <el-table-column fixed="right" label="处理" width="300">
          <template slot-scope="scope">
            <el-button
                    type="primary"
                    size="small"
                    @click="hangdleDispose(scope.row)"
            >处理</el-button>
            <el-button
                    type="danger"
                    size="small"
                    @click="hangdleEdit(scope.row)"
            >拒绝</el-button>
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
    <el-dialog title="拒绝处理" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="拒绝原因" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.reason" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClickPass">确 定</el-button>
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
      userId: "",
      formLabelWidth: '120px',
      dialogFormVisible: false,
      withdrawApplyList: [],
      form: {}
    };
  },
  methods: {
    //拒绝
    hangdleEdit(row){
      this.form.id = row.id
      this.dialogFormVisible = true
    },
    handleClickPass(){
      let data = {
        id: this.form.id,
        handleResult: 2,
        remark: this.form.remark,
        reason: this.form.reason
      }
      this.handleWithdraw(data)
    },
    // 处理操作
    hangdleDispose(row){
      let data = {
        id: row.id,
        handleResult: 1,
      }
      let msgText = '确定同意该用户提现吗？'
      this.$confirm(msgText, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleWithdraw(data)
      }).catch(() => {

      });
    },
    handleWithdraw(data){
      this.$axios.handleWithdraw(data).then( () =>{
        this.getApplyList(1)
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '操作成功!'
        });
      })
    },
    // 翻页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getApplyList(val);
    },
    // 获取用户列表
    getApplyList(pageNum) {
      let currentPage = pageNum ? pageNum : 1;
      this.pageNum = currentPage;
      let data = {
        userId: this.userId,
        nickName: this.nickName,
        phone: this.phone,
        pageSize: this.pageSize,
        pageNum: currentPage
      };
      this.$axios.withdrawApplyList(data).then(res => {
        this.totalNum = res.data.totalNum;
        this.withdrawApplyList = res.data.withdrawApplyList;
      });
    }
  },
  created() {
    this.getApplyList(1);
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped></style>
>>>>>>> 4a41ad2eabf3f55336469c6c4d9dc9a59033ec45
