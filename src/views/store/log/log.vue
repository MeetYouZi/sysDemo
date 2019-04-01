<template>
  <div class="contain">
    <div class="mgb20 searchBar">
      操作日志
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
        <el-button type="primary" @click="handleAddClick">导出</el-button>
      </div>
    </div>
    <div class="container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column property="序号" type="index" width="50">
        </el-table-column>
        <el-table-column property="date" label="操作时间" width="120">
        </el-table-column>
        <el-table-column property="name" label="操作人" width="120">
        </el-table-column>
        <el-table-column property="address" label="操作源"> </el-table-column>
        <el-table-column property="address" label="操作事件"> </el-table-column>
        <el-table-column property="address" label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <page-pagination></page-pagination>
    </div>
    <!--新增供应商-->
    <el-dialog :title="EditVisibleTitle" :visible.sync="AddVisible" width="400">
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
      EditVisibleTitle: "详情",
      AddVisible: false,
      formLabelWidth: 220,
      form: {
        name: ""
      },
      passVisible: false,
      rejectVisible: false,
      EditVisible: false,
      dialogImageUrl: "",
      dialogVisible: false,
      stateItem: 0,
      orderStateList: [
        {
          name: "全部",
          num: "89"
        },
        {
          name: "有未发货商品订单",
          num: "89"
        },
        {
          name: "无未发货商品订单",
          num: "89"
        },
        {
          name: "确认收货订单",
          num: "89"
        }
      ],
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        }
      ]
    };
  },
  methods: {
    addCategory() {
      this.form.formList.push({
        label: "分类标签",
        name: ""
      });
    },
    subCategory(val) {
      let index = val;
      this.form.formList.splice(index, 1);
    },
    // 切换状态
    orderStateClick(val) {
      this.stateItem = val;
    },
    handleAddClick() {
      this.AddVisible = true;
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
