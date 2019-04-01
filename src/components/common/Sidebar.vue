<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <!-- <i :class="item.icon"></i> -->
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >
                  {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <!-- <i :class="item.icon"></i> -->
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../common/bus";

export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: "el-icon-lx-home",
          index: "Home",
          title: "平台概览"
        },
        {
          icon: "el-icon-lx-cascades",
          index: "store",
          title: "门店管理"
        },
        {
          icon: "el-icon-lx-copy",
          index: "allUser",
          title: "人员管理",
          subs: [
            {
              index: "jionUser",
              title: "加盟者管理"
            },
            {
              index: "clerk",
              title: "职员管理"
            }
            // {
            //   index: "salesman",
            //   title: "业务员管理"
            // }
          ]
        },
        {
          icon: "el-icon-lx-calendar",
          index: "order",
          title: "订单管理",
          subs: [
            {
              index: "allOrder",
              title: "分店订单列表"
            }
            // {
            //   index: "3-2",
            //   title: "订单审核"
            //   // subs: [
            //   //     {
            //   //         index: 'editor',
            //   //         title: '富文本编辑器'
            //   //     },
            //   //     {
            //   //         index: 'markdown',
            //   //         title: 'markdown编辑器'
            //   //     },
            //   // ]
            // },
            // {
            //   index: "upload",
            //   title: "未达起购数商品管理"
            // }
          ]
        },
        {
          icon: "el-icon-lx-emoji",
          index: "admin_product",
          title: "商品管理",
          subs: [
            {
              index: "category",
              title: "类目管理"
            },
            {
              index: "productList",
              title: "商品管理"
            }
          ]
        },
        {
          icon: "el-icon-lx-favor",
          index: "NewProductReview",
          title: "新品审核"
        },
        {
          icon: "el-icon-lx-favor",
          index: "supply",
          title: "供应商管理"
        },
        {
          icon: "el-icon-lx-favor",
          index: "supplyRecords",
          title: "供应商采购记录"
        },
        {
          icon: "el-icon-rank",
          index: "6",
          title: "财务报表管理",
          subs: [
            {
              index: "platformOrders",
              title: "平台订单支出"
            },
            {
              index: "expenditure",
              title: "门店财务支出"
            },
            {
              index: "wage",
              title: "门店工资报表"
            },
            {
              index: "storesOrder",
              title: "门店订单报表"
            }
          ]
        },
        {
          icon: "el-icon-lx-favor",
          index: "adminSet",
          title: "系统设置"
        },
        {
          icon: "el-icon-lx-warn",
          index: "setRole",
          title: "角色管理"
        },
        {
          icon: "el-icon-lx-favor",
          index: "message",
          title: "消息管理"
        },
        {
          icon: "el-icon-lx-favor",
          index: "log",
          title: "操作日志"
        },
        {
          icon: "el-icon-lx-favor",
          index: "brand",
          title: "品牌管理"
        },
        {
          icon: "el-icon-lx-favor",
          index: "area",
          title: "区域管理"
        },
        // 分店管理后台
        {
          icon: "el-icon-lx-favor",
          index: "store_index",
          title: "分店概览"
        },
        {
          icon: "el-icon-lx-favor",
          index: "store_user",
          title: "职员管理"
        },
        {
          icon: "el-icon-lx-favor",
          index: "store_message",
          title: "消息管理"
        },
        {
          icon: "el-icon-lx-favor",
          index: "store_product",
          title: "商品管理"
        },
        {
          icon: "el-icon-lx-favor",
          index: "store_orderList",
          title: "订单管理"
        },
        {
          icon: "el-icon-lx-favor",
          index: "store_expend",
          title: "财务报表",
          subs: [
            {
              index: "store_expenditure",
              title: "分店财务支出"
            },
            {
              index: "store_wage",
              title: "门店工资报表"
            },
            {
              index: "store_storesOrder",
              title: "门店订单报表"
            }
          ]
        },
        {
          icon: "el-icon-lx-favor",
          index: "store_Set",
          title: "系统设置"
        },
        {
          icon: "el-icon-lx-favor",
          index: "store_log",
          title: "操作日志"
        },
        // 厂家管理后台
        {
          icon: "el-icon-lx-favor",
          index: "vendor_index",
          title: "平台概览"
        },
        {
          icon: "el-icon-lx-favor",
          index: "vendor_product",
          title: "商品管理"
        },
        {
          icon: "el-icon-lx-favor",
          index: "vendor_order",
          title: "订单管理",
          subs: [
            {
              index: "vendor_orderList",
              title: "订单列表"
            },
            // {
            //   index: "vendor_sendproduct",
            //   title: "待发货"
            // }
          ]
        },
        {
          icon: "el-icon-lx-favor",
          index: "vendor_orderReport",
          title: "订单报表"
        },
        {
          icon: "el-icon-lx-favor",
          index: "vendor_Set",
          title: "系统设置"
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.sidebar > ul {
  height: 100%;
}
</style>
