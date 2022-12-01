<template>
  <v-dialog max-width="40vw" @click:outside="close()" v-model="isVisible">
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
    <v-card v-else class="mx-auto" height="85vh" elevation="8" style="overflow-x: hidden; overflow-y: auto;">
      <v-row class="d-flex justify-center pa-4">
        <v-avatar size="100">
          <img
            :src="getAvatarUrl"
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
          <div>{{ parseInt(product.unit_price) / 1000 }}€</div>
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
          <v-col class="d-flex justify-end mr-4"> {{ parseInt(receipt.total_ht) / 1000 }} € </v-col>
        </v-row>
        <v-row dense class="pt-1">
          <v-col class="font-weight-bold d-flex justify-start ml-4">
            Total TTC
          </v-col>
          <v-col class="d-flex justify-end mr-4"> {{ parseInt(receipt.total_ttc) / 1000 }} € </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-btn @click.stop="exportReceipt" class="ma-4" color="grey"> {{ $translate.getTranslation("Export in PDF") }} <v-icon>mdi-share</v-icon> </v-btn>
      </v-row>
    </v-card>
    <ExportReceiptDialog ref="ExportReceiptDialog" />
  </v-dialog>
</template>

<script>
import axios from "axios";
import Bugsnag from "@bugsnag/js";
import { mapGetters } from "vuex";
import moment from "moment";
import ExportReceiptDialog from "@/components/dialog/ExportReceiptDialog.vue";

moment.locale('fr')
export default {
  components: { ExportReceiptDialog },
  data: () => ({
    moment,
    loading: false,
    isVisible: false,
    receiptId: null,
    receipt: null,
  }),
  computed: {
    ...mapGetters("defaultStore", ["getAccessToken", "getShopInfos", "getAvatarUrl"]),
  },
  methods: {
    show(receiptId) {
      this.receiptId = receiptId;
      this.getReceipt();
    },
    close() {
      this.isVisible = false;
    },
    exportReceipt() {
      if (this.receipt && this.receiptId) {
        this.$refs.ExportReceiptDialog.show(this.receiptId, this.receipt)
      }
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
