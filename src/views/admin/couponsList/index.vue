<<<<<<< HEAD
<template>
  <div>
    <h4>优惠券列表</h4>
    <div class="content-bar mgb20 searchBar">
      <div class="searchBar">
        <div class="searchInput">
          <el-input placeholder="套餐名称" v-model="couponName">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="searchInput">
          <el-select v-model="type" placeholder="请选择" clearable>
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <el-button type="primary" @click="getCouponList(1)">确定</el-button>
        <el-button type="primary" @click="getCouponAdd">新增优惠券</el-button>
      </div>
    </div>
    <div class="container">
      <el-table :data="couponList" stripe style="width: 100%">
        <el-table-column prop="couponNo" label="优惠券编号" width="180">
        </el-table-column>
        <el-table-column prop="couponName" label="优惠券名称" width="180">
        </el-table-column>
        <el-table-column prop="amount" label="优惠金额" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.type != 3">{{ scope.row.amount }}</span>
            <span v-if="scope.row.type == 3">/</span>
          </template>
        </el-table-column>
        <el-table-column prop="fullReductionAmount" label="满减金额">
          <template slot-scope="scope">
            <span v-if="scope.row.type != 1">/</span>
            <span v-if="scope.row.type == 1">{{
              scope.row.fullReductionAmount
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="itemId" label="商品id">
          <template slot-scope="scope">
            <span v-if="scope.row.type != 3">/</span>
            <span v-if="scope.row.type == 3">{{ scope.row.itemId }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="资格码状态">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">满减</span>
            <span v-if="scope.row.type == 2">全场通用抵扣券</span>
            <span v-if="scope.row.type == 3">商品抵扣券</span>
          </template>
        </el-table-column>
        <el-table-column prop="expires" label="有效时间"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <!--<el-button-group>-->
            <el-button
              type="primary"
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="couponForm" :rules="rules" ref="couponForm">
        <el-form-item label="优惠券名称" :label-width="formLabelWidth" prop="couponName">
          <el-input
            v-model="couponForm.couponName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="优惠券类型" :label-width="formLabelWidth" prop="type">
          <el-select v-model="couponForm.type" placeholder="请选择" clearable>
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效期" :label-width="formLabelWidth" >
          <el-date-picker
            v-model="couponForm.expires"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth" prop="type">
          <el-radio v-model="couponForm.isEnable" label="1">是</el-radio>
          <el-radio v-model="couponForm.isEnable" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="优惠金额" :label-width="formLabelWidth">
          <el-input
            :disabled="couponForm.type == 3"
            v-model="couponForm.amount"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="满减金额" :label-width="formLabelWidth">
          <el-input
            :disabled="couponForm.type != 1"
            v-model="couponForm.fullReductionAmount"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品ID" :label-width="formLabelWidth">
          <el-input
            :disabled="couponForm.type != 3"
            v-model="couponForm.itemId"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCoupon('couponForm')">确 定</el-button>
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
      couponName: "",
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
        },
      ],
      rules: {
        couponName: [
          { required: true, message: '请输入优惠券名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择优惠券类型', trigger: 'blur' }
        ],
        isEnable: [
          { required: true, message: '请选择是否启用', trigger: 'blur' }
        ],

      },
      dialogTitle: "编辑优惠券",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      couponList: [],
      couponForm: {}
    };
  },
  methods: {
    // 翻页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getCouponList(val);
    },
    hangdleEdit(row) {
      this.dialogTitle = "编辑优惠券";
      this.couponForm = JSON.parse(JSON.stringify(row));
      this.couponForm.expires = [this.couponForm.startTime.slice(0,10),this.couponForm.endTime.slice(0,10)]
      this.dialogFormVisible = true;
    },
    // 新增
    getCouponAdd() {
      this.couponForm = {};
      this.dialogTitle = "新增优惠券";
      this.dialogFormVisible = true;
    },
    // 保存
    saveCoupon(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            id: this.couponForm.id,
            couponName: this.couponForm.couponName,
            type: this.couponForm.type,
            startTime: this.couponForm.expires[0],
            endTime: this.couponForm.expires[1],
            isEnable: this.couponForm.isEnable,
            amount: this.couponForm.amount ? this.couponForm.amount : '',
            fullReductionAmount: this.couponForm.fullReductionAmount ? this.couponForm.fullReductionAmount : '',
            itemId: this.couponForm.itemId ? this.couponForm.itemId : ''
          };
          this.$axios.saveCoupon(data).then(res => {
            this.$message.success("操作成功");
            this.dialogFormVisible = false;
            this.getCouponList(1);
          });
        } else {
          return false;
        }
      });


    },
    // 获取用户列表
    getCouponList(pageNum) {
      let currentPage = pageNum ? pageNum : 1;
      this.pageNum = currentPage;
      let data = {
        couponName: this.couponName,
        type: this.type,
        pageSize: this.pageSize,
        pageNum: currentPage
      };
      this.$axios.couponList(data).then(res => {
        this.totalNum = res.data.totalNum;
        this.couponList = res.data.couponList;
      });
    }
  },
  created() {
    this.getCouponList(1);
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.el-input
  width 300px
</style>
=======
<template>
  <div>
    <h4>优惠券列表</h4>
    <div class="content-bar mgb20 searchBar">
      <div class="searchBar">
        <div class="searchInput">
          <el-input placeholder="套餐名称" v-model="couponName">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="searchInput">
          <el-select v-model="type" placeholder="请选择" clearable>
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <el-button type="primary" @click="getCouponList(1)">确定</el-button>
        <el-button type="primary" @click="getCouponAdd">新增优惠券</el-button>
      </div>
    </div>
    <div class="container">
      <el-table :data="couponList" stripe style="width: 100%">
        <el-table-column prop="couponNo" label="优惠券编号" width="180">
        </el-table-column>
        <el-table-column prop="couponName" label="优惠券名称" width="180">
        </el-table-column>
        <el-table-column prop="amount" label="优惠金额" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.type != 3">{{ scope.row.amount }}</span>
            <span v-if="scope.row.type == 3">/</span>
          </template>
        </el-table-column>
        <el-table-column prop="fullReductionAmount" label="满减金额">
          <template slot-scope="scope">
            <span v-if="scope.row.type != 1">/</span>
            <span v-if="scope.row.type == 1">{{
              scope.row.fullReductionAmount
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="itemId" label="商品id">
          <template slot-scope="scope">
            <span v-if="scope.row.type != 3">/</span>
            <span v-if="scope.row.type == 3">{{ scope.row.itemId }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="资格码状态">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">满减</span>
            <span v-if="scope.row.type == 2">全场通用抵扣券</span>
            <span v-if="scope.row.type == 3">商品抵扣券</span>
          </template>
        </el-table-column>
        <el-table-column prop="expires" label="有效时间"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <!--<el-button-group>-->
            <el-button
              type="primary"
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="couponForm" :rules="rules" ref="couponForm">
        <el-form-item label="优惠券名称" :label-width="formLabelWidth" prop="couponName">
          <el-input
            v-model="couponForm.couponName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="优惠券类型" :label-width="formLabelWidth" prop="type">
          <el-select v-model="couponForm.type" placeholder="请选择" clearable>
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="couponForm.expires"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth">
          <el-radio v-model="couponForm.isEnable" label="1">是</el-radio>
          <el-radio v-model="couponForm.isEnable" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="优惠金额" :label-width="formLabelWidth">
          <el-input
            :disabled="couponForm.type == 3"
            v-model="couponForm.amount"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="满减金额" :label-width="formLabelWidth">
          <el-input
            :disabled="couponForm.type != 1"
            v-model="couponForm.fullReductionAmount"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品ID" :label-width="formLabelWidth">
          <el-input
            :disabled="couponForm.type != 3"
            v-model="couponForm.itemId"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCoupon('couponForm')">确 定</el-button>
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
      couponName: "",
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
        },
      ],
      rules: {
        couponName: [
          { required: true, message: '请输入优惠券名称', trigger: 'blur' }
        ]
      },
      dialogTitle: "编辑优惠券",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      couponList: [],
      couponForm: {}
    };
  },
  methods: {
    // 翻页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getCouponList(val);
    },
    hangdleEdit(row) {
      this.dialogTitle = "编辑优惠券";
      this.couponForm = JSON.parse(JSON.stringify(row));
      this.couponForm.expires = [this.couponForm.startTime.slice(0,10),this.couponForm.endTime.slice(0,10)]
      this.dialogFormVisible = true;
    },
    // 新增
    getCouponAdd() {
      this.couponForm = {};
      this.dialogTitle = "新增优惠券";
      this.dialogFormVisible = true;
    },
    // 保存
    saveCoupon(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            id: this.couponForm.id,
            couponName: this.couponForm.couponName,
            type: this.couponForm.type,
            startTime: this.couponForm.expires[0],
            endTime: this.couponForm.expires[1],
            isEnable: this.couponForm.isEnable,
            amount: this.couponForm.amount ? this.couponForm.amount : '',
            fullReductionAmount: this.couponForm.fullReductionAmount ? this.couponForm.fullReductionAmount : '',
            itemId: this.couponForm.itemId ? this.couponForm.itemId : ''
          };
          this.$axios.saveCoupon(data).then(res => {
            this.$message.success("操作成功");
            this.dialogFormVisible = false;
            this.getCouponList(1);
          });
        } else {
          return false;
        }
      });


    },
    // 获取用户列表
    getCouponList(pageNum) {
      let currentPage = pageNum ? pageNum : 1;
      this.pageNum = currentPage;
      let data = {
        couponName: this.couponName,
        type: this.type,
        pageSize: this.pageSize,
        pageNum: currentPage
      };
      this.$axios.couponList(data).then(res => {
        this.totalNum = res.data.totalNum;
        this.couponList = res.data.couponList;
      });
    }
  },
  created() {
    this.getCouponList(1);
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.el-input
  width 300px
</style>
>>>>>>> 4a41ad2eabf3f55336469c6c4d9dc9a59033ec45
