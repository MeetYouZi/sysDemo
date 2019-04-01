<template>
  <div class="contain">
    <div class="mgb20 searchBar">
      采购记录
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
      </div>
    </div>
    <div class="container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="订单编号" prop="id"> </el-table-column>
        <el-table-column label="数量" prop="id"> </el-table-column>
        <el-table-column label="总金额" prop="name"> </el-table-column>
        <el-table-column label="收货信息" prop="name"> </el-table-column>
        <el-table-column label="分店名" prop="name"> </el-table-column>
      </el-table>
      <page-pagination></page-pagination>
    </div>
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
      form: {
        name: ""
      },
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
