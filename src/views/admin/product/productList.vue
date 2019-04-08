<template>
  <div>
    <h4>商品列表</h4>
    <div class="content-bar mgb20 searchBar">
      <div class="searchBar">
        <div class="searchInput">
          <el-input placeholder="请输入商品编号" v-model="itemId">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="searchInput">
          <el-input placeholder="请输入商品名称" v-model="itemName">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="searchInput">
          <el-select v-model="itemState" placeholder="请选择" clearable>
            <el-option
              v-for="item in itemStateList"
              :key="item.id"
              :label="item.stateName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <el-button type="primary" @click="getItemList(1)">确定</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </div>
    </div>
    <div class="container">
      <el-table :data="itemList" stripe style="width: 100%">
        <el-table-column prop="itemName" label="等级名称" width="180">
        </el-table-column>
        <el-table-column prop="itemState" label="商品状态">
          <template slot-scope="scope">
            {{ scope.row.itemState == 1 ? "下架" : "上架" }}
          </template>
        </el-table-column>
        <el-table-column prop="carriageExpense" label="运费" width="180">
        </el-table-column>
        <el-table-column prop="stock" label="库存" width="180">
        </el-table-column>
        <el-table-column prop="saleNum" label="销量" width="180">
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <!--<el-button-group>-->
            <el-button
              type="primary"
              size="small"
              @click="hangdleDetail(scope.row)"
              >详情</el-button
            >
            <el-button
              type="warning"
              size="small"
              @click="hangdleEdit(scope.row, false)"
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="800px">
      <el-form :model="productForm" :rules="rules" ref="productForm">
        <el-form-item label="商品名称" :label-width="formLabelWidth" prop="itemName">
          <el-input v-model="productForm.itemName" :disabled="isEdit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片大图" :label-width="formLabelWidth">
          <!--<el-input v-model="productForm.bigImage" autocomplete="off"></el-input>-->
          <vue-upload-img @uploadSuccess="uploadBigImage" :limitNum="1" :disabled="isEdit" :file-list="bigImage"></vue-upload-img>
        </el-form-item>
        <el-form-item label="详情图片" :label-width="formLabelWidth">
          <!--<el-input v-model="productForm.detail" autocomplete="off"></el-input>-->
          <vue-upload-img @uploadSuccess="uploadDetailSuccess" :limitNum="1" :disabled="isEdit" :file-list="detailImage"></vue-upload-img>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="formLabelWidth" prop="parentCategoryId">
          <!--<el-input v-model="productForm.parentCategoryId" autocomplete="off"></el-input>-->
          <el-select v-model="parentCategoryIndex" @change="selectParentCategory" :disabled="isEdit" placeholder="请选择">
            <el-option
                    v-for="(item,index) in allItemCategoryList"
                    :key="item.id"
                    :label="item.categoryName"
                    :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth" prop="categoryId">
          <!--<el-input v-model="productForm.categoryId" autocomplete="off"></el-input>-->
          <el-select v-model="productForm.categoryId" @change="selectcategoryId" :disabled="isEdit" placeholder="请选择">
            <el-option
                    v-for="(item) in chilItemCategory"
                    :key="item.id"
                    :label="item.categoryName"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库存数量" :label-width="formLabelWidth" prop="stock">
          <el-input v-model="productForm.stock" :disabled="isEdit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮费" :label-width="formLabelWidth" prop="carriageExpense">
          <el-input v-model="productForm.carriageExpense" :disabled="isEdit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否在首页显示" :label-width="formLabelWidth" prop="homeShow">
          <!--<el-input v-model="productForm.homeShow" autocomplete="off"></el-input>-->
          <el-radio :disabled="isEdit" v-model="productForm.homeShow" label="1">是</el-radio>
          <el-radio :disabled="isEdit" v-model="productForm.homeShow" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="商品轮播图" :label-width="formLabelWidth">
          <!--<el-input v-model="productForm.bannerImage" autocomplete="off"></el-input>-->
          <vue-upload-img @uploadSuccess="uploadBannerSuccess" :limitNum="3" :disabled="isEdit" :file-list="bannerImage"></vue-upload-img>
        </el-form-item>
        <el-form-item label="首页描述" :label-width="formLabelWidth">
          <el-input v-model="productForm.homeDesc" :disabled="isEdit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员单价" :label-width="formLabelWidth">
          <!--<el-input v-model="productForm.priceArray" autocomplete="off"></el-input>-->
          <!--<el-button type="primary" @click="addPriceArray" :disabled="isEdit" plain>添加会员单价</el-button>-->
        </el-form-item>
          <!--<el-input v-model="productForm.priceArray" autocomplete="off"></el-input>-->
        <div v-for="(item,index) in priceArray" :key="index">
          <el-col :span="11">
            <el-form-item label="会员等级" :label-width="formLabelWidth">
              <el-select
                      v-model="item.levelId"
                      placeholder="选择会员等级"
                      :disabled="true"
              >
                <el-option
                        v-for="item2 in levelList"
                        :key="item2.id"
                        :label="item2.levelName"
                        :value="item2.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="会员单价" :label-width="formLabelWidth" class="itemBox">
              <el-input v-model="item.price" :disabled="isEdit" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="2" v-if="!isEdit">-->
            <!--<i-->
              <!--class="el-icon-error"-->
              <!--@click="delPriceArray(index)"-->
            <!--&gt;</i>-->
          <!--</el-col>-->
        </div>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitSaveItem('productForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="dialogDetailVisible" >
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple text-right">商品大图</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">
          <img width="90" height="90" :src="detail.bigImage"/>
        </div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple text-right">等级名称</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">{{detail.itemName}}</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple text-right">商品轮播图</div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple text-left">
          <img width="90" height="90" v-for="item in detail.bannerImageList" :key="item" :src="item"/>
        </div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple text-right">详情图片地址</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">
          <img width="90" height="90" :src="detail.detail"/>
        </div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple text-right">商品父分类</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">{{detail.parentCategoryId}}</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple text-right">子分类</div></el-col>
        <el-col :span="18"><div class="grid-content bg-purple text-left">{{detail.categoryId}}</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple text-right">商品状态</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">{{detail.itemState == 0 ? '上架' : '下架'}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple text-right">运费</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">{{detail.carriageExpense == 0 ? '免邮' : detail.carriageExpense}}</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple text-right">库存</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">{{detail.stock}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple text-right">是否首页显示</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">{{detail.homeShow == 0 ? '否' : '是'}}</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple text-right">首页描述</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">{{detail.homeDesc}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple text-right">销量</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">{{detail.saleNum}}</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple text-right"></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">所有会员价格</div></el-col>

      </el-row>
      <el-row :gutter="20" v-for="(item,index) in detail.userPriceList" :key="index">
        <el-col :span="4"><div class="grid-content bg-purple text-right">会员名称</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">{{item.levelName}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple text-right">价格</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">{{item.price}}</div></el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogDetailVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagePagination from "common/pagePagination";
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
      itemId: "",
      itemName: "",
      itemState: "",
      productForm: {
        homeShow: '0'
      },
      formLabelWidth: '120px',
      itemStateList: [
        {
          id:0,
          stateName: '商家'
        },{
          id:1,
          stateName: '下架'
        }
      ],
      itemList: [],
      levelList: [],
      allItemCategoryList: [],
      chilItemCategory: [],
      priceArray: [],
      dialogFormVisible: false,
      dialogDetailVisible: false,
      detail: {},
      parentCategoryIndex: 0,
      bigImage: [],
      detailImage: [],
      bannerImage: [],
      dialogTitle: '编辑',
      isEdit: false,
      rules:{
        itemName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        parentCategoryId: [
          { required: true, message: '请选择一级分类', trigger: 'change' }
        ],
        categoryId: [
          { required: true, message: '请选择二级分类', trigger: 'change' }
        ],
        stock: [
          { required: true, message: '请输入库存', trigger: 'blur' }
        ],
        carriageExpense: [
          { required: true, message: '请输入邮费', trigger: 'blur' }
        ],
        homeShow: [
          { required: true, message: '请选择是否在首页显示', trigger: 'blur' }
        ],
        priceArray: [
          { required: true, message: '输入商品价格', trigger: 'blur' }
        ]

      }
    };
  },
  methods: {
    // 翻页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getUserList(val);
    },
    hangdleDetail(row){
      this.detail = row
      this.detail.bannerImageList = row.bannerImage.split(',')
      this.dialogDetailVisible= true
    },
    // 编辑
    hangdleEdit(row, isEdit) {
      this.isEdit = isEdit
      if(!isEdit){
        this.dialogTitle = '编辑'
      } else {
        this.dialogTitle = '详情'
      }
      this.dialogFormVisible = true
      this.productForm = JSON.parse(JSON.stringify(row))
      this.productForm.homeShow = this.productForm.homeShow.toString()
      this.productForm.itemId = this.productForm.id
      this.bigImage = [{
        name: 'bigImage',
        url: this.productForm.bigImage
      }]
      this.detailImage = [{
        name: 'detailImage',
        url: this.productForm.detail
      }]
      this.bannerImage = []
      let bannerImage = this.productForm.bannerImage.split(',')
      bannerImage.forEach((item,index) => {
        this.bannerImage.push({
          name: `banner${index}`,
          url: item
        })
      })
      this.priceArray = this.productForm.userPriceList
      this.allItemCategoryList.forEach((item,index) => {
        if(item.id == this.productForm.parentCategoryId){
          this.parentCategoryIndex = index
          this.chilItemCategory = item.chilItemCategory
        }
      })
    },
    addPriceArray(){
      this.priceArray.push({
        levelId: '',
        price: ''
      })
    },
    delPriceArray(index) {
      this.priceArray.splice(index, 1);
    },
    // 新增
    handleAdd(){
      this.isEdit = false
      this.dialogTitle = '新增'
      this.dialogFormVisible = true
      this.parentCategoryIndex = 0
      // this.priceArray = []
      this.levelList.forEach(item =>{
        this.priceArray.push({
          levelId: item.id,
          price: '0'
        })
      })
      this.bigImage = []
      this.detailImage= []
      this.bannerImage= []
      this.productForm = {
        itemId: '',
        homeShow: '0',
        parentCategoryId: this.allItemCategoryList[this.parentCategoryIndex].id
      }
    },
    // 修改
    submitSaveItem(formName){

      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(!this.productForm.bigImage){
            return this.$message.error('请上传图片大图')
          }
          if(!this.productForm.bigImage){
            return this.$message.error('请上传图片大图')
          }
          let data = {
            itemId: this.productForm.itemId,
            itemName: this.productForm.itemName,
            bigImage: this.productForm.bigImage,
            bannerImage: this.productForm.bannerImage,
            detail: this.productForm.detail,
            parentCategoryId: this.productForm.parentCategoryId,
            categoryId: this.productForm.categoryId,
            stock: this.productForm.stock,
            carriageExpense: this.productForm.carriageExpense,
            homeShow: this.productForm.homeShow,
            homeDesc: this.productForm.homeDesc,
            priceArray: this.priceArray,
          };
          this.$axios.saveItem(data).then(res => {
            this.dialogFormVisible = false
            this.$message.success('操作成功！')
            this.getItemList(1);
          });
        } else {
          return false;
        }
      });
    },
    // 商品大图
    uploadBigImage(fileList){
      if(fileList.length > 0){
        this.productForm.bigImage = fileList[0].url
      }
    },
    // 商品详情图片
    uploadDetailSuccess(fileList){
      if(fileList.length > 0) {
        this.productForm.detail = fileList[0].url
      }
    },
    uploadBannerSuccess(fileList){
      let bannerImage = []
      fileList.forEach(item => {
        bannerImage.push(item.url)
      })
      this.productForm.bannerImage = bannerImage.join(',')
    },
    // 选择一级分类
    selectParentCategory(){
      let index = this.parentCategoryIndex
      this.productForm.parentCategoryId = this.allItemCategoryList[index].id
      this.productForm.categoryId = ''
      this.chilItemCategory = this.allItemCategoryList[index].chilItemCategory
    },
    selectcategoryId(){

    },
    // 获取商品列表
    getItemList(pageNum) {
      let currentPage = pageNum ? pageNum : 1;
      this.pageNum = currentPage;
      let data = {
        itemId: this.itemId,
        itemName: this.itemName,
        itemState: this.itemState,
        pageSize: this.pageSize,
        pageNum: currentPage
      };
      this.$axios.itemList(data).then(res => {
        this.totalNum = res.data.totalNum;
        this.itemList = res.data.itemList;
      });
    },
    // 全部分类
    getAllItemCategoryList(){
      this.$axios.allItemCategoryList({}).then(res => {
        this.allItemCategoryList = res.data.categoryList
        this.chilItemCategory = res.data.categoryList[0].chilItemCategory
      });
    },
    // 获取等级列表
    getLevelList() {
      this.$axios.getLevelList().then(res => {
        this.levelList = res.data.levelList;
      });
    },
  },
  created() {
    this.getLevelList();
    this.getAllItemCategoryList();
    this.getItemList(1);
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.el-input
  width 300px
.itemBox
  width 100%
  .el-input
    width 194px
</style>
