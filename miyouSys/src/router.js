import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 平台
const Home = () => import("@/components/common/Home");
const Login = () => import("@/views/login/Login");
const Index = () => import("@/views/admin/index/index");
const membersList = () => import("@/views/admin/members/membersList");
const level = () => import("@/views/admin/members/level");
const integral = () => import("@/views/admin/members/integral");
const withdrawal = () => import("@/views/admin/members/withdrawal");
const productList = () => import("@/views/admin/product/productList");
const classification = () => import("@/views/admin/product/classification");
const orderList = () => import("@/views/admin/orderList/index");
const sampleList = () => import("@/views/admin/sampleList/index");
const packageList = () => import("@/views/admin/package/packageList");
const packageRecord = () => import("@/views/admin/package/packageRecord");
const packageCode = () => import("@/views/admin/package/packageCode");
const packCodeList = () => import("@/views/admin/package/packCodeList");
const couponsList = () => import("@/views/admin/couponsList/index");
const bannerList = () => import("@/views/admin/set/bannerList");
const modify = () => import("@/views/admin/set/modify");

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: { title: "" },
      children: [
        {
          path: "/home",
          component: Index,
          meta: { title: "首页" }
        },
        {
          path: "/membersList",
          component: membersList,
          meta: { title: "会员列表" }
        },
        {
          path: "/level",
          component: level,
          meta: { title: "会员等级" }
        },
        {
          path: "/integral",
          component: integral,
          meta: { title: "积分" }
        },
        {
          path: "/withdrawal",
          component: withdrawal,
          meta: { title: "提现" }
        },
        {
          path: "/productList",
          component: productList,
          meta: { title: "商品列表" }
        },
        {
          path: "/classification",
          component: classification,
          meta: { title: "商品分类" }
        },
        {
          path: "/orderList",
          component: orderList,
          meta: { title: "订单管理" }
        },
        {
          path: "/sampleList",
          component: sampleList,
          meta: { title: "样品类表" }
        },
        {
          path: "/packageList",
          component: packageList,
          meta: { title: "套餐列表" }
        },
        {
          path: "/packageRecord",
          component: packageRecord,
          meta: { title: "套餐购买记录" }
        },
        {
          path: "/packCodeList",
          component: packCodeList,
          meta: { title: "资格码列表" }
        },
        {
          path: "/packageCode",
          component: packageCode,
          meta: { title: "资格码生成" }
        },
        {
          path: "/couponsList",
          component: couponsList,
          meta: { title: "优惠券列表" }
        },
        {
          path: "/bannerList",
          component: bannerList,
          meta: { title: "首页轮播图" }
        },
        {
          path: "/modify",
          component: modify,
          meta: { title: "修改密码" }
        }
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});
