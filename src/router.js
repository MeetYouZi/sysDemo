import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 平台
const Home = () => import("@/components/common/Home");
const Login = () => import("@/views/login/Login");
const Index = () => import("@/views/admin/index/index");
const store = () => import("@/views/admin/store/store");

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/Home"
    },
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: { title: "" },
      children: [
        {
          path: "/Home",
          component: Index,
          meta: { title: "首页" }
        },
        {
          path: "/store",
          component: store,
          meta: { title: "门店管理" }
        }
      ]
    },
    {
      path: "/Login",
      name: "Login",
      component: Login
    }
  ]
});
