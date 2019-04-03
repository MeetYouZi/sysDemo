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
  // 添加/修改 用户等级
  saveLevel(data) {
    return axios.post("/backManage/saveLevel", JSON.stringify(data));
  },
  // 获取所有优惠券
  allCouponList(data) {
    return axios.post("/backManage/allCouponList", JSON.stringify(data));
  },
  // 添加商品分类
  addCategory(data) {
    return axios.post("/backManage/addCategory", JSON.stringify(data));
  },
  // 新增商品
  addItem(data) {
    return axios.post("/backManage/addItem", JSON.stringify(data));
  },
  // 新增商品
  updateItem(data) {
    return axios.post("/backManage/updateItem", JSON.stringify(data));
  }
};
export default http;
