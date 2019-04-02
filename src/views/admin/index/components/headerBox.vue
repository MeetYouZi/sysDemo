<template>
  <div class="container headerBox">
    <div class="dataItem" v-for="(item,index) in DataList" :key="index">
      <p class="numBox">{{item.num}}</p>
      <p>{{item.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "headerBox",
  data() {
    return {
      DataList: [
        {
          name: "门店总数量",
          num: "34.00"
        },{
          name: "近7天订单笔数",
          num: "34.00"
        },{
          name: "近30天订单笔数",
          num: "34.00"
        }
      ]
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.headerBox
  display flex
  align-items center
  justify-content center
  .dataItem
    flex 1
    text-align center
    border-right 1px solid #f2f2f2
    &:last-child
      border-right 0px solid #ffffff
    .numBox
      font-size 40px
</style>