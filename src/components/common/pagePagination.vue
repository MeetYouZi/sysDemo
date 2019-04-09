<template>
  <div class="wapper mgt15">
    <el-pagination
      background
      :current-page="pageNum"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "pagePagination",
  props: {
    pageNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 15
    },
    total: {
      type: Number,
      default: 30
    }
  },
  data() {
    return {
      currentPage: "1"
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$emit('handleCurrentChange', this.currentPage)
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.wapper
  display flex
  justify-content flex-end
</style>
