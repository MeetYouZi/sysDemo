<template>
  <div class="contain">
    <div class="mgb20 searchBar">
      新品审核
    </div>
    <div class="content-bar mgb20 searchBar">
      <div class="searchBar">
        <div class="searchInput">
          <el-input placeholder="请输入内容" v-model="searchInput">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="searchInput">
          <el-select v-model="form.value4" clearable placeholder="是否在首页显示">
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
        <!--<el-button type="primary" @click="handleAddClick">新增</el-button>-->
      </div>
    </div>
    <div class="container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="商品" prop="id"> </el-table-column>
        <el-table-column label="货号" prop="id"> </el-table-column>
        <el-table-column label="商品分类" prop="name"> </el-table-column>
        <el-table-column label="单价/元" prop="name"> </el-table-column>
        <el-table-column label="状态" prop="name"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" @click="handleAddClick" size="small">通过</el-button>
              <el-button type="danger" @click="handleAddClick" size="small">不通过</el-button>
              <el-button type="primary" size="small">编辑</el-button>
              <el-button type="info" size="small">详情</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <page-pagination></page-pagination>
    </div>
    <!--通过新品审核-->
    <el-dialog
      title="通过审核"
      :visible.sync="passVisible"
      width="400"
    >
      <el-form class="demo-form-inline">
        <el-form-item label="选择可见商品分店区域">
          <el-select v-model="form.value5" multiple placeholder="请选择">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passVisible = false">取 消</el-button>
        <el-button type="primary" @click="passVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--不通过新品审核-->
    <el-dialog
            title="新品不通过"
            :visible.sync="rejectVisible"
            width="400"
    >
      <el-form class="demo-form-inline">
        <el-form-item label="描述">
          <el-select v-model="form.value5" multiple placeholder="请选择">
            <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="form.textarea">
            </el-input>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rejectVisible = false">取 消</el-button>
        <el-button type="primary" @click="rejectVisible = false">确 定</el-button>
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
