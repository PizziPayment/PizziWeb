<template>
  <v-card class="themeStyleCard" id="most-sold-graph">
    <v-card-title>
      <v-chart
        class="chart themeStyleCard"
        :option="option"
        :theme="isDarkTheme ? 'dark' : ''"
        autoresize
      ></v-chart>
    </v-card-title>
  </v-card>
</template>

<script>
import { use } from "echarts/core";

import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { mapState } from "vuex";

use([
  CanvasRenderer,
  PieChart,
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
          trigger: "item",
        },
        legend: {
          orient: "horizontal",
          bottom: "bottom",
        },
        title: {
          text: "Best Sellers",
          subtext: "Updated 10 min ago",
          padding: [0, 0, 0, 0],
          textStyle: {
            fontWeight: "bold",
          },
          subtextStyle: {
            fontWeight: "italic",
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.updateOptionsColor();
  },
  computed: {
    ...mapState("defaultStore", ["isDarkTheme"]),
  },
  methods: {
    updateOptionsColor() {
      if (this.isDarkTheme) {
        this.option.title.textStyle.color = "white";
      } else {
        this.option.title.textStyle.color = "#02c39a";
      }
    },
  },
  watch: {
    isDarkTheme() {
      this.updateOptionsColor();
    },
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
