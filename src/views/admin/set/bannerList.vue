<template>
  <div>
    <h4>banner管理</h4>
    <div class="content-bar mgb20 searchBar">
      <div class="searchBar">
        <el-button type="primary" @click="getBannerAdd">新增Banner</el-button>
      </div>
    </div>
    <div class="container">
      <el-table :data="bannerList" stripe style="width: 100%">
        <el-table-column prop="url" label="图片链接">
          <template slot-scope="scope">
            <img
              width="90"
              height="90"
              :src="scope.row.url"
              @click="handleImg(scope.row.url)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="isShow" label="是否显示">
          <template slot-scope="scope">
            {{ scope.row.isShow == 1 ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                type="warning"
                size="small"
                @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="small"
                @click="handleDel(scope.row)"
                >删除</el-button
              >
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="bannerForm">
        <el-form-item label="图片" :label-width="formLabelWidth">
          <vue-upload-img
            @uploadSuccess="uploadImage"
            :limitNum="1"
            :file-list="url"
          ></vue-upload-img>
        </el-form-item>
        <el-form-item label="是否显示" :label-width="formLabelWidth">
          <el-radio v-model="bannerForm.isShow" label="1">是</el-radio>
          <el-radio v-model="bannerForm.isShow" label="0">否</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveBanner">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import pagePagination from "@/components/common/pagePagination";
import vueUploadImg from "common/UploadFile";
export default {
  name: "membersList",
  components: {
    pagePagination,
    vueUploadImg
  },
  data() {
    return {
      totalNum: 0,
      pageNum: 1,
      pageSize: 15,
      BannerName: "",
      type: "",
      typeList: [
        {
          id: "1",
          name: "满减"
        },
        {
          id: "2",
          name: "全场通用减免券"
        },
        {
          id: "3",
          name: "商品抵扣券"
        }
      ],
      dialogTitle: "编辑banner",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      bannerList: [],
      bannerForm: {},
      url: [],
      dialogVisible: false,
      dialogImageUrl: ""
    };
  },
  methods: {
    // 翻页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getHomeBannerList(val);
    },
    handleImg(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },
    handleDel(row) {
      let data = {
        id: row.id
      };
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delBanner(data).then(() => {
            this.$message.success("操作成功");
            this.dialogFormVisible = false;
            this.getHomeBannerList(1);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleEdit(row) {
      this.bannerForm = JSON.parse(JSON.stringify(row));
      this.dialogTitle = "编辑banner";
      this.url = [
        {
          name: "url1",
          url: this.bannerForm.url
        }
      ];
      this.dialogFormVisible = true;
    },
    uploadImage(fileList) {
      if (fileList.length > 0) {
        this.bannerForm.url = fileList[0].url;
      }
    },
    // 新增
    getBannerAdd() {
      this.bannerForm = {};
      this.url = [];
      this.dialogTitle = "新增banner";
      this.dialogFormVisible = true;
    },
    // 保存
    saveBanner() {
      if (!this.bannerForm.url) {
        return this.$message.error("请上传图片");
      }
      if (!this.bannerForm.isShow) {
        return this.$message.error("请选择是否在首页显示");
      }
      let data = {
        id: this.bannerForm.id,
        url: this.bannerForm.url,
        isShow: this.bannerForm.isShow
      };
      this.$axios.saveBanner(data).then(() => {
        this.$message.success("操作成功");
        this.dialogFormVisible = false;
        this.getHomeBannerList(1);
      });
    },
    // 获取列表
    getHomeBannerList(pageNum) {
      let currentPage = pageNum ? pageNum : 1;
      this.pageNum = currentPage;
      let data = {
        pageSize: this.pageSize,
        pageNum: currentPage
      };
      this.$axios.homeBannerList(data).then(res => {
        this.totalNum = res.data.totalNum;
        this.bannerList = res.data.bannerList;
      });
    }
  },
  created() {
    this.getHomeBannerList(1);
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.el-input
  width 300px
.el-icon-error
  line-height 40px
</style>
