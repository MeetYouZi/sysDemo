<template>
  <div>
    <h4>会员等级</h4>
    <div class="container mgt10">
      <el-button type="primary" @click="handleExplain">会员等级说明</el-button>
      <div class="mgb20 addBar">
        <el-button type="primary" @click="addLevelItem" plain>新增</el-button>
      </div>
      <el-table :data="userLevelList" stripe style="width: 100%">
        <el-table-column prop="levelName" label="等级名称" width="180">
        </el-table-column>
        <el-table-column prop="teamScope" label="团队规模" width="180">
        </el-table-column>
        <el-table-column prop="teamArchitecture" label="团队架构" width="180">
        </el-table-column>
        <el-table-column prop="directlyReward" label="公益补贴" width="180">
        </el-table-column>
        <el-table-column prop="indirectReward" label="推广补贴">
        </el-table-column>
        <el-table-column prop="charityFund" label="公益基金"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              type="warning"
              size="small"
              @click="hangdleEdit(scope.row)"
              >修改</el-button
            >
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
      :title="DialogTitle"
      :visible.sync="dialogLeveVisible"
      width="800px"
    >
      <el-form :model="LeveForm" :rules="rules" ref="levelForm" :inline="true">
        <el-form-item
          label="等级名称"
          :label-width="formLabelWidth"
          class="title"
          prop="levelName"
        >
          <el-input v-model="LeveForm.levelName" autocomplete="off"></el-input>
        </el-form-item>
        <div>
          <el-form-item
            label="正式会员"
            :label-width="formLabelWidth"
            class="title"
            prop="teamPerson"
          >
            <el-radio :disabled="isEdit" v-model="LeveForm.teamPerson" label="0"
              >否</el-radio
            >
            <el-radio :disabled="isEdit" v-model="LeveForm.teamPerson" label="1"
              >是</el-radio
            >
          </el-form-item>
        </div>
        <el-form-item label="团队最少人数" :label-width="formLabelWidth">
          <el-input
            :disabled="isEdit"
            v-model="LeveForm.accomplishMinVal"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="团队最多人数" :label-width="formLabelWidth">
          <el-input
            :disabled="isEdit"
            v-model="LeveForm.accomplishMaxVal"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="公益补贴" :label-width="formLabelWidth">
          <el-input
            v-model="LeveForm.directlyReward"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="推广补贴" :label-width="formLabelWidth">
          <el-input
            v-model="LeveForm.indirectReward"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="公益基金" :label-width="formLabelWidth">
          <el-input
            v-model="LeveForm.manageRewardNum"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <el-button type="primary" @click="addCoupons" plain
            >添加优惠券</el-button
          >
        </el-form-item>
      </el-form>
      <el-form :model="CouponIdList" :inline="true" ref="CouponIdList">
        <div
          class="addReward"
          v-for="(item, index) in CouponIdList.CouponIdList"
          :key="index"
        >
          <el-form-item
            label="选择优惠券"
            :label-width="formLabelWidth"
            :prop="'CouponIdList.' + index + '.couponId'"
            :rules="{
              required: true,
              message: '优惠券不能为空',
              trigger: 'blur'
            }"
          >
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
          <el-form-item
            label="数量"
            :label-width="formLabelWidth"
            :prop="'CouponIdList.' + index + '.num'"
            :rules="{
              required: true,
              message: '数量不能为空',
              trigger: 'blur'
            }"
          >
            <el-input v-model="item.num" autocomplete="off"></el-input>
          </el-form-item>
          <i
            v-if="!isEdit"
            class="el-icon-error"
            @click="delCoupons(index)"
          ></i>
        </div>
      </el-form>
      <el-form :inline="true">
        <div>
          <el-form-item label="团队架构" :label-width="formLabelWidth">
            <el-button
              :disabled="isEdit"
              type="primary"
              @click="addReward"
              plain
              >添加直属等级</el-button
            >
          </el-form-item>
        </div>
      </el-form>
      <el-form :model="RewardList" :inline="true" ref="RewardList">
        <div
          class="addReward"
          v-for="(item, index) in RewardList.RewardList"
          :key="index"
        >
          <el-form-item
            label="选择直属等级"
            :label-width="formLabelWidth"
            :prop="'RewardList.' + index + '.levelId'"
            :rules="{
              required: true,
              message: '直属等级不能为空',
              trigger: 'blur'
            }"
          >
            <el-select
              :disabled="isEdit"
              v-model="item.levelId"
              placeholder="选择直属等级"
              clearable
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
          <el-form-item
            label="数量"
            :label-width="formLabelWidth"
            :prop="'RewardList.' + index + '.num'"
            :rules="{
              required: true,
              message: '数量不能为空',
              trigger: 'blur'
            }"
          >
            <el-input
              :disabled="isEdit"
              v-model="item.num"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <i
            v-if="!isEdit"
            class="el-icon-error"
            @click="delRewardList(index)"
          ></i>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="handleAddLevel('levelForm', 'RewardList', 'CouponIdList')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="会员等级说明"
      :close-on-click-modal="false"
      :visible.sync="dialogEditVisible"
      width="800px"
    >
      <editor @catchData="catchData" :content="levelDesc"></editor>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleWangEditor">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagePagination from "@/components/common/pagePagination";
import Editor from "@/components/common/Editor";
export default {
  name: "membersList",
  components: {
    pagePagination,
    Editor
  },
  data() {
    return {
      totalNum: 0,
      pageNum: 1,
      pageSize: 15,
      userLevelList: [],
      levelList: [],
      couponList: [],
      DialogTitle: "编辑用户等级",
      formLabelWidth: "120px",
      dialogLeveVisible: false,
      dialogDetailVisible: false,
      isEdit: false,
      LeveForm: {
        teamPerson: "1"
      },
      rules: {
        levelName: [
          { required: true, message: "请输入等级名称", trigger: "blur" }
        ],
        teamPerson: [{ required: true, message: "请选择", trigger: "change" }]
      },
      RewardList: {
        RewardList: []
      },
      CouponIdList: {
        CouponIdList: []
      },
      detail: {},
      dialogEditVisible: false,
      levelDesc: "",
      contnet: ""
    };
  },
  methods: {
    handleClose() {
      this.resetForm();
      this.dialogLeveVisible = false;
    },
    resetForm() {
      this.$refs["levelForm"].resetFields();
      this.$refs["RewardList"].resetFields();
      this.$refs["CouponIdList"].resetFields();
    },
    // 会员等级说明
    handleExplain() {
      this.getLevelDesc()
      this.dialogEditVisible = true
    },
    handleWangEditor(){
      let data = {
        desc: this.contnet
      }
      this.$axios.saveLevelDesc(data).then( res => {
        this.$message.success('操作成功')
        this.dialogEditVisible = false
      })
    },
    catchData(val){
      this.contnet = val
    },
    getLevelDesc(){
      this.$axios.getLevelDesc({}).then( res => {
        this.levelDesc = res.data.levelDesc
      })
    },
    // 添加直属等级
    addReward() {
      this.RewardList.RewardList.push({
        levelId: "",
        num: ""
      });
    },
    // 添加优惠券
    addCoupons() {
      this.CouponIdList.CouponIdList.push({
        couponId: "",
        num: ""
      });
    },
    // 删除优惠券列表
    delCoupons(index) {
      this.CouponIdList.CouponIdList.splice(index, 1);
    },
    // 删除优惠券列表
    delRewardList(index) {
      this.RewardList.RewardList.splice(index, 1);
    },
    // 编辑
    hangdleEdit(row) {
      this.DialogTitle = "编辑会员等级";
      let LeveForm = JSON.parse(JSON.stringify(row));
      this.LeveForm = LeveForm;
      let RewardList = LeveForm.additionalConditions
        ? JSON.parse(LeveForm.additionalConditions)
        : [];
      let CouponIdList = LeveForm.manageReward
        ? JSON.parse(LeveForm.manageReward)
        : [];
      this.RewardList.RewardList = RewardList;
      this.LeveForm.teamPerson = String(LeveForm.isTeamPerson);
      CouponIdList.forEach((item, index) => {
        if (item.couponId == "0") {
          this.LeveForm.manageRewardNum = item.num;
          CouponIdList.splice(index, 1);
        }
      });
      this.CouponIdList.CouponIdList = CouponIdList;
      this.dialogLeveVisible = true;
      this.isEdit = true;
    },
    //新增按钮
    addLevelItem() {
      this.LeveForm = {
        teamPerson: "1"
      };
      this.DialogTitle = "新增会员等级";
      this.RewardList.RewardList = [];
      this.CouponIdList.CouponIdList = [];
      this.LeveForm.levelId = "";
      this.dialogLeveVisible = true;
      this.isEdit = false;
    },
    // 新增
    handleAddLevel(formName, RewardList, CouponIdList) {
      var isRewardList = false;
      var isformName = false;
      var isCouponIdList = false;
      this.$refs[CouponIdList].validate(valid => {
        if (valid) {
          isCouponIdList = true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      this.$refs[RewardList].validate(valid => {
        if (valid) {
          isRewardList = true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      this.$refs[formName].validate(valid => {
        if (valid) {
          isformName = true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      if (isRewardList && isformName && isCouponIdList) {
        let manageReward = {
          num: this.LeveForm.manageRewardNum
            ? this.LeveForm.manageRewardNum
            : "",
          couponId: "0"
        };
        this.CouponIdList.CouponIdList.push(manageReward);
        let data = {
          levelId: this.LeveForm.id,
          teamPerson: this.LeveForm.teamPerson,
          levelName: this.LeveForm.levelName,
          accomplishMinVal: this.LeveForm.accomplishMinVal,
          accomplishMaxVal: this.LeveForm.accomplishMaxVal,
          directlyReward: this.LeveForm.directlyReward,
          indirectReward: this.LeveForm.indirectReward,
          manageReward: this.CouponIdList.CouponIdList,
          additionalConditions: this.RewardList.RewardList
        };
        this.submit(data);
      }
    },
    submit(data) {
      this.$axios.saveLevel(data).then(() => {
        this.dialogLeveVisible = false;
        this.resetForm();
        this.$message.success("操作成功");
        this.getUserLevelList(1);
      });
    },
    // 详情
    hangdleDetail(row) {
      console.log(row);
      this.detail = row;
      this.dialogDetailVisible = true;
    },
    // 翻页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getUserLevelList(val);
    },
    // 获取用户等级列表
    getUserLevelList(pageNum) {
      let currentPage = pageNum ? pageNum : 1;
      this.pageNum = currentPage;
      let data = {
        pageSize: this.pageSize,
        pageNum: currentPage
      };
      this.$axios.getUserLevelList(data).then(res => {
        this.totalNum = res.data.totalNum;
        this.userLevelList = res.data.userLevelList;
      });
    },
    // 获取等级列表
    getLevelList() {
      this.$axios.getLevelList().then(res => {
        this.levelList = res.data.levelList;
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
    this.getLevelList();
    this.allCouponList();
    this.getUserLevelList(1);
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
.title .el-input
  width 530px
</style>
