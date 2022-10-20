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
          <v-btn @click.stop="openAddProduct()" class="mx-3" color="primary">
            {{ $translate.getTranslation("add") }}
          </v-btn>
        </v-card-title>
        <div v-if="itemsData.length > 0">
          <v-data-table
            class="itemsTable"
            :headers="headers"
            :items="itemsData"
            multisort
            pagination.sync="pagination"
            item-key="id"
            :items-per-page="10"
            :loading="itemsData.length > 0 ? false : true"
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
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" color="blue" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small color="red" @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </div>
        <div v-else>
          <div class="mx-auto" width="500">
            <div>
              {{
                $translate.getTranslation(
                  "No items, please add an item to generate receipt"
                )
              }}
            </div>
            <div class="ma-3 py-3">
              <v-btn
                @click.stop="openAddProduct()"
                class="pa-3 mx-3"
                color="primary"
              >
                {{ $translate.getTranslation("add") }}
              </v-btn>
            </div>
          </div>
        </div>
      </v-card>

      <AddProductDialog ref="AddProductRef" @addItem="loadItems()" />
      <EditProductDialog ref="EditProductRef" @editItem="loadItems()" />
    </v-container>
  </v-app>
</template>

<script>
import AddProductDialog from "@/components/widgets/AddProductDialog.vue";
import EditProductDialog from "@/components/widgets/EditProductDialog.vue";
import axios from "axios";
import Bugsnag from "@bugsnag/js";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { AddProductDialog, EditProductDialog },

  computed: {
    ...mapGetters("defaultStore", ["getAccessToken"]),
  },

  data: () => ({
    loading: false,
    search: "",
    headers: [
      {
        text: "ID",
        align: "start",
        filterable: false,
        value: "id",
      },
      { text: "Item", value: "name" },
      { text: "Category", value: "category", sortable: true },
      { text: "Price", value: "price", sortable: true },
      { text: "Creation date", value: "created_at" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    itemsData: [],
  }),

  mounted() {
    this.loadItems();
  },

  methods: {
    ...mapActions("defaultStore", ["setShopCategories"]),
    openAddProduct() {
      if (this.$refs.AddProductRef) {
        this.$refs.AddProductRef.show();
      }
    },

    async editItem(item) {
      if (this.$refs.EditProductRef) {
        this.$refs.EditProductRef.show(item);
      }
    },

    async deleteItem(item) {
      const bearerAuth = {
        Authorization: "Bearer " + this.getAccessToken,
      };
      axios
        .delete(
          process.env.VUE_APP_RESOURCE_URL + "/shops/me/items/" + item.id,
          {
            headers: bearerAuth,
          }
        )
        .then(() => {
          this.loadItems();
        })
        .catch((error) => {
          console.error(error);
          Bugsnag.notify(error);
        });
    },

    convertPriceInMil() {
      if (this.itemsData) {
        this.itemsData.forEach((item) => {
          item.price = item.price / 1000;
        });
      }
    },

    getCategories() {
      const categories = []
      if (this.itemsData) {
        this.itemsData.forEach(item => {
          if (item.category) {
            categories.push(item.category)
          }
        });
      }
      this.setShopCategories(categories)
    },

    getCategories() {
      const categories = []
      if (this.itemsData) {
        this.itemsData.forEach(item => {
          if (item.category) {
            categories.push(item.category)
          }
        });
      }
      this.setShopCategories(categories)
    },

    async loadItems() {
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
            this.itemsData = response.data.items;
            // Price is in cents
            this.convertPriceInMil();
            this.getCategories()
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

<style>
.background {
  height: 100%;
  width: 100%;
}

.itemsTable {
  max-height: 80vh;
  overflow: auto;
}
</style>
