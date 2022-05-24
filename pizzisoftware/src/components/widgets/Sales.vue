<template>
  <v-card class="themeStyleCard">
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      min-width="auto"
      :nudge-right="40"
      :nudge-bottom="10"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
          flat
          hide-details="auto"
          class="pt-6 px-6"
        ></v-text-field>
      </template>
      <v-date-picker class="colorThemeLocal" v-model="date" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
        <v-btn text color="primary" @click="$refs.menu.save(date)"> OK </v-btn>
      </v-date-picker>
    </v-menu>
    <v-list
      class="pa-6 overflow-y-auto themeStyleCard"
      style="max-height: 230px"
    >
      <v-list-item v-for="(fakeProduct, i) in fakeProducts" :key="i">
        <v-list-item-content style="text-align: left;">
          <v-list-item-title
            class="colorThemeLocal"
            v-text="fakeProduct.name"
          />
        </v-list-item-content>
        <v-spacer />
        <v-list-item-icon class="colorThemeLocal">
          {{ fakeProduct.price }}
          <v-icon class="colorThemeLocal" small>mdi-currency-eur</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      date: "2021-06-09",
      fakeProducts: [
        { name: "Coupe Homme Etudiant", price: "18" },
        { name: "Coupe Femme", price: "30" },
        { name: "Couleur Femme + Coupe", price: "45" },
        { name: "Coupe Homme Adulte", price: "25" },
        { name: "Coupe Enfant", price: "14" },
        { name: "Coupe Enfant", price: "14" },
        { name: "Coupe Homme Etudiant", price: "18" },
        { name: "Coupe Homme Etudiant", price: "18" },
        { name: "Couleur Femme + Coupe", price: "45" },
        { name: "Coupe Femme", price: "30" },
      ],
      menu: false,
    };
  },
};
</script>

<style scoped>
.colorThemeLocal {
  color: var(--pizzi-color2) !important;
}

.theme--light.v-input input,
.theme--light.v-input textarea {
  color: var(--pizzi-color2) !important;
}
</style>
