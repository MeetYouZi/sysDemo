<template>
  <div>
    <div class="content-bar mgb20 searchBar">
      <div class="searchBar">
        <div class="searchInput">
          <el-input placeholder="请输入内容" v-model="searchInput">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <el-button type="primary">确定</el-button>
      </div>

    </div>
    <div class="container">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="分店订单编号" width="180">
        </el-table-column>
        <el-table-column prop="date" label="子订单编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="数量" width="180">
        </el-table-column>
        <el-table-column prop="address" label="总金额"> </el-table-column>
        <el-table-column prop="address" label="收货信息"> </el-table-column>
        <el-table-column prop="address" label="状态"></el-table-column>
        <el-table-column prop="address" label="下单时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button-group>
              <!--<el-button type="primary" size="small">配置权限</el-button>-->
              <el-button type="primary" size="small">发货</el-button>
              <el-button type="info" size="small">详情</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <page-pagination></page-pagination>
    </div>
  </div>
</template>

<script>
  import pagePagination from "@/components/common/pagePagination";
export default {
  name: 'index',
  components: {
    pagePagination
  },
  data() {
    return {
      options: [
        {
          value: "7",
          label: "7天订单趋势"
        },{
          value: "30",
          label: "30天订单趋势"
        }
      ],
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
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>