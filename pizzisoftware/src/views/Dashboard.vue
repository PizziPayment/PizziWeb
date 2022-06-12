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
        <v-col class="mx-6" id="calendar">
          <calendar />
        </v-col>
      </v-row>
      <v-row class="ma-6">
        <sales />
      </v-row>
    </v-container>
    <AppTour :config="configTutorial" @close="panels = [0, 1]" />
  </v-app>
</template>

<script>
// to remove when widget manager finished
import sales from "@/components/widgets/Sales.vue";
import calendar from "@/components/widgets/Calendar/Calendar.vue";
import cashPayment from "@/components/widgets/CashPayment/CashPayment.vue";
import SalesRevenueGraph from "@/components/widgets/Charts/SalesRevenueGraph.vue";
import MostSoldGraph from "@/components/widgets/Charts/MostSoldGraph.vue";
import AppTour from "@/components/core/AppTour.vue";

export default {
  components: {
    cashPayment,
    MostSoldGraph,
    SalesRevenueGraph,
    calendar,
    sales,
    AppTour,
  },
  data: () => ({
    configTutorial: {
      title: "PizziDashboard",
      fields: [
        {
          text: "Welcome to your PizziDashboard",
        },
        {
          id: "drawer-header",
          text: "From here you can monitor your whole business",
        },
        {
          id: "drawer-generate",
          text: "You can generate a receipt...",
        },
        {
          id: "drawer-register",
          text: "You can register your products and modify them...",
        },
        {
          id: "drawer-last-sales",
          text: "View your last sales...",
        },
        {
          id: "drawer-return",
          text: "Or even accept a product return",
        },
        {
          id: ["most-sold-graph", "sales-revenue-graph"],
          text: "From the main page you can monitor some of your activities...",
        },
        {
          id: "cash-payment",
          text: "Accept a cash payment...",
        },
        {
          id: "calendar",
          text: "Or even check your next appointments",
        },
        {
          text:
            "Have a good time with your future essential tool, the PizziDashboard !",
        },
      ],
    },
  }),
};
</script>

<style>
.background {
  height: 100%;
}
</style>
