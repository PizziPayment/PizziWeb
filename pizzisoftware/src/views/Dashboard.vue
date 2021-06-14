<template>
  <v-app>
    <v-content>
      <v-container fluid class="background">
        <navbar />
        <v-row class="pa-6 d-flex align-center">
          <v-col class="pa-6">
            <cashPayment />
          </v-col>
          <v-col class="pa-6">
            <productReturn />
          </v-col>
        </v-row>
        <v-row class="pa-6">
          <v-col class="pa-6">
            <sales />
          </v-col>
          <v-col class="pa-6">
            <graphs />
          </v-col>
        </v-row>
        <!-- if no widget chosen -->
        <!-- <v-row align="center" justify="center" class="fill-height pb-10">
          <v-col>
            <h1 class="display-4 blue-grey--text text--lighten-4">Welcome Fredo</h1>
            <p class="headline blue-grey--text text--lighten-4">Please select widget(s) you want to work with</p> -->
        <!-- </v-col>
        </v-row> -->
        <!-- -->
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import navbar from "@/components/NavBar.vue";
// to remove when widget manager finished
import sales from "@/components/widgets/Sales.vue";
import productReturn from "@/components/widgets/ProductReturn.vue";
import cashPayment from "@/components/widgets/CashPayment/CashPayment.vue";
import graphs from "@/components/widgets/Graphs.vue";

export default {
  components: { navbar, sales, productReturn, cashPayment, graphs },
  data() {
    return {};
  },
};
</script>

<style>
.background {
  background-color: rgb(40, 50, 55);
  height: 100%;
}
</style>