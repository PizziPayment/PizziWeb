<template>
  <v-dialog v-model="show" persistent max-width="30%">
    <v-card class="themeStyleCard">
      <v-card-text>
        <v-card-title class="d-flex justify-center themeStyleCard">
          Register cash payment
        </v-card-title>
        <v-text-field
          v-model="amount"
          :rules="[rules.number]"
          class="pa-6 themeStyleCard"
          append-icon="mdi-currency-eur"
          clear-icon="mdi-close-circle"
          clearable
        >
        </v-text-field>
        <v-row class="pa-6">
          <v-col>
            <v-btn color="green lighten-1" @click.stop="accept"> Accept </v-btn>
          </v-col>
          <v-col>
            <v-btn color="red lighten-1" @click.stop="quit"> Close </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      amount: "",
      rules: {
        number: (value) => isNaN(value) == false,
      },
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    accept() {
      this.show = false;
      //emit amount here
      this.amount = "";
    },
    quit() {
      this.show = false;
      this.amount = "";
    },
  },
};
</script>
