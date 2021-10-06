<template>
  <!-- <v-card> -->
    <v-card color="transparent" elevation="0" class="mt-n12">
      <cashPaymentDialog v-model="dialog" />
      <v-btn rounded x-large color="green" @click.stop="acceptCashPayment">
        <v-icon large color="white">mdi-cash-register</v-icon>
        <span class="white--text pa-12">Register Cash Payment </span>
      </v-btn>
    </v-card>
    <!-- <v-card> titi </v-card>
  </v-card> -->
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