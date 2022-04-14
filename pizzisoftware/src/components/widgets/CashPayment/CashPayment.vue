<template>
  <div>
    <cashPaymentDialog v-model="dialog" />
    <v-card class="mx-auto" height='476px'>
      <v-btn class='mt-n8' rounded large color="green" @click.stop="acceptCashPayment">
        <v-icon large color="white">mdi-cash-register</v-icon>
        <span class="white--text pa-12">Register Cash Payment </span>
      </v-btn>
      <v-subheader>Last Cash Payments</v-subheader>
      <v-divider inset></v-divider>
      <v-list dense class="pa-6 overflow-y-auto" style="max-height: 330px">
      <v-list-item v-for="(fakeProduct, i) in fakeProducts" :key="i">
        <v-list-item-content style="text-align: left;">
          <v-list-item-title v-text="fakeProduct.name"/>
        </v-list-item-content>
        <v-spacer/>
        <v-list-item-icon>
          {{fakeProduct.price}}
          <v-icon small>mdi-currency-eur</v-icon>
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
      fakeProducts : [
        { name: 'Coupe Homme Etudiant', price: '18' },
        { name: 'Coupe Femme', price: '30' },
        { name: 'Couleur Femme + Coupe', price: '45' },
        { name: 'Coupe Homme Adulte', price: '25' },
        { name: 'Coupe Enfant', price: '14' },
        { name: 'Coupe Enfant', price: '14' },
        { name: 'Coupe Homme Etudiant', price: '18' },
        { name: 'Coupe Homme Etudiant', price: '18' },
        { name: 'Couleur Femme + Coupe', price: '45' },
        { name: 'Coupe Femme', price: '30' },
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

<style>
</style>