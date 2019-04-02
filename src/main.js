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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
