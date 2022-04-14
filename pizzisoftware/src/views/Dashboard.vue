<template>
  <v-app>
    <v-container fluid class="background">
      <v-row class="my-6" id="graph-div">
        <v-col class="mx-6">
          <sales-revenue-graph></sales-revenue-graph>
        </v-col>
        <v-col class="mx-6">
          <most-sold-graph></most-sold-graph>
        </v-col>
      </v-row>
      <v-row class="my-6">
        <v-col class="mx-6" id="cash-payment">
          <cashPayment />
        </v-col>
        <v-col class="mx-6">
          <calendar />
        </v-col>
      </v-row>
      <v-row class="ma-6">
        <sales />
      </v-row>
    </v-container>
    <v-tour name="myTour" :steps="steps"></v-tour>
  </v-app>
</template>

<script>
// to remove when widget manager finished
import sales from "@/components/widgets/Sales.vue";
import calendar from "@/components/widgets/Calendar/Calendar.vue";
import cashPayment from "@/components/widgets/CashPayment/CashPayment.vue";
import SalesRevenueGraph from "@/components/widgets/Charts/SalesRevenueGraph.vue";
import MostSoldGraph from "@/components/widgets/Charts/MostSoldGraph.vue";

export default {
  components: {
    productReturn,
    cashPayment,
    MostSoldGraph,
    SalesRevenueGraph,
    sales,
  },
  data: () => ({
    steps: [
      {
        target: "#app-bar",
        content: `Welcome on your <strong>Pizzi Dashboard</strong>`,
      },
      {
        target: "#graph-div",
        content: `You can consult your <strong>incomes</strong> and <strong>bestsellers</strong>`,
      },
      {
        target: "#cash-button",
        content: `You can accept <strong>cash</strong> quickly from this button<br/>and consult last <strong>cash payments</strong>`,
      },
      {
        target: "#return-product",
        content: `Enter the <strong>Pizzi ID</strong> of a product to accept a return`
      },
      {
        target: '#last-sales',
        content: `View your <strong>latest sales</strong> from this widget`
      },
    ],
  }),
  mounted() {
    console.log(this.$tours);
    this.$tours["myTour"].start();
  },
};
</script>

<style>
.background {
  height: 100%;
}
</style>