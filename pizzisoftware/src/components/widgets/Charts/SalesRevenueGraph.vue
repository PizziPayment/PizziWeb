<template>
  <v-card id="sales-revenue-graph">
    <v-card-title>
      <v-chart
        v-if="$vuetify.theme.dark"
        class="chart"
        :option="option"
        theme="dark"
        autoresize
      ></v-chart>
      <v-chart v-else class="chart" :option="option" autoresize></v-chart>
    </v-card-title>
  </v-card>
</template>

<script>
import { use } from "echarts/core";

import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import VChart from "vue-echarts";

use([
  GridComponent,
  BarChart,
  CanvasRenderer,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
]);

export default {
  components: { VChart },
  data() {
    return {
      option: {
        backgroundColor: "rgba(0, 0, 0, 0)",
        grid: {
          left: "20%",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["This year", "Last year"],
          bottom: "bottom",
        },
        title: {
          text: this.$translate.getTranslation("Income"),
          subtext: this.$translate.getTranslation("Updated 10 min ago"),
          padding: [0, 0, 0, 0],
          textStyle: {
            fontWeight: "bold",
          },
          subtextStyle: {
            fontWeight: "italic",
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Last year",
            type: "bar",
            data: [
              2000.0,
              4000.9,
              7000.0,
              2300.2,
              2500.6,
              7600.7,
              1350.6,
              1620.2,
              3200.6,
              2000.0,
              600.4,
              3000.3,
            ],
          },
          {
            name: "This year",
            type: "bar",
            data: [
              2000.6,
              5000.9,
              9000.0,
              2600.4,
              2800.7,
              7000.7,
              1750.6,
              1820.2,
              4800.7,
              180.8,
              6000.0,
              2000.3,
            ],
          },
        ],
      },
    };
  },
};
</script>

<style>
.v-card {
  width: 100%;
}
.chart {
  width: 90%;
  height: 300px;
}
</style>
