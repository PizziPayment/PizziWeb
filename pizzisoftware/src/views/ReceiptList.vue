<template>
  <v-app>
    <v-container fluid class="background">
      <v-card>
        <v-card-title>
          Last Sales
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
        ></v-data-table>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import moment from 'moment'

export default {
  components: {},

  data: () => ({
    search: "",
    headers: [
      {
        text: "Product",
        align: "start",
        filterable: true,
        value: "name",
      },
      { text: "Price", value: "calories" },
      { text: "Date", value: "date" },
      { text: "Vendor", value: "vendor" },
      { text: "Terminal", value: "terminal" },
    ],
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        date: moment().format('LLL'),
        terminal: 1,
        protein: 4.0,
        vendor: "Sam",
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        date: moment().format('LLL'),
        fat: 9.0,
        terminal: 1,
        carbs: 37,
        protein: 4.3,
        vendor: "Sam",
      },
      {
        name: "Eclair",
        calories: 262,
        date: moment().format('LLL'),
        fat: 16.0,
        terminal: 1,
        carbs: 23,
        protein: 6.0,
        vendor: "Sam",
      },
      {
        name: "Cupcake",
        calories: 305,
        date: moment().format('LLL'),
        fat: 3.7,
        terminal: 1,
        carbs: 67,
        protein: 4.3,
        vendor: "Tom",
      },
      {
        name: "Gingerbread",
        calories: 356,
        fat: 16.0,
        terminal: 1,
        date: moment().format('LLL'),
        carbs: 49,
        protein: 3.9,
        vendor: "John",
      },
      {
        name: "Jelly bean",
        calories: 375,
        date: moment().format('LLL'),
        fat: 0.0,
        carbs: 94,
        terminal: 1,
        protein: 0.0,
        vendor: "Tommy",
      },
      {
        name: "Lollipop",
        calories: 392,
        terminal: 1,
        date: moment().format('LLL'),
        fat: 0.2,
        carbs: 98,
        vendor: "Sam",
      }
    ],
  }),
  methods: {},
};
</script>

<style>
.background {
  height: 100%;
}
</style>
