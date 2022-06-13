<template>
  <div>
    <cashPaymentDialog v-model="dialog" />
    <v-card class="mx-auto themeStyleCardLocal" height="476px">
      <v-btn
        class="mt-n8"
        rounded
        large
        color="green"
        @click.stop="acceptCashPayment"
        id="cash-button"
      >
        <v-icon large color="white">mdi-cash-register</v-icon>
        <span class="white--text pa-12">
          {{ $translate.getTranslation("Register cash payment") }}
        </span>
      </v-btn>
      <v-subheader class="themeStyleCardLocal">
        {{ $translate.getTranslation("Last Cash Payments") }}
      </v-subheader>
      <v-divider inset></v-divider>
      <v-list
        dense
        class="pa-6 overflow-y-auto themeStyleCardLocal"
        style="max-height: 330px"
      >
        <v-list-item
          class="themeStyleCardLocal"
          v-for="(fakeProduct, i) in fakeProducts"
          :key="i"
        >
          <v-list-item-content
            class="colorThemeLocal"
            style="text-align: left;"
          >
            <v-list-item-title v-text="fakeProduct.name" />
          </v-list-item-content>
          <v-spacer />
          <v-list-item-icon class="colorThemeLocal">
            {{ fakeProduct.price }}
            <v-icon class="colorThemeLocal" small>mdi-currency-eur</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import CashPaymentDialog from "@/components/widgets/CashPayment/CashPaymentDialog.vue";
export default {
  components: { CashPaymentDialog },
  data() {
    return {
      dialog: false,
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
    };
  },
  methods: {
    acceptCashPayment() {
      this.dialog = true;
    },
  },
};
</script>

<style scoped>
.colorThemeLocal,
.themeStyleCardLocal {
  color: var(--pizzi-color2) !important;
}
.themeStyleCardLocal {
  color: var(--pizzi-color2) !important;
  background: var(--pizzi-bg-chart) !important;
}
</style>
