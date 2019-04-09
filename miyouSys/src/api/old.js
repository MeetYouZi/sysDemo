import { Loading } from "element-ui";
// var urldata = location.origin
var baseUrl = "http://119.23.229.131:8002/api/v1";
Vue.prototype.baseUrl = baseUrl;

var token = "";
console.log(store.state.token, "token.mainjs");
Vue.prototype.xhr = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  crossDomain: true,
  headers: {
    "Content-Type": "application/json",
    token: token
  }
});
var loadinginstace;
Vue.prototype.xhr.interceptors.request.use(
  config => {
    config.headers.token = `Bearer ${store.state.token}`;
    loadinginstace = Loading.service({
      fullscreen: true,
      background: "rgba(255,255,255,.3)"
    });
    // setTimeout(() => {
    //   loadinginstace.close();
    // }, 3000);
    return config;
  },
  error => {
    loadinginstace.close();
    this.$Message.error({
      message: "加载超时"
    });
    return Promise.reject(error);
  }
);
Vue.prototype.xhr.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    loadinginstace.close();
    console.log(response, "response");
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
Vue.prototype.$axios = function(url, data, cb, el, err) {
  Vue.prototype.xhr.post(url, JSON.stringify(data)).then(res => {
    if (res.data.code == 200) {
      cb && cb(res.data);
      //  登录失效
    } else if (res.data.code == "403") {
      el.$message.error("请重新登录");
      localStorage.clear();
      el.$router.replace("/login");
      //  其他错误提示
    } else if (res.data.code == 301) {
      el.$message.error(res.data.msg);
    } else {
      el.$message.error("系统错误");
    }
  });
};
