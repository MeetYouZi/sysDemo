import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "./store";
import VCharts from "v-charts";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题

Vue.use(ElementUI);
Vue.use(VCharts);
Vue.config.productionTip = false;

var urldata = "";
// var urldata = location.origin
var baseUrl = urldata + "/";
Vue.prototype.baseUrl = baseUrl;

Vue.prototype.xhr = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  crossDomain: true,
  headers: {
    "Content-Type": "application/json"
  }
});
// var loadinginstace
Vue.prototype.xhr.interceptors.request.use(
  config => {
    // loadinginstace = Loading.service({ fullscreen: true, background: 'rgba(255,255,255,.3)' })
    return config;
  },
  error => {
    // loadinginstace.close()
    this.$Message.error({
      message: "加载超时"
    });
    return Promise.reject(error);
  }
);

Vue.prototype.$axios = function(url, data, cb, el, err) {
  Vue.prototype.xhr.post(url, JSON.stringify(data)).then(res => {
    if (res.data.code == 0) {
      cb && cb(res.data);
      //  登录失效
    } else if (res.data.code == "500") {
      el.$message.error("请重新登录");
      localStorage.clear();
      el.$router.replace("/login");
      //  其他错误提示
    } else {
      el.$message.error(res.data.msg);
    }
  });
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
