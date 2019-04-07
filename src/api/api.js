import axios from "@/api/http";
const http = {
  // 登录
  login(data) {
    return axios.post("/backManage/login", JSON.stringify(data));
  },
  // 会员列表
  getUserList(data) {
    return axios.post("/backManage/getUserList", JSON.stringify(data));
  },
  // 获取所有等级列表
  getLevelList() {
    return axios.post("/backManage/getLevelList", {});
  },
  // 获取用户等级列表
  getUserLevelList(data) {
    return axios.post("/backManage/getUserLevelList", JSON.stringify(data));
  },
  // 禁止登陆/允许登陆
  banLogin(data) {
    return axios.post("/backManage/banLogin", JSON.stringify(data));
  },
  // 积分列表
  integralRecordList(data) {
    return axios.post("/backManage/integralRecordList", JSON.stringify(data));
  },
  // 用户提现申请
  withdrawApplyList(data) {
    return axios.post("/backManage/withdrawApplyList", JSON.stringify(data));
  },
  // 处理用户提现申请
  handleWithdraw(data) {
    return axios.post("/backManage/handleWithdraw", JSON.stringify(data));
  },
  // 添加/修改 用户等级
  saveLevel(data) {
    return axios.post("/backManage/saveLevel", JSON.stringify(data));
  },
  // 获取所有优惠券
  allCouponList(data) {
    return axios.post("/backManage/allCouponList", JSON.stringify(data));
  },
  // 商品列表
  itemList(data) {
    return axios.post("/backManage/itemList", JSON.stringify(data));
  },
  // 新增/修改商品
  saveItem(data) {
    return axios.post("/backManage/saveItem", JSON.stringify(data));
  },
  // 新增/修改商品
  allItemCategoryList(data) {
    return axios.post("/backManage/allItemCategoryList", JSON.stringify(data));
  },
  // 商品分类
  itemCategoryList(data) {
    return axios.post("/backManage/itemCategoryList", JSON.stringify(data));
  },
  // 添加商品分类
  saveItemCategory(data) {
    return axios.post("/backManage/saveItemCategory", JSON.stringify(data));
  },
  // 订单列表
  orderList(data) {
    return axios.post("/backManage/orderList", JSON.stringify(data));
  },
  // 发货
  updateOrderState(data) {
    return axios.post("/backManage/updateOrderState", JSON.stringify(data));
  },
  // 修改订单
  saveOrderInfo(data) {
    return axios.post("/backManage/saveOrderInfo", JSON.stringify(data));
  },
  // 绑定样品列表
  sampleList(data) {
    return axios.post("/backManage/sampleList", JSON.stringify(data));
  },
  // 绑定样品列表
  saveSample(data) {
    return axios.post("/backManage/saveSample", JSON.stringify(data));
  },
  // 套餐列表
  packageList(data) {
    return axios.post("/backManage/packageList", JSON.stringify(data));
  },
  // 套餐列表
  savePackageInfo(data) {
    return axios.post("/backManage/savePackageInfo", JSON.stringify(data));
  },
  // 套餐列表
  buyPackageRecord(data) {
    return axios.post("/backManage/buyPackageRecord", JSON.stringify(data));
  },
  // 资格码列表
  packageCodeList(data) {
    return axios.post("/backManage/packageCodeList", JSON.stringify(data));
  },
  // 资格码生成
  generateCode(data) {
    return axios.post("/backManage/generateCode", JSON.stringify(data));
  },
  // 优惠券列表
  couponList(data) {
    return axios.post("/backManage/couponList", JSON.stringify(data));
  },
  // 新增编辑优惠券
  saveCoupon(data) {
    return axios.post("/backManage/saveCoupon", JSON.stringify(data));
  },
  // bannerList
  homeBannerList(data) {
    return axios.post("/backManage/homeBannerList", JSON.stringify(data));
  },
  //saveBanner
  saveBanner(data) {
    return axios.post("/backManage/saveBanner", JSON.stringify(data));
  },
  //saveBanner
  changePassword(data) {
    return axios.post("/backManage/changePassword", JSON.stringify(data));
  },


};
export default http;
