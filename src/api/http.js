import Vue from "vue";
import axios from "axios";
import { Loading } from "element-ui";
import ElementUI from "element-ui";
import router from "../router";
import store from "../store/store";
import base from "./base";
import { Message } from 'element-ui';

Vue.use(ElementUI);

var baseUrl = base.url;
var token = "";
var loadinginstace;
// axios.defaults.timeout = 10000;

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: "/login",
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
};

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 301: 正常错误
    case '301':
        Message.error(other);
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case '403':
      Message.error("登录过期，请重新登录");
      localStorage.removeItem("token");
      store.commit("loginSuccess", null);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case '404':
      Message.error("请求的资源不存在");
      break;
    default:
      Message.error("发生一个错误");
      console.log(other);
  }
};

var instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  crossDomain: true,
  headers: {
    "Content-Type": "application/json",
    token: token
  }
});
instance.interceptors.request.use(
  config => {
    config.headers.token = `Bearer ${store.state.token}`;
    loadinginstace = Loading.service({
      fullscreen: true,
      background: "rgba(255,255,255,.3)"
    });
    // setTimeout(() => {
    //   loadinginstace.close();
    // }, 6000);
    return config;
  },
  error => {
    loadinginstace.close();
    this.$message.error({
      message: "加载超时"
    });
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    loadinginstace.close();
    if (response.data.code == '200') {
      return response.data;
    } else {
      errorHandle(response.data.code, response.data.msg);
        return Promise.reject(response);
    }
  },
  error => {
    // 对响应错误做点什么
    if (error) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(error.data.code, error.data.msg);
      return Promise.reject(error);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    }
  }
);
export default instance;
// export function $axios(url, data) {
//   return new Promise((resolve, reject) => {
//     axios
//       .post(url, JSON.stringify(data))
//       .then(res => {
//         resolve(res.data);
//       })
//       .catch(err => {
//         reject(err.data);
//       });
//   });
// }
