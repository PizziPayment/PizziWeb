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
     <AppTour
      :config="configTutorial"
      @event="tutorialEvent($event)"
      @close="panels = [0, 1]"
    />
  </v-app>
</template>

<script>
// to remove when widget manager finished
import sales from "@/components/widgets/Sales.vue";
import calendar from "@/components/widgets/Calendar/Calendar.vue";
import cashPayment from "@/components/widgets/CashPayment/CashPayment.vue";
import SalesRevenueGraph from "@/components/widgets/Charts/SalesRevenueGraph.vue";
import MostSoldGraph from "@/components/widgets/Charts/MostSoldGraph.vue";
import AppTour from "@/components/core/AppTour.vue"

export default {
  components: {
    cashPayment,
    MostSoldGraph,
    SalesRevenueGraph,
    calendar,
    sales,
    AppTour
  },
  data: () => ({
    configTutorial: {
      title: "PizziDashboard",
      fields: [
        {
          id: "shopCard",
          text: "Your shop information",
          borderRadius: "15px",
        },
        {
          id: "DashboardLink",
          text: "Link to Dashboard",
        },
        {
          id: "GenerateReceiptLink",
          text: "Link to Blabla",
        },
        {
          id: ["DashboardLink", "GenerateReceiptLink"],
          text: "tu peux faire aussi du multi id ",
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