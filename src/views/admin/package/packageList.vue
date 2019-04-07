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
        <el-table-column prop="packageDesc" label="套餐描述"> </el-table-column>
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
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      width="800px"
    >
      <el-form :model="packForm" :inline="true">
        <el-form-item label="套餐名称" :label-width="formLabelWidth">
          <el-input
            placeholder="请输入套餐名称"
            v-model="packForm.packageName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="套餐权益描述" :label-width="formLabelWidth">
          <el-input
            placeholder="请输入套餐权益描述"
            v-model="packForm.interestDesc"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="套餐描述" :label-width="formLabelWidth">
          <el-input
            placeholder="请输入套餐描述"
            v-model="packForm.packageDesc"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="packForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <div>
          <el-form-item label="首页图片" :label-width="formLabelWidth">
            <!--<el-input v-model="packForm.img" autocomplete="off"></el-input>-->
            <vue-upload-img @uploadSuccess="uploadBannerSuccess" :limitNum="1" :file-list="bannerImg"></vue-upload-img>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="详情页面图片" :label-width="formLabelWidth">
            <!--<el-input v-model="packForm.detailImg" autocomplete="off"></el-input>-->
            <vue-upload-img @uploadSuccess="uploadDetailSuccess" :limitNum="1" :file-list="detailImg"></vue-upload-img>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="需要资格码" :label-width="formLabelWidth">
            <!--单选-->
            <!--<el-input v-model="packForm.needCode" autocomplete="off"></el-input>-->
            <el-radio v-model="packForm.needCode" label="1">是</el-radio>
            <el-radio v-model="packForm.needCode" label="0">否</el-radio>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="计算团队成员" :label-width="formLabelWidth">
            <!--单选-->
            <!--<el-input v-model="packForm.teamPerson" autocomplete="off"></el-input>-->
            <el-radio v-model="packForm.teamPerson" label="1">是</el-radio>
            <el-radio v-model="packForm.teamPerson" label="0">否</el-radio>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="权益" :label-width="formLabelWidth">
            <el-button type="primary" @click="addGift" plain>添加权益</el-button>
          </el-form-item>
        </div>
        <div
          class="addReward"
          v-for="(item, index) in giftList"
          :key="index"
        >
          <el-form-item label="选择优惠券" :label-width="formLabelWidth">
            <el-select
              v-model="item.couponId"
              placeholder="选择优惠券"
              clearable
            >
              <el-option
                v-for="item1 in couponList"
                :key="item1.id"
                :label="item1.couponName"
                :value="item1.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数量" :label-width="formLabelWidth">
            <el-input
              v-model="item.num"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <i class="el-icon-error" @click="delGifts(index)"></i>
        </div>
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
      nickName: "",
      phone: "",
      levelId: "",
      levelList: [],
      couponList: [],
      packageInfoList: [],
      packForm: {},
      formLabelWidth: "120px",
      dialogFormVisible: false,
      dialogTitle: "新增",
      giftList: [],
      bannerImg: [],
      detailImg: [],
    };
  },
  methods: {
    // 翻页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getPackageList(val);
    },
    uploadBannerSuccess(fileList){
      if(fileList.length > 0) {
        this.packForm.img = fileList[0].url
      }
    },
    uploadDetailSuccess(fileList){
      if(fileList.length > 0) {
        this.packForm.detailImg = fileList[0].url
      }
    },
    addGift() {
      this.giftList.push({
        couponId: "",
        num: ""
      });
    },
    // 删除优惠券列表
    delGifts(index) {
      this.giftList.splice(index, 1);
    },
    hangdleEdit(row) {
      this.packForm = JSON.parse(JSON.stringify(row));
      this.bannerImg = [
        {
          name: 'bannerImg',
          url: this.packForm.img
        }
      ]
      this.detailImg = [
        {
          name: 'detailImg',
          url: this.packForm.detailImg
        }
      ]
      this.giftList = JSON.parse(this.packForm.gift)
      this.dialogFormVisible = true;
    },
    //addPackItem
    addPackItem() {
      this.dialogTitle = "新增";
      this.dialogFormVisible = true;
      this.packForm = {};
    },
    // 提交
    handleSubmin() {
      let data = {
        id: this.packForm.id,
        packageName: this.packForm.packageName,
        interestDesc: this.packForm.interestDesc,
        packageDesc: this.packForm.packageDesc,
        price: this.packForm.price,
        img: this.packForm.img,
        detailImg: this.packForm.detailImg,
        needCode: this.packForm.needCode,
        teamPerson: this.packForm.teamPerson,
        gift: this.giftList
      };
      this.$axios.savePackageInfo(data).then(() => {
        this.dialogFormVisible = false;
        this.$message.success("操作成功");
        this.getPackageList(1)
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
    // 获取优惠券列表
    allCouponList() {
      this.$axios.allCouponList({}).then(res => {
        this.couponList = res.data.couponList;
      });
    }
  },
  created() {
    this.allCouponList();
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
