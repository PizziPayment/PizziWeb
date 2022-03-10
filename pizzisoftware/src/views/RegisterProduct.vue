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

      <AddProductDialog ref="AddProductRef"/>
    </v-container>
  </v-app>
</template>

<script>
import AddProductDialog from "@/components/widgets/AddProductDialog.vue";
import moment from 'moment'

export default {
  components: { AddProductDialog },

  data: () => ({
    search: '',
    valid: true,
    nameInput: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
    ],
    priceInput: "",
    priceRules: [(v) => !!v || "Price is required"],
    inventory: [],
    headers: [
      {
        text: 'ID',
        align: 'start',
        filterable: false,
        value: 'id',
      },
      { text: 'Item', value: 'name' },
      { text: 'Price', value: 'price', sortable: true },
      { text: 'Added date', value: 'addedDate' }
    ],
    itemsData: [
      {
        id: 1,
        name: "Shampoing",
        price: 24.99,
        addedDate: moment().format('LL')
      },
      {
        id: 2,
        name: "Coupe femme",
        price: 35,
        addedDate:  moment().format('LL')
      },
      {
        id: 2,
        name: "Coupe femme",
        price: 35,
        addedDate:  moment().format('LL')
      },
      {
        id: 2,
        name: "Coupe femme",
        price: 35,
        addedDate:  moment().format('LL')
      },
      {
        id: 2,
        name: "Coupe femme",
        price: 35,
        addedDate:  moment().format('LL')
      },
      {
        id: 2,
        name: "Coupe femme",
        price: 35,
        addedDate:  moment().format('LL')
      },
      {
        id: 2,
        name: "Coupe femme",
        price: 35,
        addedDate:  moment().format('LL')
      },
      {
        id: 2,
        name: "Coupe femme",
        price: 35,
        addedDate:  moment().format('LL')
      },
    {
        id: 2,
        name: "Coupe femme",
        price: 35,
        addedDate:  moment().format('LL')
      },
      {
        id: 2,
        name: "Coupe femme",
        price: 35,
        addedDate:  moment().format('LL')
      },
      {
        id: 2,
        name: "Coupe femme",
        price: 35,
        addedDate:  moment().format('LL')
      },
      {
        id: 2,
        name: "Coupe femme",
        price: 35,
        addedDate:  moment().format('LL')
      },
      {
        id: 2,
        name: "Coupe femme",
        price: 35,
        addedDate:  moment().format('LL')
      },
    {
        id: 2,
        name: "Coupe femme",
        price: 35,
        addedDate:  moment().format('LL')
      },
      {
        id: 2,
        name: "Coupe femme",
        price: 35,
        addedDate:  moment().format('LL')
      },
      {
        id: 2,
        name: "Coupe femme",
        price: 35,
        addedDate:  moment().format('LL')
      },
      {
        id: 2,
        name: "Coupe femme",
        price: 35,
        addedDate:  moment().format('LL')
      },
      {
        id: 2,
        name: "Coupe femme",
        price: 35,
        addedDate:  moment().format('LL')
      },
    {
        id: 2,
        name: "Coupe femme",
        price: 35,
        addedDate:  moment().format('LL')
      },
      {
        id: 2,
        name: "Coupe femme",
        price: 35,
        addedDate:  moment().format('LL')
      },
      {
        id: 2,
        name: "Coupe femme",
        price: 35,
        addedDate:  moment().format('LL')
      },
      {
        id: 2,
        name: "Coupe femme",
        price: 35,
        addedDate:  moment().format('LL')
      },
      {
        id: 2,
        name: "Coupe femme",
        price: 35,
        addedDate:  moment().format('LL')
      },
    ],
  }),
  methods: {
    openAddProduct () {
      if (this.$refs.AddProductRef) {
        this.$refs.AddProductRef.show()
      }
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
