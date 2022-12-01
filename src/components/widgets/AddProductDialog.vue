<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" @click:outside="closeDialog()">
      <v-card elevation="5">
        <v-card-title class="text-h6" style="background-color: #05c39b">
          {{ $translate.getTranslation("Add product") }}
        </v-card-title>

        <v-card-text class="mt-6">
          <v-container>
            <v-row>
              <v-combobox
                v-model="category"
                :items="getCategories()"
                :label="$translate.getTranslation('Categories')"
                chips
              ></v-combobox>
            </v-row>
            <v-row>
              <v-text-field
                v-model="name"
                :label="$translate.getTranslation('Product name')"
                filled
                clearable
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="price"
                :label="$translate.getTranslation('Price')"
                filled
                type="number"
                clearable
              ></v-text-field>
            </v-row>
            <v-row>
              <v-expansion-panels inset>
                <v-expansion-panel expand focusable>
                  <v-expansion-panel-header>{{ $translate.getTranslation("Select item color") }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-color-picker
                    v-model="colorSelected"
                    class="ma-2"
                    show-swatches
                    hide-canvas
                  ></v-color-picker>
                </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" text @click="saveItem()">
            {{ $translate.getTranslation("Save") }}
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar color="green" v-model="snackbar" :timeout="1500">
        <div class="text-center">
          <v-btn color="green" text @click="saveItem()">
            {{ $translate.getTranslation("Item saved") }}
          </v-btn>
        </div>
      </v-snackbar>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Bugsnag from "@bugsnag/js";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      snackbar: false,
      category: null,
      name: "",
      price: "",
      dialog: false,
      colorSelected: null,
      types: ["services", "shampoing", "homme", "femme", "enfants"],
    };
  },

  computed: {
    ...mapGetters("defaultStore", ["getAccessToken", "getShopCategories"]),
  },

  methods: {
    show() {
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
    },

    getCategories() {
      const uniqueArray = [...new Set(this.getShopCategories)];
      return uniqueArray;
    },

    clearItem() {
      this.name = "";
      this.price = "";
    },

    openSnackbar() {
      this.snackbar = true;
    },

    async saveItem() {
      const bearerAuth = {
        Authorization: "Bearer " + this.getAccessToken,
      };
      const body = {
        items: [
          {
            name: this.name,
            price: parseInt(this.price) * 1000,
            category: this.category,
            color: this.colorSelected ? this.colorSelected.hex : '#BDBDBD'
          },
        ],
      };
      axios
        .post(process.env.VUE_APP_RESOURCE_URL + "/shops/me/items", body, {
          headers: bearerAuth,
        })
        .then(() => {
          this.$emit("addItem");
          this.openSnackbar();
          this.clearItem();
          Bugsnag.Breadcrumb("New item added into DB");
          this.dialog = false;
        })
        .catch((error) => {
          Bugsnag.notify(error);
          console.error(error);
        });
    },
  },
};
</script>
