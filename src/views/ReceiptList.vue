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
          :items="receipts"
          :search="search"
        ></v-data-table>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
// import moment from "moment";
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
        text: "ID",
        align: "start",
        filterable: true,
        value: "receipt_id",
      },
      //a prendre en compte en centime
      { text: "Price", value: "total_ttc" },
      { text: "Date", value: "date" },
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
        .get(process.env.VUE_APP_RESOURCE_URL + "/shops/me/receipts",{
          headers: {
            Authorization: "Bearer " + this.getAccessToken,
          },
        })
        .then((response) => {
          console.log(response)
          this.receipts = response.data
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
