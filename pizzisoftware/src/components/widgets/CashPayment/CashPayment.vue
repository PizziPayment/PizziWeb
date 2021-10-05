<template>
  <v-card color="rgb(40, 50, 55)" elevation="0" class="mt-12" max-width="1000">
    <cashPaymentDialog v-model="dialog" />
    <v-btn
      rounded
      x-large
      block
      color="#3a474e"
      @click.stop="acceptCashPayment"
    >
      <v-icon large color="white">mdi-cash-register</v-icon>
      <span class="white--text pa-12">Register Cash Payment </span>
    </v-btn>
  </v-card>
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