<template>
  <v-app class="containerThemeStyle">
    <v-container fluid class="background containerThemeStyle">
      <v-card class="mt-4 mx-2 pa-4">
        <v-card-title>
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            clearable
          ></v-text-field>
          <v-btn @click.stop="openProductReturnDialog()" class="mx-3" color="#17C19D">
            {{ $translate.getTranslation("add") }}
          </v-btn>
        </v-card-title>
        <div v-if="productReturnCertificates.length > 0">
          <v-data-table
            class="itemsTable"
            :headers="headers"
            :items="productReturnCertificates"
            multisort
            pagination.sync="pagination"
            item-key="id"
            :items-per-page="10"
            :loading="productReturnCertificates.length > 0 ? false : true"
            loading-text="Loading... Please wait"
            :search="search"
            :footer-props="{
              showFirstLastPage: true,
              firstIcon: 'mdi-arrow-collapse-left',
              lastIcon: 'mdi-arrow-collapse-right',
              prevIcon: 'mdi-minus',
              nextIcon: 'mdi-plus',
            }"
          >
          </v-data-table>
        </div>
        <div v-else>
          <div class="mx-auto" width="500">
            <h3>
              {{
                $translate.getTranslation(
                  "No product return certificate found"
                )
              }}
            </h3>
          </div>
        </div>
      </v-card>

      <ProductReturnDialog ref="productReturnDialog" @itemSelected="loadCertificates()"/>
    </v-container>
  </v-app>
</template>

<script>
// import axios from "axios";
import { mapGetters } from "vuex";
// import Bugsnag from "@bugsnag/js";
import ProductReturnDialog from "../components/dialog/ProductReturnDialog.vue";

export default {
  props: ["value"],
  components: { ProductReturnDialog },

  computed: {
    ...mapGetters("defaultStore", ["getAccessToken"]),
  },
  data() {
    return {
      valid: null,
      receiptId: null,
      quantity: 1,
      itemId: null,
      returnedReason: null,
      nameRules: [
        (v) => !!v || this.$translate.getTranslation("Required")
      ],
      search: "",
      headers: [
        {
          text: "Id du reçu",
          align: "start",
          filterable: true,
          value: "name",
        },
        { text: "Raison", value: "reason" },
        { text: "Date", value: "date" },
      ],
      returnedProducts: [],
      productReturnCertificates: [],
      itemSelected: null,
    };
  },
  methods: {
    openProductReturnDialog() {
      this.$refs.productReturnDialog.show()
    },

    // to do - load product return certificates
    loadCertificates() {
      console.log('loading')
    },

    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
