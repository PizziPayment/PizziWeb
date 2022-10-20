<template>
  <v-dialog @click:outside="close()" max-width="500" v-model="isVisible">
    <v-card
      class="d-flex align-center justify-center"
      v-if="loading"
      height="20vw"
    >
      <v-progress-circular
        :size="50"
        color="grey"
        indeterminate
      ></v-progress-circular>
    </v-card>
    <v-card style="overflow: hidden;" color="grey darken-3" v-else max-width="500" class="mx-auto" elevation="8">
      <v-row class="d-flex justify-center pa-4">
        <v-avatar size="100">
          <img
            src="https://i.pinimg.com/236x/b4/29/f3/b429f319f9cb5e37affe1f74f5e8311f.jpg"
            alt="Logo"
          />
        </v-avatar>
      </v-row>
      <v-row dense class="flex-column my-4 ml-3">
        <v-row dense> ID # {{ receiptId }} </v-row>
        <v-row dense> {{ getShopInfos.name }} </v-row>
        <v-row dense> {{ getShopInfos.address }} </v-row>
        <v-row dense> {{ getShopInfos.city }} </v-row>
        <v-row dense> {{ getShopInfos.zipcode }} </v-row>
      </v-row>
      <v-divider></v-divider>
      <v-row dense class="flex-column">
        <v-row dense class="pt-4">
          <v-col class="d-flex justify-start ml-4"> Payment </v-col>
          <v-col class="d-flex justify-end mr-4"> Confirmed </v-col>
        </v-row>
        <v-row dense class="pb-2">
          <v-col class="d-flex justify-start ml-4"> Method </v-col>
          <v-col class="d-flex justify-end mr-4"> {{ receipt.payment_type }} </v-col>
        </v-row>
        <v-row dense>
          <v-col class="d-flex justify-start ml-4"> Date </v-col>
          <v-col class="d-flex justify-end mr-4"> {{ moment(receipt.creation_date).format('LLL') }} </v-col>
        </v-row>
      </v-row>
      <v-divider></v-divider>
      <v-row dense v-for="(product, idx) in receipt.products" :key="idx" class="my-2">
        <v-col class="d-flex justify-start ml-4">
          <div>{{ product.quantity }} x {{ product.product_name }}</div>
        </v-col>
        <v-col class="d-flex justify-end mr-4">
          <div>{{ product.price_unit }}€</div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row dense class="flex-column pl-2">
        <v-row dense class="pt-4 pb-2">
          <v-col class="font-weight-bold d-flex justify-start ml-4">
            TVA
          </v-col>
          <v-col class="d-flex justify-end mr-4"> {{ receipt.tva_percentage }} %</v-col>
        </v-row>
        <v-row dense class="pt-2">
          <v-col class="font-weight-bold d-flex justify-start ml-4">
            Total HT
          </v-col>
          <v-col class="d-flex justify-end mr-4"> {{ receipt.total_ht }} € </v-col>
        </v-row>
        <v-row dense class="pt-1">
          <v-col class="font-weight-bold d-flex justify-start ml-4">
            Total TTC
          </v-col>
          <v-col class="d-flex justify-end mr-4"> {{ receipt.total_ttc }} € </v-col>
        </v-row>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import Bugsnag from "@bugsnag/js";
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  props: ["value"],
  data: () => ({
    moment,
    loading: false,
    isVisible: false,
    receiptId: null,
    receipt: null,
  }),
  computed: {
    ...mapGetters("defaultStore", ["getAccessToken", "getShopInfos"]),
  },
  methods: {
    show(receiptId) {
      this.receiptId = receiptId;
      this.getReceipt();
    },
    close() {
      this.isVisible = false;
    },
    getReceipt() {
      this.receipt = null;
      this.loading = true;
      axios
        .get(
          process.env.VUE_APP_RESOURCE_URL +
            "/shops/me/receipts/" +
            this.receiptId,
          {
            headers: {
              Authorization: "Bearer " + this.getAccessToken,
            },
          }
        )
        .then((response) => {
          if (response.data) {
            this.receipt = response.data
          }
          this.isVisible = true;
          this.loading = false;
        })
        .catch((error) => {
          Bugsnag.notify(error);
          console.error(error);
          this.loading = false;
        });
    },
  },
};
</script>
