<template>
  <div>
    <h4>套餐列表</h4>
    <div class="container mgt10">
      <div class="mgb20 addBar">
        <el-button type="primary" @click="addPackItem" plain>新增</el-button>
      </div>
      <el-table :data="packageInfoList" stripe style="width: 100%">
        <el-table-column prop="packageName" label="套餐名称" width="180">
        </el-table-column>
        <el-table-column prop="packageDesc" label="套餐描述">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="180">
        </el-table-column>
        <el-table-column prop="needCode" label="是否需要资格码">
          <template slot-scope="scope">
            {{ scope.row.needCode == 1 ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column prop="teamPerson" label="计算团队成员">
          <template slot-scope="scope">
            {{ scope.row.teamPerson == 1 ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <!--<el-button-group>-->
            <el-button
              type="warning"
              size="small"
              @click="hangdleEdit(scope.row)"
              >修改</el-button
            >
            <!--</el-button-group>-->
          </template>
        </el-table-column>
      </el-table>
      <page-pagination
        :total="totalNum"
        :pageNum="pageNum"
        :pageSize="pageSize"
        @handleCurrentChange="handleCurrentChange"
      ></page-pagination>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="600px">
      <el-form>
        <el-form-item label="资格码数" :label-width="formLabelWidth">
          <!--<el-input placeholder="请输入资格码数" v-model="num" autocomplete="off"></el-input>-->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmin">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagePagination from "@/components/common/pagePagination";
export default {
  name: "membersList",
  components: {
    pagePagination
  },
  data() {
    return {
      totalNum: 0,
      pageNum: 1,
      pageSize: 15,
      nickName: "",
      phone: "",
      levelId: "",
      levelList: [],
      packageInfoList: [],
      packForm: {},
      formLabelWidth: '120px',
      dialogFormVisible: false
    };
  },
  methods: {
    // 翻页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getPackageList(val);
    },
    hangdleEdit(row){
      this.packForm = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
    },
    //addPackItem
    addPackItem(){

    },
    // 编辑
    handleSubmin(){
      let data = {
        id: this.packForm.id,
        packageName: this.packForm.packageName,
        interestDesc: this.packForm.interestDesc,
        price: this.packForm.price,
        img: this.packForm.img,
        detailImg: this.packForm.detailImg,
        needCode: this.packForm.needCode,
        teamPerson: this.packForm.teamPerson,
        gift: this.packForm.gift,
      }
      this.$axios.savePackageInfo(data).then(res => {
        this.dialogFormVisible = false
        this.$message.success('操作成功')
      });
    },
    // 获取列表
    getPackageList(pageNum) {
      let currentPage = pageNum ? pageNum : 1;
      this.pageNum = currentPage;
      let data = {
        pageSize: this.pageSize,
        pageNum: currentPage
      };
      this.$axios.packageList(data).then(res => {
        this.totalNum = res.data.totalNum;
        this.packageInfoList = res.data.packageInfoList;
      });
    },
  },
  created() {
    this.getPackageList(1);
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.addBar
  display flex
  justify-content flex-end
  align-items center
.el-input
  width 200px
</style>
