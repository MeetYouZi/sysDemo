<template>
  <div class="contain">
    <div class="mgb20 searchBar">
      类目管理
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
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="商品分类编号">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="商品类目名称">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品分类编号" prop="id"> </el-table-column>
        <el-table-column label="商品类目名称" prop="name"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <!--<el-button type="primary" size="small">配置权限</el-button>-->
              <el-button type="primary" size="small">编辑</el-button>
              <el-button type="danger" size="small">删除</el-button>
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
          <el-button type="primary" @click="addCategory">添加分类标签</el-button>
        </el-form-item>
        <div v-for="(item,index) in form.formList" :key="index">
          <el-form-item :label="item.label">
            <el-input v-model="item.name" placeholder="请输入分类标签"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" v-if="form.formList.length>1" @click="subCategory(index)">删除分类</el-button>
          </el-form-item>
        </div>
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
        ],
      },
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
    addCategory(){
      this.form.formList.push({
        label: "分类标签",
        name: ""
      })
    },
    subCategory(val){
      let index = val
      this.form.formList.splice(index, 1)
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
