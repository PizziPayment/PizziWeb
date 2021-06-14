<template>
  <v-chart class="chart" :option="option" autoresize></v-chart>
</template>

<script>
  import { use } from 'echarts/core'

  import { CanvasRenderer } from 'echarts/renderers'
  import { BarChart} from 'echarts/charts'
  import { GridComponent } from 'echarts/components'
  import VChart from "vue-echarts"

  use([
    GridComponent,
    BarChart,
    CanvasRenderer
  ])

  export default {
    components: { VChart },
    data () {
      return {
        option: {
          xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [1400, 2005, 1500, 1800, 2300, 2110, 2530],
            type: 'bar'
          }]
        }
      }
    }
  }
</script>

<style>
  .chart {
    height: 560px;
  }
</style>