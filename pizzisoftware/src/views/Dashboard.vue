<template>
  <v-app>
    <v-container fluid class="background containerThemeStyle">
      <v-row class="my-6">
        <v-col class="mx-6">
          <SalesRevenueGraph />
        </v-col>
        <v-col class="mx-6">
          <MostSoldGraph />
        </v-col>
      </v-row>
      <v-row class="my-6">
        <v-col class="mx-6">
          <CashPayment />
        </v-col>
        <v-col class="mx-6">
          <ProductReturn />
        </v-col>
      </v-row>
      <v-row class="ma-6">
        <Sales />
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// to remove when widget manager finished
import Sales from "@/components/widgets/Sales.vue";
import ProductReturn from "@/components/widgets/ProductReturn.vue";
import CashPayment from "@/components/widgets/CashPayment/CashPayment.vue";
import SalesRevenueGraph from "@/components/widgets/Charts/SalesRevenueGraph.vue";
import MostSoldGraph from "@/components/widgets/Charts/MostSoldGraph.vue";

export default {
  components: {
    ProductReturn,
    CashPayment,
    MostSoldGraph,
    SalesRevenueGraph,
    Sales,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    addWidget() {
      this.dialog = true;
    },
  },
};
</script>

<style lang="scss">
.containerThemeStyle {
  background: var(--pizzi-bg2) !important;
}
.background {
  height: 100%;
}
</style>
