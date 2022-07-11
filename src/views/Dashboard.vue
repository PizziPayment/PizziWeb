<template>
  <v-app>
    <v-container fluid class="background containerThemeStyle">
      <v-row class="my-6" id="graph-div">
        <v-col class="mx-6">
          <SalesRevenueGraph />
        </v-col>
        <v-col class="mx-6">
          <MostSoldGraph />
        </v-col>
      </v-row>
      <v-row class="my-6">
        <v-col class="mx-6" id="cash-payment">
          <CashPayment />
        </v-col>
        <v-col class="mx-6" id="calendar">
          <Calendar />
        </v-col>
      </v-row>
      <v-row class="ma-6">
        <Sales />
      </v-row>
    </v-container>
    <AppTour :config="configTutorial" />
  </v-app>
</template>

<script>
// to remove when widget manager finished
import CashPayment from "@/components/widgets/CashPayment/CashPayment.vue";
import SalesRevenueGraph from "@/components/widgets/Charts/SalesRevenueGraph.vue";
import MostSoldGraph from "@/components/widgets/Charts/MostSoldGraph.vue";
import Sales from "@/components/widgets/Sales.vue";
import Calendar from "@/components/widgets/Calendar/Calendar.vue";
import AppTour from "@/components/core/AppTour.vue";

import { mapGetters, mapActions } from "vuex";
import axios from "axios";


export default {
  components: {
    CashPayment,
    MostSoldGraph,
    SalesRevenueGraph,
    Calendar,
    Sales,
    AppTour,
  },
  data: () => ({
    configTutorial: {
      oneTry: true,
      title: "PizziDashboard",
      homePage: {
        title: "PizziDashboard",
        description: "Learn the basics of this page through this tutorial",
        annotation: "Replay this tutorial at any time from settings",
      },
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
  mounted() {
    this.loadShopInfos()
  },
  computed: {
    ...mapGetters('defaultStore', [
      'getAccessToken',
    ])
  },
  methods: {
    ...mapActions("defaultStore", ["setShopInfos"]),
    loadShopInfos() {
      const bearerAuth = {
        Authorization: "Bearer " + this.getAccessToken,
      };
      axios
        .get(process.env.VUE_APP_RESOURCE_URL + "/shops", {
          headers: bearerAuth,
        })
        .then((response) => {
          this.setShopInfos(response.data)
        })
    }
  }
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
