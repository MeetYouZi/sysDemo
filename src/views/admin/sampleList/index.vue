<template>
  <div>
    <h4>绑定样品管理</h4>
    <div class="content-bar mgb20 searchBar">
      <div class="searchBar">
        <div class="searchInput">
          <el-input placeholder="请输入样品编号" v-model="sampleNo">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="searchInput">
          <el-select v-model="type" placeholder="样品类型" clearable>
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
          <el-select v-model="sampleState" placeholder="报告状态" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <el-button type="primary" @click="getSampleList(1)">确定</el-button>
      </div>
    </div>
    <div class="container">
      <el-table :data="sampleInfoList" stripe style="width: 100%">
        <el-table-column prop="sampleNo" label="样品编号" width="180">
        </el-table-column>
        <el-table-column prop="userInfo.nickName" label="用户昵称" width="180">
        </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span v-if="scope.row.sex == 0"> 女</span>
            <span v-if="scope.row.sex == 1"> 男</span>
          </template>
        </el-table-column>
        <el-table-column prop="sampleState" label="报告状态">
          <template slot-scope="scope">
            <span v-if="scope.row.sampleState == 0"> 等待结果</span>
            <span v-if="scope.row.sampleState == 1"> 已出结果</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button-group>
              <!--<el-button type="primary" size="small">配置权限</el-button>-->
              <el-button
                type="primary"
                size="small"
                @click="handleEdit(scope.row)"
                >上传报告</el-button
              >
              <el-button type="info" size="small">详情</el-button>
            </el-button-group>
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
    <el-dialog title="上传报告" :visible.sync="dialogFormVisible">
      <el-form :model="orderForm">
        <el-form-item label="收件人" :label-width="formLabelWidth">
          <vue-upload-file @uploadSuccess="uploadFile" :limitNum="1"></vue-upload-file>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSample">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagePagination from "@/components/common/pagePagination";
import vueUploadFile from "common/UploadFile1";
export default {
  name: "index",
  components: {
    pagePagination,
    vueUploadFile
  },
  data() {
    return {
      sampleState: "",
      sampleNo: "",
      type: "",
      typeList: [
        {
          value: "0",
          label: "易感染基因检测"
        },{
          value: "1",
          label: "HPV筛查"
        }
      ],
      options: [
        {
          value: "0",
          label: "等待结果"
        },
        {
          value: "1",
          label: "已出结果"
        }
      ],
      sampleInfoList: [],
      pageNum: 1,
      pageSize: 15,
      totalNum: 0,
      orderForm: {},
      formLabelWidth: "120px",
      dialogFormVisible: false
    };
  },
  methods: {
    // 翻页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getsampleInfoList(val);
    },
    handleEdit(row) {
      this.dialogFormVisible = true
      this.orderForm = JSON.parse(JSON.stringify(row));
      console.log(this.orderForm)
    },
    uploadFile(fileList){
      if(fileList.length > 0) {
        this.orderForm.url = fileList[0].url
      }
    },
    //上传报告
    saveSample() {
      if(!this.orderForm.url){
        return this.$message.error('请上传报告')
      }
      let data = {
        id: this.orderForm.id,
        url: this.orderForm.url
      };
      this.$axios.saveSample(data).then(() => {
        this.dialogFormVisible = false;
        this.getSampleList(1);
        this.$message.success("操作成功");
      });
    },
    // 列表
    getSampleList(pageNum) {
      let currentPage = pageNum ? pageNum : 1;
      this.pageNum = currentPage;
      let data = {
        type: this.type,
        sampleState: this.sampleState,
        sampleNo: this.sampleNo,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.$axios.sampleList(data).then(res => {
        this.totalNum = res.data.totalNum;
        this.sampleInfoList = res.data.sampleInfoList;
      });
    }
  },
  created() {
    this.getSampleList();
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.el-input
  width 300px
</style>
