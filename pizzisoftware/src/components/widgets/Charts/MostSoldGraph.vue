<template>
  <v-chart class="chart" :option="option" autoresize></v-chart>
</template>


<script>
  import { use } from 'echarts/core'

  import { CanvasRenderer } from 'echarts/renderers'
  import { PieChart } from 'echarts/charts'
  import { TooltipComponent, LegendComponent } from 'echarts/components'
  import VChart from "vue-echarts"

  use([
    CanvasRenderer,
    PieChart,
    TooltipComponent,
    LegendComponent,
  ])
  export default {
    components: { VChart },
    data () {
      return {
        option : {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            bottom: '5%',
            left: 'center',
            textStyle: {
              color: '#fff'
            }
          },
          series: [
            {
              name: 'Most Sold',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 2
              },
              label: {
                  show: false,
                  position: 'center'
              },
              emphasis: {
                  label: {
                      show: true,
                      fontSize: '25',
                      fontWeight: 'bold',
                  }
              },
              labelLine: {
                  show: false
              },
              data: [
                {value: 1048, name: 'Coupe Femme'},
                {value: 735, name: 'Coupe Enfant'},
                {value: 580, name: 'Couleur Femme'},
                {value: 484, name: 'Coupe Homme'},
                {value: 300, name: 'Coupe Etudiant'}
              ]
            }
          ]
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
