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
          <v-btn flat icon color="#17C19D" @click.stop="loadProductReturns()">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-card-title>
        <div v-if="productReturnCertificates.length > 0">
          <v-data-table
            class="itemsTable"
            @click:row="openReceipt"
            :headers="headers"
            :items="productReturnCertificates"
            multisort
            pagination.sync="pagination"
            item-key="id"
            :items-per-page="10"
            :loading="loading"
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
            <template v-slot:item.return_date="{ item }">
              <v-chip dark>
                <!-- {{ item }} -->
                {{ moment(item.return_date).format("LLL") }}
              </v-chip>
            </template>
            <template v-slot:item.receipt_item="{ item }">
              <v-chip dark>
                {{ item.receipt_item.shop_item.name }}
              </v-chip>
            </template>
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

      <ProductReturnDialog ref="productReturnDialog" @productReturned="loadProductReturns()"/>
      <ReceiptView ref="receiptView" />
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
import Bugsnag from "@bugsnag/js";
import moment from "moment";
import { mapGetters } from "vuex";
import ProductReturnDialog from "../components/dialog/ProductReturnDialog.vue";
import ReceiptView from "@/components/dialog/ReceiptView.vue";

moment.locale('fr')
export default {
  props: ["value"],
  components: { ProductReturnDialog, ReceiptView },

  computed: {
    ...mapGetters("defaultStore", ["getAccessToken"]),
  },
  data() {
    return {
      moment,
      valid: null,
      receiptId: null,
      quantity: 1,
      itemId: null,
      loading: false,
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
          value: "id",
        },
        { text: "Item", value: "receipt_item" },
        { text: "Raison", value: "reason" },
        { text: "Date", value: "return_date" },
      ],
      returnedProducts: [],
      productReturnCertificates: [],
      itemSelected: null,
    };
  },
  mounted() {
    this.loadProductReturns()
  },
  methods: {
    openProductReturnDialog() {
      this.$refs.productReturnDialog.show()
    },

    openReceipt(row) {
      this.$refs.receiptView.show(row.receipt_item.receipt_id);
    },

    loadProductReturns() {
      this.loading = true;
      const bearerAuth = {
        Authorization: "Bearer " + this.getAccessToken,
      };
      axios
        .get(process.env.VUE_APP_RESOURCE_URL + "/shops/me/product_return_certificates", {
          headers: bearerAuth,
        })
        .then((response) => {
          if (response.data) {
            this.productReturnCertificates = response.data;
            this.loading = false;
          }
        })
        .catch((error) => {
          this.loading = false;
          console.error(error);
          Bugsnag.notify(error);
        });
    },
  },
};
</script>
