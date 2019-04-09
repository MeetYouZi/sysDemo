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
               <i :class="item.icon"></i>
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
             <i :class="item.icon"></i>
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
        // {
        //   icon: "el-icon-menu",
        //   index: "home",
        //   title: "首页"
        // },
        {
          icon: "el-icon-date",
          index: "members",
          title: "会员管理",
          subs: [
            {
              index: "membersList",
              title: "会员列表"
            },
            {
              index: "level",
              title: "等级管理"
            },
            {
              index: "integral",
              title: "积分记录"
            },
            {
              index: "withdrawal",
              title: "用户提现申请"
            }
          ]
        },
        {
          icon: "el-icon-goods",
          index: "product",
          title: "商品管理",
          subs: [
            {
              index: "productList",
              title: "商品列表"
            },
            {
              index: "classification",
              title: "商品分类"
            }
          ]
        },
        {
          icon: "el-icon-document",
          index: "orderList",
          title: "订单管理",
        },
        {
          icon: "el-icon-printer",
          index: "sampleList",
          title: "绑定样品管理",
        },
        {
          icon: "el-icon-rank",
          index: "package",
          title: "套餐管理",
          subs: [
            {
              index: "packageList",
              title: "套餐列表"
            },
            {
              index: "packageRecord",
              title: "套餐购买记录"
            },
            {
              index: "packCodeList",
              title: "资格码列表"
            }
            // {
            //   index: "packageCode",
            //   title: "资格码生成"
            // }
          ]
        },
        {
          icon: "el-icon-tickets",
          index: "couponsList",
          title: "优惠券列表",
        },
        {
          icon: "el-icon-setting",
          index: "set",
          title: "设置",
          subs: [
            {
              index: "bannerList",
              title: "首页轮播图"
            },
            {
              index: "modify",
              title: "修改密码"
            }
          ]
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
