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
    cashPayment,
    MostSoldGraph,
    SalesRevenueGraph,
    calendar,
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
        target: '#last-sales',
        content: `View your <strong>latest sales</strong> from this widget`
      },
      {
        target: '#drawer-header',
        content: `Pizzi also allows you <strong>to</strong> ...`,
      },
      {
        target: '#drawer-generate',
        content: `Generate a receipt,`,
      },
      {
        target: '#drawer-register',
        content: `Add a product to your inventory,`
      },
      {
        target: '#drawer-return',
        content: `Accept the return of a product`
      }
    ],
  }),
};
</script>

<style>
.background {
  height: 100%;
}
</style>