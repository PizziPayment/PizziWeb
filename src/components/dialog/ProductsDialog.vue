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
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel v-for="(category, i) in categoriesList" :key="i">
            <v-expansion-panel-header>
              <h3>{{ category.name.toUpperCase() }}</h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row dense style="overflow: auto">
                <v-col v-for="(item, i) in category.items" :key="i" cols="6">
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
                        <span class="text-h5"> {{ item.name }}</span>
                      </div>

                      <div
                        v-if="item.value"
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
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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
  }),
  computed: {
    ...mapGetters("defaultStore", [
      "getAccessToken",
      "getShopInfos",
      "getShopCategories",
    ]),
  },
  methods: {
    show() {
      this.loadShopItems();
      this.isVisible = true;
    },

    close() {
      this.isVisible = false;
    },

    itemSelected(item) {
      this.$emit('itemSelected', item)
    },

    getCategories() {
      const uniqueArray = [...new Set(this.getShopCategories)];
      return uniqueArray;
    },

    getCategoryItems(category) {
      const res = [];
      this.products.forEach((product) => {
        if (product.category === category) {
          res.push(product);
        }
      });
      return res;
    },

    buildCategories() {
      const list = [];
      const categories = this.getCategories();

      if (categories.length) {
        categories.forEach((category) => {
          list.push({
            name: category.toLowerCase(),
            items: this.getCategoryItems(category),
          });
        });
      }
      this.categoriesList = list;
      console.log("te", this.categoriesList);
    },

    loadShopItems() {
      this.loading = true;
      const bearerAuth = {
        Authorization: "Bearer " + this.getAccessToken,
      };
      axios
        .get(process.env.VUE_APP_RESOURCE_URL + "/shops/me/items", {
          headers: bearerAuth,
        })
        .then((response) => {
          if (response.data.items) {
            this.products = response.data.items;
            this.loading = false;
            this.buildCategories();
          }
        })
        .catch((error) => {
          this.loading = false;
          Bugsnag.notify(error);
          console.error(error);
        });
    },
  },
};
</script>
