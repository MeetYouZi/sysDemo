<template>
  <div>
    <div class="mgb20 searchBar">消息管理</div>
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
      <div class="content-bar">
        <div>提醒消息</div>
        <div>公告消息</div>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="消息标题" prop="name"> </el-table-column>
        <el-table-column label="消息内容" prop="id"> </el-table-column>
        <el-table-column label="发布时间" prop="name"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button-group>
              <!--<el-button-->
              <!--@click.native.prevent="deleteRow(scope.$index, tableData)"-->
              <!--type="primary"-->
              <!--&gt;-->
              <!--编辑-->
              <!--</el-button>-->
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="danger"
              >
                删除
              </el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="info"
              >
                详情
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <page-pagination></page-pagination>
    </div>
    <el-dialog :title="EditVisibleTitle" :visible.sync="AddVisible" width="300">
      <el-form class="demo-form-inline" label-width="180px">
        <el-form-item label="消息标题">
          <el-input v-model="form.input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="消息内容">
          <el-input
            type="textarea"
            :rows="2"
            v-model="form.input"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AddVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagePagination from "@/components/common/pagePagination";
export default {
  name: "setRole",
  components: {
    pagePagination
  },
  data() {
    return {
      form: {},
      AddVisible: false,
      EditVisibleTitle: "新增编辑角色",
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
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .searchBar
    display flex
    justify-content space-between
</style>
