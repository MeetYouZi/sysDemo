<template>
  <div class="contain">
    <div class="mgb20 searchBar">
      门店财务支出
    </div>
    <div class="content-bar mgb20 searchBar">
      <div class="searchBar">
        <div class="searchInput">
          <el-input placeholder="请输入内容" v-model="searchInput">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
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
        <el-button type="primary" @click="handleAddClick">新增供应商</el-button>
        <el-button type="primary" @click="handleAddClick">导出</el-button>
      </div>
    </div>
    <div class="content-bar mgb20 searchBar">
      <div>今日订单支付金额：￥1695689</div>
      <div>累计订单支付金额：￥1695689</div>
    </div>
    <div class="container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column property="date" label="上报日期" width="120">
        </el-table-column>
        <el-table-column property="name" label="租金" width="120">
        </el-table-column>
        <el-table-column property="address" label="水电"> </el-table-column>
        <el-table-column property="address" label="日常维护"> </el-table-column>
        <el-table-column property="address" label="其他支出"> </el-table-column>
        <el-table-column property="address" label="分店名称"> </el-table-column>
        <el-table-column property="address" label="分店地址"> </el-table-column>
        <el-table-column property="address" label="登记人"> </el-table-column>
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
      EditVisibleTitle: "编辑",
      AddVisible: false,
      formLabelWidth: 220,
      form: {
        name: ""
      },
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
