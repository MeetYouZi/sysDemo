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
  // 获取等级列表
  getLevelList() {
    return axios.post("/backManage/getLevelList", {});
  },
  // 获取用户等级列表
  getUserLevelList() {
    return axios.post("/backManage/getUserLevelList", {});
  }
};
export default http;
