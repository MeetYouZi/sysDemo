<template>
  <div>
    <h4>订单管理</h4>
    <div class="content-bar mgb20 searchBar">
      <div class="searchBar">
        <div class="searchInput">
          <el-input placeholder="请输入订单编号" v-model="orderId">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="searchInput">
          <el-select v-model="orderState" placeholder="订单状态" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <el-button type="primary" @click="getOrderList(1)">确定</el-button>
      </div>
    </div>
    <div class="container">
      <el-table :data="orderList" stripe style="width: 100%">
        <el-table-column prop="orderId" label="订单编号" width="180">
        </el-table-column>
        <el-table-column prop="totalMoney" label="支付金额" width="180">
        </el-table-column>
        <el-table-column prop="createTime" label="下单时间"> </el-table-column>
        <el-table-column prop="userNickName" label="用户昵称">
        </el-table-column>
        <el-table-column prop="orderState" label="订单状态">
          <template slot-scope="scope">
            <span v-if="scope.row.orderState == 0"> 待支付</span>
            <span v-if="scope.row.orderState == 1"> 待发货</span>
            <span v-if="scope.row.orderState == 2"> 待收货</span>
            <span v-if="scope.row.orderState == 3"> 已完成</span>
            <span v-if="scope.row.orderState == 4"> 取消订单</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button-group>
              <!--<el-button type="primary" size="small">配置权限</el-button>-->
              <el-button
                :disabled="scope.row.orderState != 1"
                type="primary"
                size="small"
                @click="handleelivery(scope.row)"
                >发货</el-button
              >
              <el-button :disabled="scope.row.orderState >= 2 " type="warning" size="small" @click="handleEdit(scope.row)">修改</el-button>
              <el-button type="info" size="small" @click="handleDetail(scope.row)">详情</el-button>
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
    <el-dialog title="编辑订单" :visible.sync="dialogFormVisible">
      <el-form :model="orderForm">
        <el-form-item label="收件人" :label-width="formLabelWidth">
          <el-input v-model="orderForm.acceptName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收件联系电话" :label-width="formLabelWidth">
          <el-input v-model="orderForm.contactPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收件地址" :label-width="formLabelWidth">
          <el-input v-model="orderForm.shippingAddress" type="textarea"
                    :rows="2" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrderInfo"
        >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="dialogDetailVisible" >
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple text-right">订单编号</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">{{detail.orderId}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple text-right">下单时间</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">{{detail.createTime}}</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple text-right">支付金额</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">{{detail.totalMoney}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple text-right">使用优惠券</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">{{detail.userCouponId == '0' ? '否':'是'}}</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple text-right">收件人</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">{{detail.acceptName}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple text-right">收件电话</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">{{detail.contactPhone}}</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple text-right">订单状态</div></el-col>
        <el-col :span="18"><div class="grid-content bg-purple text-left" v-if="detail.orderState == 0">待支付</div></el-col>
        <el-col :span="18"><div class="grid-content bg-purple text-left" v-if="detail.orderState == 1">待发货</div></el-col>
        <el-col :span="18"><div class="grid-content bg-purple text-left" v-if="detail.orderState == 2">待收货</div></el-col>
        <el-col :span="18"><div class="grid-content bg-purple text-left" v-if="detail.orderState == 3">已完成</div></el-col>
        <el-col :span="18"><div class="grid-content bg-purple text-left" v-if="detail.orderState == 4">取消订单</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple text-right">收货地址</div></el-col>
        <el-col :span="18"><div class="grid-content bg-purple text-left">{{detail.shippingAddress}}</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple text-right">邮费</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">{{detail.carriageExpense == 0 ? '包邮' : detail.carriageExpense}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple text-right">用户昵称</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">{{detail.userNickName}}</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple text-right">优惠券名称</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">{{detail.userCoupon.couponName}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple text-right">优惠金额</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">{{detail.userCoupon.amount}}</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple text-right">优惠券类型</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple text-left">
          <span v-if="detail.userCoupon.type == 1"> 满减</span>
          <span v-if="detail.userCoupon.type == 2"> 全场通用抵扣券</span>
          <span v-if="detail.userCoupon.type == 3"> 商品抵扣券</span>
        </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogDetailVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagePagination from "@/components/common/pagePagination";
export default {
  name: "index",
  components: {
    pagePagination
  },
  data() {
    return {
      orderState: "",
      orderId: "",
      options: [
        {
          value: "0",
          label: "待支付"
        },
        {
          value: "1",
          label: "待发货"
        },
        {
          value: "2",
          label: "待收货"
        },
        {
          value: "3",
          label: "已完成"
        },
        {
          value: "4",
          label: "取消订单"
        }
      ],
      orderList: [],
      pageNum: 1,
      pageSize: 15,
      totalNum: 0,
      orderForm: {},
      formLabelWidth: '120px',
      dialogFormVisible: false,
      dialogDetailVisible: false,
      detail: {
        userCoupon: {}
      }
    };
  },
  methods: {
    // 翻页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getOrderList(val);
    },
    handleEdit(row){
      this.dialogFormVisible = true
      this.orderForm = JSON.parse(JSON.stringify(row))
    },
    // 订单详情
    handleDetail(row) {
      this.detail = row
      console.log(this.detail,'row')
      this.dialogDetailVisible = true
    },
    //修改订单
    saveOrderInfo(){
      let data = {
        id: this.orderForm.id,
        shippingAddress: this.orderForm.shippingAddress,
        contactPhone: this.orderForm.contactPhone,
        acceptName: this.orderForm.acceptName,
      }
      this.$axios.saveOrderInfo(data).then(() => {
        this.dialogFormVisible = false
        this.getOrderList(1)
        this.$message.success("操作成功");
      });
    },
    // 发货
    handleelivery(row) {
      let data = {
        id: row.id
      };
      this.$confirm("确定发货?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.updateOrderState(data).then(() => {
            row.orderState = 2;
            this.$message.success("操作成功");
          });
        })
        .catch(() => {
        });
    },
    // 订单列表
    getOrderList(pageNum) {
      let currentPage = pageNum ? pageNum : 1;
      this.pageNum = currentPage;
      let data = {
        orderState: this.orderState,
        orderId: this.orderId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.$axios.orderList(data).then(res => {
        this.totalNum = res.data.totalNum;
        this.orderList = res.data.orderInfoList;
      });
    }
  },
  created() {
    this.getOrderList();
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.el-input
  width 300px
</style>
