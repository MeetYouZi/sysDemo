<template>
  <div class="contain">
    <div class="mgb20 searchBar">
      商品管理
    </div>
    <div class="content-bar mgb20 searchBar">
      <div class="searchBar">
        <div class="searchInput">
          <el-input placeholder="请输入内容" v-model="searchInput">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="searchInput">
          <el-select v-model="form.value4" clearable placeholder="所有状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="searchInput">
          <el-select
            v-model="form.value4"
            clearable
            placeholder="是否在首页显示"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <el-button type="primary">确定</el-button>
      </div>
      <div class="addBtn">
        <el-button type="primary" @click="handleAddClick">新增</el-button>
        <el-button type="primary" @click="handleSetClick">批量设置</el-button>
      </div>
    </div>
    <div class="container">
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="商品">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="货号" width="120">
        </el-table-column>
        <el-table-column prop="address" label="价格"> </el-table-column>
        <el-table-column prop="address" label="商品分类"> </el-table-column>
        <el-table-column prop="address" label="月销售"> </el-table-column>
        <el-table-column prop="address" label="库存"> </el-table-column>
        <el-table-column prop="address" label="状态"> </el-table-column>
        <el-table-column prop="address" label="起购数"> </el-table-column>
        <el-table-column width="300" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <!--<el-button type="primary" size="small">配置权限</el-button>-->
              <el-button type="primary" size="small">编辑</el-button>
              <el-button type="info" size="small">详情</el-button>
              <el-button type="danger" size="small">删除</el-button>
              <el-button type="primary" @click="" size="small"
                >设置库存预计</el-button
              >
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
      width="400"
    >
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="类目名称">
          <el-input v-model="form.name" placeholder="类目名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addCategory"
            >添加分类标签</el-button
          >
        </el-form-item>
        <div v-for="(item, index) in form.formList" :key="index">
          <el-form-item :label="item.label">
            <el-input
              v-model="item.name"
              placeholder="请输入分类标签"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="danger"
              v-if="form.formList.length > 1"
              @click="subCategory(index)"
              >删除分类</el-button
            >
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="EditVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 批量设置-->
    <el-dialog title="收货地址" :visible.sync="dialogSetVisible">
      <el-form :model="form">
        <el-form-item label="库存预警" :label-width="formLabelWidth">
          <el-switch
            v-model="form.value2"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="请输入预警值" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入预警值"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSetVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSetVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import pagePagination from "@/components/common/pagePagination";
export default {
  name: "category",
  components: {
    pagePagination
  },
  data() {
    return {
      searchInput: "",
      value11: "",
      EditVisibleTitle: "编辑",
      formLabelWidth: 120,
      form: {
        name: "",
        formList: [
          {
            label: "分类标签",
            name: ""
          }
        ]
      },
      EditVisible: false,
      dialogSetVisible: false,
      dialogImageUrl: "",
      dialogVisible: false,
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      tableData3: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    // 全选
    handleSelectionChange(val) {
      console.log(val, "val");
      this.multipleSelection = val;
    },
    handleSetClick() {
      this.dialogSetVisible = true;
    },
    // 切换状态
    orderStateClick(val) {
      this.stateItem = val;
    },
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
  .el-input
    width 220px
  .el-select
    width 220px
  .stateBar
    display flex
    align-items center
    justify-content space-between
    .stateItem
      padding 0 15px
      line-height 40px
      &.active
        color #f53800
        border-bottom 2px solid #f53800
</style>
