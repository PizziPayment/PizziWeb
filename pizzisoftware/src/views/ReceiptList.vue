<template>
  <v-app class="containerThemeStyle">
    <v-container fluid class="background containerThemeStyle">
      <v-card>
        <v-card-title>
          {{ $translate.getTranslation("Last Sales") }}
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
import moment from "moment";
import axios from "axios";
import Bugsnag from "@bugsnag/js";
import { mapGetters } from "vuex";

export default {
  components: {},

  data: () => ({
    search: "",
    receipts: [],
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
        name: "Coupe Homme",
        calories: 159,
        date: moment().format("LLL"),
        terminal: 1,
        protein: 4.0,
        vendor: "Sam",
      },
      {
        name: "Coupe Homme",
        calories: 262,
        date: moment().format("LLL"),
        fat: 16.0,
        terminal: 1,
        carbs: 23,
        protein: 6.0,
        vendor: "Sam",
      },
      {
        name: "Shampoo",
        calories: 305,
        date: moment().format("LLL"),
        fat: 3.7,
        terminal: 1,
        carbs: 67,
        protein: 4.3,
        vendor: "Tom",
      },
      {
        name: "Coupe Femme",
        calories: 356,
        fat: 16.0,
        terminal: 1,
        date: moment().format("LLL"),
        carbs: 49,
        protein: 3.9,
        vendor: "John",
      },
      {
        name: "Coupe Enfant",
        calories: 375,
        date: moment().format("LLL"),
        fat: 0.0,
        carbs: 94,
        terminal: 1,
        protein: 0.0,
        vendor: "Tommy",
      },
      {
        name: "Shampoo",
        calories: 392,
        terminal: 1,
        date: moment().format("LLL"),
        fat: 0.2,
        carbs: 98,
        vendor: "Sam",
      },
    ],
  }),

  computed: {
    ...mapGetters("defaultStore", ["getAccessToken"]),
  },

  mounted() {
    this.getReceipts();
  },

  methods: {
    getReceipts() {
      axios
        .get(process.env.VUE_APP_RESOURCE_URL + "/receipts", {
          headers: {
            Authorization: "Bearer eeb4d6b4665685a42e70c3c1639729c33fe54a71",
          },
        })
        .then((response) => {
          console.log("res", response);
        })
        .catch((error) => {
          Bugsnag.notify(error);
          console.error(error);
        });
    },
  },
};
</script>

<style>
.background {
  height: 100%;
}
</style>
