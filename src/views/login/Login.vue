<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-mobile-phone"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          >
            <el-button slot="prepend" icon="el-icon-view"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </div>
        <p class="login-tips">Tips : 忘记密码请联系系统管理员</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
import { mapMutations } from "vuex";
export default {
  data: function() {
    return {
      ruleForm: {
        username: "admin",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
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
            },
            {
              index: "userList",
              title: "管理员列表"
            }
          ]
        }
      ],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            account: this.ruleForm.username,
            password: md5(this.ruleForm.password)
          };
          this.$axios.login(data).then(res => {
            localStorage.setItem("ms_username", res.data.user.userName);
            localStorage.setItem("auth", res.data.user.auth);
            this.changeToken(res.data.token);
            let auth = res.data.user.authIds
            this.changAuth(auth);
            let index = auth[0]
            let path = this.items[index].index
            // this.$router.push("/membersList");
            this.$router.push(`${path}`);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    ...mapMutations(["changeToken", "changAuth"])
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
