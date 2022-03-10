<template>
  <v-app>
    <v-container fluid class="background">
      <v-card class="mt-4 mx-2 pa-4">
        <v-card-title>
          <v-text-field
            v-model="search"
            prepend-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            clearable
          ></v-text-field>
          <v-btn @click.stop="openAddProduct()" class="mx-3" color="primary"> add </v-btn>
        </v-card-title>
        <v-data-table
          class="itemsTable"
          :headers="headers"
          :items="itemsData"
          multisort
          pagination.sync="pagination"
          item-key="id"
          loading="true"
          :items-per-page="10"
          :search="search"
          :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus'
          }"
        >
        </v-data-table>
      </v-card>

      <AddProductDialog ref="AddProductRef" @addItem="loadItems()"/>
    </v-container>
  </v-app>
</template>

<script>
import AddProductDialog from "@/components/widgets/AddProductDialog.vue";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  components: { AddProductDialog },

  computed: {
    ...mapGetters("defaultStore", ["getAccessToken"]),
  },

  data: () => ({
    search: '',
    headers: [
      {
        text: 'ID',
        align: 'start',
        filterable: false,
        value: 'id',
      },
      { text: 'Item', value: 'name' },
      { text: 'Price', value: 'price', sortable: true },
      { text: 'Creation date', value: 'created_at' }
    ],
    itemsData: [],
  }),

  mounted() {
    this.loadItems()
  },

  methods: {
    openAddProduct () {
      if (this.$refs.AddProductRef) {
        this.$refs.AddProductRef.show()
      }
    },

    async loadItems() {
      const bearerAuth = {
        Authorization: "Bearer " + this.getAccessToken,
      };
      axios
        .get(process.env.VUE_APP_RESOURCE_URL + "/shops/me/items", {
          headers: bearerAuth,
        })
        .then((response) => {
          if (response.data.items) {
            this.itemsData = response.data.items
          }
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
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
