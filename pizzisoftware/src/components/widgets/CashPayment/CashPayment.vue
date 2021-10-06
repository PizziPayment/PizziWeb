<template>
  <div>
    <v-card class="payment-list mb-n16 mx-auto" elevation="0">
      <v-card-text class="mt-16">titi</v-card-text>
    </v-card>
    <v-card class="mx-auto" color="transparent" elevation="0">
      <cashPaymentDialog v-model="dialog" />
      <v-btn rounded large color="green" @click.stop="acceptCashPayment">
        <v-icon large color="white">mdi-cash-register</v-icon>
        <span class="white--text pa-12">Register Cash Payment </span>
      </v-btn>
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