<template>
  <material-card class="ma-12" max-width="95%">
    <template v-slot:heading>
      <div class="display-2 font-weight-light">
        {{ $translate.getTranslation("Product Return") }}
      </div>
      <div class="subtitle-1 font-weight-light">
        {{ $translate.getTranslation("Enter returned product informations") }}
      </div>
    </template>
    <!-- <div
      class="ml-3 text-left font-weight-bold text-uppercase"
      style="font-size: 12px"
    >
      Enter the returned product pizzi ID
    </div>
    <v-text-field
      label="Pizzi ID"
      outlined
      v-model="pizziId"
      color="rgb(112, 192, 242)"
      append-icon="mdi-undo"
      prefix="#"
      @keyup.enter="returnProduct()"
      @click="returnProduct()"
      class="mx-2 mt-1 mb-4"
    >
    </v-text-field>
    <div
      class="ml-3 text-left font-weight-bold text-uppercase"
      style="font-size: 12px"
    >
      Enter the reason why the product is returned
    </div>
    <v-text-field
      label="Reason"
      outlined
      v-model="returnedReason"
      color="rgb(112, 192, 242)"
      @keyup.enter="returnProduct()"
      @click="returnProduct()"
      class="mx-2 mt-1 mb-4"
    >
    </v-text-field> -->
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="receiptId"
        :rules="nameRules"
        label="ID du reçu"
        required
      ></v-text-field>
      <div v-if="!itemSelected">
        <v-btn @click="openItemSelectionDialog()" color="primary">{{ this.$translate.getTranslation('Select item') }}</v-btn>
      </div>
      <div v-else>
        <span> {{ itemSelected.name + ' - ' + `( #${itemSelected.id} )`}}</span>
        <v-btn @click="openItemSelectionDialog()" >change</v-btn>
      </div>
      <!-- <v-text-field
        v-model="itemId"
        :rules="nameRules"
        label="ID de l'item"
        required
      ></v-text-field> -->

      <v-text-field
        v-model="returnedReason"
        :label="this.$translate.getTranslation('Returned reason')"
        required
      ></v-text-field>
      <div class="my-6">
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="saveProductReturn"
        >
          {{ this.$translate.getTranslation("Validate") }}
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset">
          {{ this.$translate.getTranslation("Reset") }}
        </v-btn>
      </div>
    </v-form>
    <v-divider class="my-4"></v-divider>
    <v-card elevation="0">
      <v-card-title>
        {{ this.$translate.getTranslation("Last Returned Products") }}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$translate.getTranslation('Search')"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="returnedProducts"
        :search="search"
      ></v-data-table>
    </v-card>
    <ProductsDialog ref="productDialog" @itemSelected="changeItemSelected($event)"/>
  </material-card>
</template>

<script>
import materialCard from "@/components/MaterialCard.vue";
import axios from "axios";
import { mapGetters } from "vuex";
import Bugsnag from "@bugsnag/js";
import ProductsDialog from "../components/dialog/ProductsDialog.vue";

export default {
  props: ["value"],
  components: { materialCard, ProductsDialog },

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
          text: "Product item Id",
          align: "start",
          filterable: true,
          value: "name",
        },
        { text: "Raison", value: "reason" },
        { text: "Date", value: "date" },
      ],
      returnedProducts: [],
      itemSelected: null,
    };
  },
  methods: {
    saveProductReturn() {
      this.$refs.form.validate();
      const bearerAuth = {
        Authorization: "Bearer " + this.getAccessToken,
      };
      const body = {
        receipt_item_id: this.receipt_item_id,
        quantity: this.quantity ? this.quantity : 1,
        reason: this.returnedReason ? this.returnedReason : ''
      };
      axios
        .post(
          process.env.VUE_APP_RESOURCE_URL + "/shops/me/receipts/" + this.receiptId + "/product_return_certificates",
          body,
          {
            headers: bearerAuth,
          }
        )
        .then((response) => {
          console.log("res", response)
          // load product returns
        })
        .catch((error) => {
          Bugsnag.notify(error)
          console.error(error)
        });
      this.$refs.form.reset();
    },

    openItemSelectionDialog() {
      this.$refs.productDialog.show()
    },

    changeItemSelected(event) {
      console.log('ev', event)
      this.itemSelected = event
    },

    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
