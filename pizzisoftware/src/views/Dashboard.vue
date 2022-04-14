<template>
  <v-app>
    <v-container fluid class="background">
      <v-row class="my-6">
        <v-col class="mx-6">
          <sales-revenue-graph></sales-revenue-graph>
        </v-col>
        <v-col class="mx-6">
          <most-sold-graph></most-sold-graph>
        </v-col>
      </v-row>
      <v-row class="my-6">
        <v-col class="mx-6">
          <cashPayment />
        </v-col>
        <v-col class="mx-6">
          <calendar />
        </v-col>
      </v-row>
      <v-row class="ma-6">
        <sales/>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// to remove when widget manager finished
import sales from "@/components/widgets/Sales.vue";
import calendar from "@/components/widgets/Calendar/Calendar.vue";
import cashPayment from "@/components/widgets/CashPayment/CashPayment.vue";
import SalesRevenueGraph from "@/components/widgets/Charts/SalesRevenueGraph.vue"
import MostSoldGraph from "@/components/widgets/Charts/MostSoldGraph.vue"




export default {
  components: {calendar, cashPayment, MostSoldGraph, SalesRevenueGraph, sales},
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    addWidget() {
      this.dialog = true;
    }
  }
};
</script>

<style>
.background {
  height: 100%;
}
</style>