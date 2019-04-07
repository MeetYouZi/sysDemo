<template>
  <div>
    <h4>商品列表</h4>
    <div class="content-bar mgb20 searchBar">
      <div class="searchBar">
        <el-button type="primary" @click="handleAdd">新增分类</el-button>
      </div>
    </div>
    <div class="container">
      <el-table :data="itemCategoryList" stripe>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand" v-for="(item,index) in props.row.chilItemCategory" :key="index">
              <el-form-item label="类别id">
                <span>{{ item.id }}</span>
              </el-form-item>
              <el-form-item label="类别名称">
                <span>{{ item.categoryName }}</span>
              </el-form-item>
              <el-form-item label="图片">
                <img width="90" height="90" :src="item.image"/>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="类别id">
        </el-table-column>
        <el-table-column prop="categoryName" label="类别名称">
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <!--<el-button-group>-->
            <el-button
              type="warning"
              size="small"
              @click="hangdleEdit1(scope.row)"
              >修改一级分类</el-button
            >
            <el-button
                    :disabled="scope.row.chilItemCategory.length == 0"
                    type="warning"
                    size="small"
                    @click="hangdleEdit(scope.row)"
            >修改二级分类</el-button
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="productForm">
        <el-form-item label="是否为一级分类" :label-width="formLabelWidth">
          <!--<el-input v-model="productForm.isParent" autocomplete="off"></el-input>-->
          <el-radio :disabled="!isShow" v-model="productForm.isParent" label="1">是</el-radio>
          <el-radio :disabled="!isShow" v-model="productForm.isParent" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="选择子分类" :label-width="formLabelWidth" v-if="isEdit2">
          <el-select v-model="productForm.categoryIndex" @change="selectParentCategory" placeholder="请选择需要修改的子分类">
            <el-option
                    v-for="(item,index) in productForm.chilItemCategory"
                    :key="item.id"
                    :label="item.categoryName"
                    :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="productForm.categoryName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择分类" :label-width="formLabelWidth" v-if="productForm.isParent == 0">
          <el-select v-model="productForm.parentId" :disabled="!isShow" placeholder="请选择">
            <el-option
                    v-for="(item,index) in allItemCategoryList"
                    :key="item.id"
                    :label="item.categoryName"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类图片" :label-width="formLabelWidth" v-if="productForm.isParent == 0">
          <!--<el-input v-model="productForm.bigImage" autocomplete="off"></el-input>-->
          <vue-upload-img @uploadSuccess="uploadImage" :limitNum="1" :file-list="image"></vue-upload-img>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSubmit"
          >确 定</el-button
        >
      </div>
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
      productForm: {
        isParent: '1'
      },
      image: [],
      formLabelWidth: '120px',
      itemCategoryList: [],
      dialogFormVisible: false,
      allItemCategoryList: [],
      dialogTitle: '编辑',
      isShow: true,
      isEdit2: false
    };
  },
  methods: {
    // 翻页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getUserList(val);
    },
    // 新增
    handleAdd(){
      this.dialogTitle = '新增分类'
      this.dialogFormVisible = true;
      this.isShow = true
      this.isEdit2 = false
      this.image = []
      this.productForm = {
        isParent: '1',
        categoryId: ''
      }
    },
    // 编辑1级分类
    hangdleEdit1(row) {
      this.dialogTitle = '编辑一级分类'
      this.dialogFormVisible = true;
      this.isShow = false
      this.isEdit2 = false
      this.productForm = JSON.parse(JSON.stringify(row));
      this.productForm.isParent = '1'
      this.productForm.categoryId = this.productForm.id
      this.productForm.parentId = ''
    },
    // 编辑2级分类
    hangdleEdit(row) {
      this.dialogTitle = '编辑二级分类'
      this.dialogFormVisible = true;
      this.isShow = false
      this.isEdit2 = true
      this.productForm = JSON.parse(JSON.stringify(row));
      this.productForm.isParent = '0';
      this.productForm.categoryId = this.productForm.chilItemCategory[0].id
      this.productForm.parentId = this.productForm.id
      this.productForm.categoryIndex = 0
      this.productForm.categoryName = this.productForm.chilItemCategory[0].categoryName
      this.image = [
        {
          name: 'image1',
          url: this.productForm.chilItemCategory[0].image
        }
      ]
      this.productForm.image = this.productForm.chilItemCategory[0].image
    },
    selectParentCategory(){
      let index = this.productForm.categoryIndex
      this.productForm.categoryName = this.productForm.chilItemCategory[index].categoryName
      this.productForm.categoryId = this.productForm.chilItemCategory[index].id
      this.productForm.image = this.productForm.chilItemCategory[index].image

    },
    uploadImage(fileList){
      if(fileList.length > 0) {
        this.productForm.image = fileList[0].url
      }
    },
    saveSubmit(){
      let data = {
        categoryId: this.productForm.categoryId,
        categoryName: this.productForm.categoryName,
        isParent: this.productForm.isParent,
        parentId: this.productForm.parentId,
        image: this.productForm.image,
      }
      this.$axios.saveItemCategory(data).then(res => {
        this.dialogFormVisible = false
        this.getItemCategoryList(1)
      })
    },
    // 获取商品分类列表
    getItemCategoryList(pageNum) {
      let currentPage = pageNum ? pageNum : 1;
      this.pageNum = currentPage;
      let data = {
        pageSize: this.pageSize,
        pageNum: currentPage
      };
      this.$axios.itemCategoryList(data).then(res => {
        this.totalNum = res.data.totalNum;
        this.itemCategoryList = res.data.itemCategoryList;
      });
    },
    // 全部分类
    getAllItemCategoryList(){
      this.$axios.allItemCategoryList({}).then(res => {
        this.allItemCategoryList = res.data.categoryList
      });
    },
  },
  created() {
    this.getAllItemCategoryList();
    this.getItemCategoryList(1);
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.el-input
  width 300px
.el-select
  width 300px
  .el-input
    width 300px
</style>
