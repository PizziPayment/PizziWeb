<template>
  <v-card color="transparent" elevation="0">
    <div class="white--text">
      <h2 class="d-flex text-right">Returned product</h2>
      <p class="subtitle-2 d-flex text-left ml-6">
        Enter Pizzi ID to return product in your stock
      </p>
    </div>
    <v-text-field
      label="Pizzi ID"
      outlined
      v-model="pizziId"
      color="rgb(112, 192, 242)"
      dark
      append-icon="mdi-undo"
      prefix="#"
      @keyup.enter="returnProduct()"
      @click="returnProduct()"
    >
    </v-text-field>
  </v-card>
</template>


<script>
export default {
  props: ["value"],
  data() {
    return {
      pizziId: null,
    };
  },
  methods: {
    returnProduct() {
      console.log("id of product:", this.pizziId);
    },
  },
};
</script>