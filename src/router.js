import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 平台
const Home = () => import("@/components/common/Home");
const Login = () => import("@/views/login/Login");
const Index = () => import("@/views/admin/index/index");
const store = () => import("@/views/admin/store/store");
const jionUser = () => import("@/views/admin/user/jionUser");
const clerk = () => import("@/views/admin/user/clerk");
const salesman = () => import("@/views/admin/user/salesman");
const allOrder = () => import("@/views/admin/order/allOrder");
const orderReview = () => import("@/views/admin/order/orderReview");
const purchaseOrder = () => import("@/views/admin/order/purchaseOrder");
const pendingOrder = () => import("@/views/admin/order/pendingOrder");
const category = () => import("@/views/admin/product/category");
const productList = () => import("@/views/admin/product/product");
const NewProductReview = () => import("@/views/admin/product/NewProductReview");
const supply = () => import("@/views/admin/supply/supply");
const supplyRecords = () => import("@/views/admin/supply/supplyRecords");
const platformOrders = () => import("@/views/admin/financial/platformOrders");
const expenditure = () => import("@/views/admin/financial/expenditure");
const wage = () => import("@/views/admin/financial/wage");
const storesOrder = () => import("@/views/admin/financial/storesOrder");
const adminSet = () => import("@/views/admin/set/set");
const setRole = () => import("@/views/admin/setRole/setRole");
const message = () => import("@/views/admin/message/message");
const log = () => import("@/views/admin/log/log");
const brand = () => import("@/views/admin/brand/brand");
const area = () => import("@/views/admin/area/area");
// 分店管理平台
const store_index = () => import("@/views/store/index/index");
const store_user = () => import("@/views/store/user/user");
const store_message = () => import("@/views/store/message/message");
const store_product = () => import("@/views/store/product/product");
const store_orderList = () => import("@/views/store/order/orderList");
const store_expenditure = () => import("@/views/store/financial/expenditure");
const store_wage = () => import("@/views/store/financial/wage");
const store_storesOrder = () => import("@/views/store/financial/storesOrder");
const store_Set = () => import("@/views/store/set/set");
const store_log = () => import("@/views/store/log/log");
// 厂商管理
const vendor_index = () => import("@/views/vendor/index/index");
const vendor_product = () => import("@/views/vendor/product/product");
const vendor_orderList = () => import("@/views/vendor/order/orderList");
const vendor_sendproduct = () => import("@/views/vendor/order/sendProduct");
const vendor_orderReport = () => import("@/views/vendor/orderReport/orderReport");
const vendor_Set = () => import("@/views/vendor/set/set");
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
        },
        {
          path: "/jionUser",
          component: jionUser,
          meta: { title: "加盟者管理" }
        },
        {
          path: "/clerk",
          component: clerk,
          meta: { title: "职员员管理" }
        },
        {
          path: "/salesman",
          component: salesman,
          meta: { title: "业务员管理" }
        },
        {
          path: "/allOrder",
          component: allOrder,
          meta: { title: "分店订单管理" }
        },
        // {
        //   path: "/orderReview",
        //   component: orderReview,
        //   meta: { title: "订单审核" }
        // },
        // {
        //   path: "/purchaseOrder",
        //   component: purchaseOrder,
        //   meta: { title: "采购订单" }
        // },
        // {
        //   path: "/pendingOrder",
        //   component: pendingOrder,
        //   meta: { title: "待采购订单" }
        // },
        {
          path: "/category",
          component: category,
          meta: { title: "类目管理" }
        },
        {
          path: "/productList",
          component: productList,
          meta: { title: "商品管理" }
        },
        {
          path: "/NewProductReview",
          component: NewProductReview,
          meta: { title: "新品审核" }
        },
        {
          path: "/supply",
          component: supply,
          meta: { title: "供应商管理" }
        },
        {
          path: "/supplyRecords",
          component: supplyRecords,
          meta: { title: "供应商采购记录" }
        },
        {
          path: "/platformOrders",
          component: platformOrders,
          meta: { title: "平台订单支出" }
        },
        {
          path: "/expenditure",
          component: expenditure,
          meta: { title: "门店财务支出" }
        },
        {
          path: "/wage",
          component: wage,
          meta: { title: "门店工资支出" }
        },
        {
          path: "/storesOrder",
          component: storesOrder,
          meta: { title: "门店订单" }
        },
        {
          path: "/adminSet",
          component: adminSet,
          meta: { title: "系统设置" }
        },
        {
          path: "/setRole",
          component: setRole,
          meta: { title: "角色管理" }
        },
        {
          path: "/message",
          component: message,
          meta: { title: "消息设置" }
        },
        {
          path: "/log",
          component: log,
          meta: { title: "操作日志" }
        },
        {
          path: "/brand",
          component: brand,
          meta: { title: "品牌管理" }
        },
        {
          path: "/area",
          component: area,
          meta: { title: "区域管理" }
        },
        {
          path: "/store_index",
          component: store_index,
          meta: { title: "分店概览" }
        },
        {
          path: "/store_user",
          component: store_user,
          meta: { title: "职员管理" }
        },
        {
          path: "/store_message",
          component: store_message,
          meta: { title: "消息管理" }
        },
        {
          path: "/store_expenditure",
          component: store_expenditure,
          meta: { title: "门店财务支出" }
        },
        {
          path: "/store_product",
          component: store_product,
          meta: { title: "商品管理" }
        },
        {
          path: "/store_orderList",
          component: store_orderList,
          meta: { title: "订单管理" }
        },
        {
          path: "/store_wage",
          component: store_wage,
          meta: { title: "门店工资支出" }
        },
        {
          path: "/store_storesOrder",
          component: store_storesOrder,
          meta: { title: "门店订单" }
        },
        {
          path: "/store_Set",
          component: store_Set,
          meta: { title: "系统设置" }
        },
        {
          path: "/store_log",
          component: store_log,
          meta: { title: "操作日志" }
        },
        {
          path: "/vendor_index",
          component: vendor_index,
          meta: { title: "平台概览" }
        },
        {
          path: "/vendor_product",
          component: vendor_product,
          meta: { title: "商品管理" }
        },
        {
          path: "/vendor_orderList",
          component: vendor_orderList,
          meta: { title: "订单管理" }
        },
        {
          path: "/vendor_sendproduct",
          component: vendor_sendproduct,
          meta: { title: "待发货" }
        },
        {
          path: "/vendor_orderReport",
          component: vendor_orderReport,
          meta: { title: "订单报表" }
        },
        {
          path: "/vendor_Set",
          component: vendor_Set,
          meta: { title: "设置" }
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
