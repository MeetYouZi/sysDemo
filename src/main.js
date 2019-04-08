import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import VCharts from "v-charts";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题

import api from "./api/api";
Vue.prototype.$axios = api;

Vue.use(ElementUI);
Vue.use(VCharts);
Vue.config.productionTip = false;

// 格式化时间
Vue.prototype.dateFormat = function(oDate, fmt) {
  var o = {
    "M+": oDate.getMonth() + 1, //月份
    "d+": oDate.getDate(), //日
    "h+": oDate.getHours(), //小时
    "m+": oDate.getMinutes(), //分
    "s+": oDate.getSeconds(), //秒
    "q+": Math.floor((oDate.getMonth() + 3) / 3), //季度
    "S": oDate.getMilliseconds(),//毫秒
    "W": oDate.getDay() //星期
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (oDate.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}
Vue.prototype.formatNumber = function (a) {
  return a >= 10 ? a : "0" + a
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
