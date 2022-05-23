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
          <productReturn />
        </v-col>
      </v-row>
      <v-row class="ma-6">
        <sales />
      </v-row>
    </v-container>

    <Tutorial
      :config="configTutorial"
      @event="tutorialEvent($event)"
      @close="panels = [0, 1]"
    />
  </v-app>
</template>

<script>
// to remove when widget manager finished
import sales from "@/components/widgets/Sales.vue";
import productReturn from "@/components/widgets/ProductReturn.vue";
import cashPayment from "@/components/widgets/CashPayment/CashPayment.vue";
import SalesRevenueGraph from "@/components/widgets/Charts/SalesRevenueGraph.vue";
import MostSoldGraph from "@/components/widgets/Charts/MostSoldGraph.vue";
import Tutorial from "@/components/core/Tutorial.vue";

export default {
  components: {
    productReturn,
    cashPayment,
    MostSoldGraph,
    SalesRevenueGraph,
    sales,
    Tutorial,
  },
  data() {
    return {
      dialog: false,
      configTutorial: {
        title: "Tender Card Tutorial",
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
    };
  },
  methods: {
    addWidget() {
      this.dialog = true;
    },
    tutorialEvent(event) {
      console.debug(event);
    },
  },
};
</script>

<style>
.background {
  height: 100%;
}
</style>
