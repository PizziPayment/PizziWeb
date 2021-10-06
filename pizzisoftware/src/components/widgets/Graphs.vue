<template>
  <!-- <v-card style="background-color: rgb(40, 50, 55);" elevation="0">
    <v-tabs v-model="tab" background-color="transparent" color="white" align-with-title dark>
      <v-tab v-for="title in tabTitle" :key="title">
        <span class="text-capitalize headline">{{ title }}</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="pa-6" background-color="transparent">
      <v-tab-item> -->
        <!-- <v-card elevation="0" style="background-color: rgb(40, 50, 55);"> -->
            <!-- <most-sold-graph></most-sold-graph> -->
        <!-- </v-card> -->
      <!-- </v-tab-item>
      <v-tab-item>
        <v-card elevation="0" style="background-color: rgb(40, 50, 55);"> -->
          <sales-revenue-graph></sales-revenue-graph>
        <!-- </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card> -->
</template>


<script>
// import MostSoldGraph from './Charts/MostSoldGraph.vue'
// import SalesRevenueGraph from './Charts/SalesRevenueGraph.vue'

export default {
  // components: { SalesRevenueGraph },
  data () {
    return {
      tabTitle: ['Statistics', 'Revenue'],
      tab: null,
    }
  }
}
</script>

<style>
</style>