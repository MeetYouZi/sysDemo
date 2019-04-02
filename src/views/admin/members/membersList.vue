<template>
  <div>
    <div class="content-bar mgb20 searchBar">
      <div class="searchBar">
        <div class="searchInput">
          <el-input placeholder="请输入昵称" v-model="nickName">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="searchInput">
          <el-input placeholder="请输入手机号" max-length="11" v-model="phone">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="searchInput">
          <el-select v-model="levelId" placeholder="请选择" clearable>
            <el-option
                    v-for="item in levelTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-button type="primary">确定</el-button>
      </div>
    </div>
    <div class="container">
      <el-table :data="userList" stripe style="width: 100%">
        <el-table-column prop="id" label="用户编号" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="180">
        </el-table-column>
        <el-table-column prop="nickName" label="用户昵称" width="180">
        </el-table-column>
        <el-table-column prop="integral" label="账户积分"> </el-table-column>
        <el-table-column prop="balance" label="账户余额"> </el-table-column>
        <el-table-column prop="userState" label="用户状态">
          <template slot-scope="scope">
            {{scope.row.userState == 1 ? '禁止登陆' : '正常登陆'}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <!--<el-button-group>-->
              <el-button v-if="scope.row.userState == 1" type="primary" size="small">允许登陆</el-button>
              <el-button v-if="scope.row.userState == 0" type="danger" size="small">禁止登陆</el-button>
            <!--</el-button-group>-->
          </template>
        </el-table-column>
      </el-table>
    <page-pagination :totalNum="totalNum" :pageNum="pageNum"></page-pagination>
    </div>
  </div>
</template>

<script>
import pagePagination from "@/components/common/pagePagination";
export default {
  name: 'membersList',
  components: {
    pagePagination
  },
  data () {
    return {
      totalNum: 0,
      pageNum: 1,
      nickName: '',
      phone: '',
      levelId: '',
      levelTypeList: [],
      userList: []
    }
  },
  methods: {
    // 获取用户列表
    getUserList(){
      let data = {
        nickName: this.nickName,
        phone: this.phone,
        levelId: this.levelId
      }
      this.$axios('/backManage/getUserList', data, res =>{
        this.totalNum = res.data.total
        this.userList = res.data.userList
      },this)
    },
    // 获取等级列表
    getLevelList(){
      this.$axios('/backManage/getUserList', {}, res =>{
        this.totalNum = res.data.total
        this.userList = res.data.userList
      },this)
    }
  },
  created (){
    this.getLevelList()
    this.getUserList()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>