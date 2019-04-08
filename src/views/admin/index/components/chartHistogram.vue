<template>
  <div class="content-bar mgt15">
    <div class="seacher">
      <div class="itemSch">
        <p>分店名称</p>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="itemSch">
        <p>时间</p>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div>
      <ve-histogram :data="chartData" :extend="chartExtend" :settings="chartSettings"></ve-histogram>
    </div>
  </div>
</template>

<script>
export default {
  name: "chartHistogram",
  props: {},
  data() {
    this.chartSettings = {
      metrics: ['访问用户', '下单用户'],
      dimension: ['日期']
    }
    this.chartExtend = {
      legend: {
        orient: 'vertical',
        right: 10,
        top: '40%'
      },
      grid:{
        right: 120,
      },
      series:{
        barWidth: 30,
        itemStyle: {

        }
      }
    }
    return {
      options: [
        {
          value: "深圳分店",
          label: "深圳分店"
        }
      ],
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      }
    };
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.seacher
  display flex
  align-items center
  .itemSch
    margin-right 20px
    display flex
    align-items center
    justify-content flex-start
    p
      padding-right 10px
</style>
