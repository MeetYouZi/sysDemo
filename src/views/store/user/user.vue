<template>
  <div class="contain">
    <div class="mgb20 searchBar">
      职员管理
    </div>
    <div class="content-bar mgb20 searchBar">
      <div class="searchBar">
        <div class="searchInput">
          <el-input placeholder="请输入内容" v-model="searchInput">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <el-button type="primary">确定</el-button>
      </div>
      <div class="addBtn">
        <el-button type="primary" @click="handleAddClick">新增</el-button>
      </div>
    </div>
    <div class="container">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="name" label="入职日期" width="180">
        </el-table-column>
        <el-table-column prop="address" label="联系地址"> </el-table-column>
        <el-table-column prop="address" label="薪酬（月）"> </el-table-column>
        <el-table-column prop="address" label="角色"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" size="small">配置权限</el-button>
              <el-button type="primary" size="small">编辑</el-button>
              <el-button type="info" size="small">详情</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <page-pagination></page-pagination>
    </div>
    <!--新增编辑弹窗-->
    <el-dialog
      :title="EditVisibleTitle"
      :visible.sync="EditVisible"
      width="800"
    >
      <el-form :inline="true" :model="form">
        <el-row :gutter="20">
          <el-col :span="4"
            ><div class="grid-content text-right">姓名</div></el-col
          >
          <el-col :span="6">
            <el-input v-model="form.name"></el-input>
          </el-col>
          <el-col :span="4"
            ><div class="grid-content text-right">性别</div></el-col
          >
          <el-col :span="6">
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4"
            ><div class="grid-content text-right">账号</div></el-col
          >
          <el-col :span="6">
            <el-input v-model="form.name"></el-input>
          </el-col>
          <el-col :span="4"
            ><div class="grid-content text-right">密码</div></el-col
          >
          <el-col :span="6">
            <el-input v-model="form.contact"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4"
            ><div class="grid-content text-right">入职日期</div></el-col
          >
          <el-col :span="6">
            <el-date-picker
              v-model="form.value11"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-col>
          <el-col :span="4"
            ><div class="grid-content text-right">薪资</div></el-col
          >
          <el-col :span="6">
            <el-input v-model="form.contact"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4"
            ><div class="grid-content text-right">电话</div></el-col
          >
          <el-col :span="6">
            <el-input v-model="form.contact"></el-input>
          </el-col>
          <el-col :span="4"
            ><div class="grid-content text-right">身份证号</div></el-col
          >
          <el-col :span="6">
            <el-input v-model="form.contact"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="4"
            ><div class="grid-content text-right">角色</div></el-col
          >
          <el-col :span="6">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="4"
            ><div class="grid-content text-right">头像</div></el-col
          >
          <el-col :span="16">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="4"
            ><div class="grid-content text-right">联系地址</div></el-col
          >
          <el-col :span="14">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.textarea"
            >
            </el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="EditVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import pagePagination from "@/components/common/pagePagination";
export default {
  name: "all",
  components: {
    pagePagination
  },
  data() {
    return {
      searchInput: "",
      value11: "",
      EditVisibleTitle: "编辑",
      formLabelWidth: 120,
      form: {},
      EditVisible: false,
      dialogImageUrl: "",
      dialogVisible: false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleAddClick() {
      this.EditVisible = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.contain
  width 100%
  .searchBar
    display flex
    justify-content space-between
  .el-row
    margin-bottom 20px
.el-input{
  width: 220px
}
.el-select {
  width: 220px
}
</style>
