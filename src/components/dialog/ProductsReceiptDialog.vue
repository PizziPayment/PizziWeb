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
    <v-card v-else class="mx-auto" elevation="0">
      <v-container
        style="height: 40vh; overflow: auto"
        class="pa-3 themeStyleCard"
      >
      <div v-if="errorMessage" class="d-flex justify-center align-center">
        <span class="red--text text-h6"> <v-icon color="red">mdi-alert-circle</v-icon> {{errorMessage}} </span>
      </div>
      <div>
        <!-- <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel v-for="(category, i) in categoriesList" :key="i">
            <v-expansion-panel-header>
              <h3>{{ category.name.toUpperCase() }}</h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content> -->
              <v-row dense style="overflow: auto">
                <v-col v-for="(item, i) in products" :key="i" cols="6">
                  <v-card
                    @click="itemSelected(item)"
                    color="grey"
                    dark
                    style="min-height: 60px"
                  >
                    <div
                      class="d-flex flex-no-wrap justify-space-between align-center"
                      style="height: 100%"
                    >
                      <div
                        class="d-flex flex-column justify-center align-start"
                        style="padding: 10px"
                      >
                        <span class="text-h5"> {{ item.product_name }}</span>
                        <span class="text-h6"> {{ item.product_price }}</span>
                      </div>

                      <!-- <div
                        v-if="item.unit_price"
                        class="d-inline-flex justify-center align-center"
                        style="padding-right: 10px"
                      >
                        <v-btn icon @click="addToItems(item)">
                          <v-icon size="2em"> mdi-plus </v-icon>
                        </v-btn>
                        <span style="font-size: 2em">
                          {{ item.value }}
                        </span>
                        <v-btn icon @click="removeThisItem(item)">
                          <v-icon size="2em"> mdi-minus </v-icon>
                        </v-btn>
                      </div> -->
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            <!-- </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels> -->
      </div>
      </v-container>
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
    panel: [],
    categoriesList: [],
    loading: false,
    isVisible: false,
    products: [],
    receiptId: null,
    errorMessage: null
  }),
  computed: {
    ...mapGetters("defaultStore", [
      "getAccessToken",
      "getShopInfos",
      "getShopCategories",
    ]),
  },
  methods: {
    show(receiptId) {
      this.loading = true
      this.products = null
      this.errorMessage = null
      this.receiptId = receiptId
      if (this.receiptId) {
        this.loadShopItems();
      }
      this.isVisible = true;
    },

    close() {
      this.isVisible = false;
    },

    itemSelected(item) {
      this.$emit('itemSelected', item)
    },

    loadShopItems() {
      this.loading = true;
      const bearerAuth = {
        Authorization: "Bearer " + this.getAccessToken,
      };
      axios
        .get(process.env.VUE_APP_RESOURCE_URL + "/shops/me/receipts/" + this.receiptId, {
          headers: bearerAuth,
        })
        .then((response) => {
          console.log('tqqtq', response)
          if (response.data.products) {
            this.products = response.data.products;
            this.loading = false;
          }
        })
        .catch((error) => {
          this.errorMessage = 'Une erreur est survenue, veuillez vérifier les informations.'
          this.loading = false;
          Bugsnag.notify(error);
          console.error(error);
        });
    },
  },
};
</script>
