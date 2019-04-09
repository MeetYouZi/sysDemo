<template>
  <div>
    <header-box></header-box>
    <div class="content-bar mgt15 searchBar">
      <el-select v-model="value4" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

  </div>
</template>
<script>
import headerBox from "./components/headerBox"
export default {
  name: "all",
  components: {
    headerBox,
  },
  data() {
    return {
      value4: "7",
      options: [
        {
          value: "7",
          label: "7天订单趋势"
        },{
          value: "30",
          label: "30天订单趋势"
        }
      ]
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
