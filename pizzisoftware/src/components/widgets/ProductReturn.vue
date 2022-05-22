<template>
  <v-card class="pa-6 returnThemeStyleCard" height="300px">
    <div>
      <h2 class="d-flex text-right">Returned product</h2>
      <p class="subtitle-2 d-flex text-left ml-6 font-italic">
        Enter Pizzi ID to return product in your stock
      </p>
    </div>
    <v-text-field
      label="Pizzi ID"
      outlined
      v-model="pizziId"
      append-icon="mdi-undo"
      prefix="#"
      @keyup.enter="returnProduct()"
      @click="returnProduct()"
      class="mt-16 themeSelector"
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

<style scoped>
.returnThemeStyleCard {
  color: var(--pizzi-color2) !important;
  background: var(--pizzi-bg-chart) !important;
}
.themeSelector {
  color: var(--pizzi-green) !important;
}
</style>
