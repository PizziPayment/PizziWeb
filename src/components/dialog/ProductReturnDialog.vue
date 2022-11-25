<template>
  <v-dialog
    @click:outside="dialog = false"
    v-model="dialog"
    persistent
    width="40%"
  >
    <v-card class="d-flex justify-center align-center">
      <v-card-text>
        <v-card-title class="d-flex justify-center">
          {{ $translate.getTranslation("Retourner un produit") }}
        </v-card-title>
        <div class="ma-4 d-flex justify-center align-center">
          <v-form ref="form" v-model="valid" lazy-validation>
            <div v-if="!itemSelected">
              <v-btn :disabled="!receiptId" class="ma-4" @click="openItemSelectionDialog(receiptId)" color="#17C19D">{{
                this.$translate.getTranslation("Choisir produit")
              }}</v-btn>
            </div>
            <div v-else>
              <span class="text-h6">
                {{
                  itemSelected.product_name + " - " + `( #${itemSelected.id} )`
                }}</span
              >
              <v-btn class="ma-2" @click="openItemSelectionDialog()">change</v-btn>
            </div>

            <v-text-field
              v-model="receiptId"
              :rules="basicRule"
              label="ID du reçu"
              required
              clearable
              outlined
            ></v-text-field>

            <v-combobox
              v-model="returnedReason"
              :items="reasons"
              :rules="basicRule"
              :label="$translate.getTranslation('Returned reason')"
              outlined
              chips
              clearable
              small-chips
              required
            ></v-combobox>

            <div class="my-6">
              <v-btn color="error" class="mr-4" @click="reset">
                {{ this.$translate.getTranslation("Reset") }}
              </v-btn>
              <v-btn
                :disabled="isSaveEnabled"
                color="success"
                class="mr-4"
                @click="saveProductReturn"
              >
                {{ this.$translate.getTranslation("Validate") }}
              </v-btn>
            </div>
          </v-form>
        </div>
      </v-card-text>
    </v-card>
    <ProductsReceiptDialog
      ref="productsReceiptDialog"
      @itemSelected="changeItemSelected($event)"
    />
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import Bugsnag from "@bugsnag/js";
import ProductsReceiptDialog from "@/components/dialog/ProductsReceiptDialog.vue";

export default {
  data() {
    return {
      valid: null,
      dialog: false,
      receiptId: null,
      basicRule: [(v) => !!v || this.$translate.getTranslation("Required")],
      reasons: [
        "article incorrect",
        "choix",
        "taille",
        "défectueux",
        "sav",
        "autre",
      ],
      returnedReason: null,
      itemSelected: null,
    };
  },

  components: { ProductsReceiptDialog },

  props: {
    totalAmount: Number,
  },

  computed: {
    ...mapGetters("defaultStore", ["getAccessToken"]),

    isSaveEnabled() {
      if (this.itemSelected && this.itemSelected.id && this.returnedReason && this.receiptId) {
        return false
      }
      return true
    },
  },

  methods: {
    show() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    openItemSelectionDialog(receiptId) {
      this.$refs.productsReceiptDialog.show(receiptId);
    },

    reset() {
      this.receiptId = null
      this.returnedReason = null
      this.itemSelected = null
    },

    changeItemSelected(event) {
      this.$refs.productsReceiptDialog.close()
      this.itemSelected = event;
      console.log("t", this.itemSelected)
    },

    saveProductReturn() {
      this.$refs.form.validate();
      const bearerAuth = {
        Authorization: "Bearer " + this.getAccessToken,
      };
      const body = {
        receipt_item_id: this.itemSelected.id,
        quantity: 1,
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
          this.$emit('pruductReturned')
          this.close()
        })
        .catch((error) => {
          Bugsnag.notify(error)
          console.error(error)
        });
      this.reset();
    },
  },
};
</script>
