<template>
  <v-dialog
    @click:outside="dialog = false"
    v-model="dialog"
    persistent
    width="40%"
  >
    <v-card>
      <v-card-text>
        <v-card-title class="d-flex justify-center">
          {{ $translate.getTranslation("Retourner un produit") }}
        </v-card-title>
        <div class="ma-4 text-center">
          <v-form ref="form" v-model="valid" lazy-validation>
            <div v-if="!itemSelected">
              <v-btn class="ma-4" @click="openItemSelectionDialog()" color="#17C19D">{{
                this.$translate.getTranslation("Select item")
              }}</v-btn>
            </div>
            <div v-else>
              <span>
                {{
                  itemSelected.name + " - " + `( #${itemSelected.id} )`
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
                :disabled="!valid"
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
    <ProductsDialog
      ref="productsDialog"
      @itemSelected="changeItemSelected($event)"
    />
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import Bugsnag from "@bugsnag/js";
import ProductsDialog from "@/components/dialog/ProductsDialog.vue";

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

  components: { ProductsDialog },

  props: {
    totalAmount: Number,
  },

  computed: {
    ...mapGetters("defaultStore", ["getAccessToken"]),
  },

  methods: {
    show() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    openItemSelectionDialog() {
      this.$refs.productsDialog.show();
    },

    reset() {
      this.receiptId = null
      this.returnedReason = null
      this.itemSelected = null
    },

    changeItemSelected(event) {
      this.$refs.productsDialog.close()
      this.itemSelected = event;
    },

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
      this.reset();
    },
  },
};
</script>
