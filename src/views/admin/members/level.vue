<template>
  <div>
    <h4>会员等级</h4>
    <div class="container mgt10">
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
        <el-table-column prop="indirectReward" label="推广补贴"> </el-table-column>
        <el-table-column prop="charityFund" label="公益基金"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button
                    type="primary"
                    size="small"
                    @click="hangdleDetail(scope.row)"
            >详情</el-button>
            <el-button
                    type="warning"
                    size="small"
                    @click="hangdleEdit(scope.row)"
            >修改</el-button>
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
    <el-dialog :title="DialogTitle" :visible.sync="dialogLeveVisible" width="800px">
      <el-form :model="LeveForm" :inline="true">
        <el-form-item label="等级id" :label-width="formLabelWidth" class="title">
          <el-input :disabled="true" v-model="LeveForm.levelId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="等级名称" :label-width="formLabelWidth" class="title">
          <el-input v-model="LeveForm.levelName" autocomplete="off"></el-input>
        </el-form-item>
        <div>
          <el-form-item label="正式会员" :label-width="formLabelWidth" class="title">
            <el-radio :disabled="isEdit" v-model="LeveForm.teamPerson" label="0">否</el-radio>
            <el-radio :disabled="isEdit" v-model="LeveForm.teamPerson" label="1">是</el-radio>
          </el-form-item>
        </div>
        <el-form-item label="团队最少人数" :label-width="formLabelWidth">
          <el-input :disabled="isEdit" v-model="LeveForm.accomplishMinVal" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="团队最多人数" :label-width="formLabelWidth">
          <el-input :disabled="isEdit" v-model="LeveForm.accomplishMaxVal" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公益补贴" :label-width="formLabelWidth">
          <el-input :disabled="isEdit" v-model="LeveForm.directlyReward" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="推广补贴" :label-width="formLabelWidth">
          <el-input :disabled="isEdit" v-model="LeveForm.indirectReward" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公益基金" :label-width="formLabelWidth">
          <el-input :disabled="isEdit" v-model="LeveForm.manageReward" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <el-button type="primary" @click="addCoupons" plain>添加优惠券</el-button>
        </el-form-item>
        <div class="addReward" v-for="(item,index) in CouponIdList" :key="index">
          <el-form-item label="选择优惠券" :label-width="formLabelWidth">
            <el-select v-model="item.couponId" placeholder="选择优惠券" clearable>
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
            <el-input :disabled="isEdit" v-model="item.num" autocomplete="off"></el-input>
          </el-form-item>
          <i class="el-icon-error" @click="delCoupons(index)"></i>
        </div>
        <div>
          <el-form-item label="团队架构" :label-width="formLabelWidth">
            <el-button type="primary" @click="addReward" plain>添加直属等级</el-button>
          </el-form-item>
        </div>
        <div class="addReward" v-for="(item,index) in RewardList" :key="index">
          <el-form-item label="选择直属等级" :label-width="formLabelWidth">
            <el-select v-model="item.levelId" placeholder="选择直属等级" clearable>
              <el-option
                      v-for="item2 in levelList"
                      :key="item2.id"
                      :label="item2.levelName"
                      :value="item2.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数量" :label-width="formLabelWidth">
            <el-input :disabled="isEdit" v-model="item.num" autocomplete="off"></el-input>
          </el-form-item>
          <i class="el-icon-error" @click="delRewardList(index)"></i>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLeveVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddLevel">确 定</el-button>
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
      userLevelList: [],
      levelList: [],
      couponList: [],
      DialogTitle: '编辑用户等级',
      formLabelWidth: '120px',
      dialogLeveVisible: false,
      isEdit: false,
      LeveForm: {},
      RewardList: [],
      CouponIdList: []
    };
  },
  methods: {
    // 添加直属等级
    addReward() {
      this.RewardList.push({
        levelId: '',
        num: ''
      })
    },
    // 添加优惠券
    addCoupons(){
      this.CouponIdList.push({
        couponId: '',
        num: ''
      })
    },
    // 删除优惠券列表
    delCoupons(index){
      this.CouponIdList.splice(index, 1)
    },
    // 删除优惠券列表
    delRewardList(index){
      this.RewardList.splice(index, 1)
    },
    // 编辑
    hangdleEdit(row){
      let data = {
        levelId: row.levelId,
        teamPerson: row.teamPerson,
        levelName: row.levelName
      }
      this.LeveForm.levelId = row.levelId
      this.RewardList = []
      this.CouponIdList = []
      this.dialogLeveVisible = true
      this.isEdit = true
      // this.submit(data)
    },
    //新增按钮
    addLevelItem(){
      this.RewardList = []
      this.CouponIdList = []
      this.LeveForm.levelId = ''
      this.dialogLeveVisible = true
      this.isEdit = false
    },
    // 新增
    handleAddLevel(){
      let manageReward = {
        num: this.LeveForm.manageReward,
        couponId: '0',
      }
      this.CouponIdList.push(manageReward)
      let data = {
        levelId: this.LeveForm.levelId,
        teamPerson: this.LeveForm.teamPerson,
        levelName: this.LeveForm.levelName,
        accomplishMinVal: this.LeveForm.accomplishMinVal,
        accomplishMaxVal: this.LeveForm.accomplishMaxVal,
        directlyReward: this.LeveForm.directlyReward,
        indirectReward: this.LeveForm.indirectReward,
        manageReward: this.CouponIdList,
        additionalConditions: this.RewardList,
      }
      this.submit(data)
    },
    submit(data){
      console.log(data,'data')
      this.$axios.saveLevel(data).then( () =>{
        this.$message.success('操作成功')
      })
    },
    // 详情
    hangdleDetail(row){
      console.log(row)
    },
    // 翻页
    handleCurrentChange(val){
      this.pageNum = val
      this.getUserLevelList(val)
    },
    // 获取用户等级列表
    getUserLevelList(pageNum) {
      let currentPage = pageNum ? pageNum : 1
      this.pageNum = currentPage
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
    },// 获取优惠券列表
    allCouponList() {
      this.$axios.allCouponList({}).then(res => {
        this.couponList = res.data.couponList;
      });
    }
  },
  created() {
    this.getLevelList()
    this.allCouponList()
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
