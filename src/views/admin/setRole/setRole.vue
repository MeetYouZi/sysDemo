<template>
  <div>
    <div class="mgb20 searchBar">角色管理</div>
    <div class="content-bar mgb20 searchBar">
      <div class="searchBar">
        <el-button type="primary" @click="AddVisible = true">新增</el-button>
      </div>
    </div>
    <div class="container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index"> </el-table-column>
        <el-table-column label="角色名称" prop="id"> </el-table-column>
        <el-table-column label="是否启用" prop="name">
          <template slot-scope="scope">
            <el-switch
                    v-model="form.value2"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="角色备注" prop="name"> </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="primary"
              >
                编辑
              </el-button>
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
    <el-dialog :title="EditVisibleTitle" :visible.sync="AddVisible" width="400" >
      <el-form class="demo-form-inline" label-width="180px">
        <el-form-item label="角色名称" >
          <el-input v-model="form.input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="角色备注">
          <el-input v-model="form.input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="是否启动">
          <el-switch
                  v-model="form.value2"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="权限配置">
          <el-tree
                  :data="data2"
                  show-checkbox
                  node-key="id"
                  :default-expanded-keys="[2, 3]"
                  :default-checked-keys="[5]"
                  :props="defaultProps">
          </el-tree>
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
  data(){
    return {
      form: {},
      AddVisible: false,
      EditVisibleTitle: '新增编辑角色',
      data2: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
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
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped></style>
