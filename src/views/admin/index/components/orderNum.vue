<template>
  <div class="orderNum mgt15">
    <div class="leftData">
      <div class="yesterdayOrder">
        <p class="name">昨日订货笔数</p>
        <p>12</p>
      </div>
      <div class="yesterdayTotal">
        <p class="name">昨日收益</p>
        <p>12</p>
      </div>
    </div>
    <div class="chartData">
      <ve-line :data="chartData"></ve-line>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderNum',
  data () {
    return {
      chartData: {
        columns: ['日期', '下单笔数'],
        rows: [
          { '日期': '2016', '下单笔数': 1393 },
          { '日期': '2017', '下单笔数': 3530 },
          { '日期': '2018', '下单笔数': 292 },
          { '日期': '2019', '下单笔数': 1723 },
          { '日期': '2020', '下单笔数': 3792 },
          { '日期': '2021', '下单笔数': 4593 }
        ]
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.orderNum
  width 100%
  height 400px
  background #ffffff
  display flex
  justify-content space-between
  align-items center
  .leftData
    width 300px
    height 400px
    display flex
    flex-direction column
    justify-content center
    align-items center
    border-right 10px solid #f2f2f2
    box-sizing border-box
    .yesterdayOrder
      border-bottom 10px solid #f2f2f2
    .yesterdayOrder,.yesterdayTotal
      width 300px
      flex 1
      display flex
      flex-direction column
      justify-content center
      align-items center
    .name
      font-size 22px
  .chartData
    flex 1
</style>