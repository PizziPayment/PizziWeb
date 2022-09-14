<template>
  <material-card class="ma-12" max-width="95%">
    <template v-slot:heading>
      <div class="display-2 font-weight-light">
        {{ $translate.getTranslation("Product Return") }}
      </div>
      <div class="subtitle-1 font-weight-light">
        {{ $translate.getTranslation("Enter returned product informations") }}
      </div>
    </template>
    <!-- <div
      class="ml-3 text-left font-weight-bold text-uppercase"
      style="font-size: 12px"
    >
      Enter the returned product pizzi ID
    </div>
    <v-text-field
      label="Pizzi ID"
      outlined
      v-model="pizziId"
      color="rgb(112, 192, 242)"
      append-icon="mdi-undo"
      prefix="#"
      @keyup.enter="returnProduct()"
      @click="returnProduct()"
      class="mx-2 mt-1 mb-4"
    >
    </v-text-field>
    <div
      class="ml-3 text-left font-weight-bold text-uppercase"
      style="font-size: 12px"
    >
      Enter the reason why the product is returned
    </div>
    <v-text-field
      label="Reason"
      outlined
      v-model="returnedReason"
      color="rgb(112, 192, 242)"
      @keyup.enter="returnProduct()"
      @click="returnProduct()"
      class="mx-2 mt-1 mb-4"
    >
    </v-text-field> -->
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="pizziId"
        :counter="10"
        :rules="nameRules"
        label="Pizzi ID"
        required
      ></v-text-field>

      <v-text-field
        v-model="returnedReason"
        :label="this.$translate.getTranslation('Reason')"
        required
      ></v-text-field>
      <div class="my-6">
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          {{ this.$translate.getTranslation("Validate") }}
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset">
          {{ this.$translate.getTranslation("Reset") }}
        </v-btn>
      </div>
    </v-form>
    <v-divider class="my-4"></v-divider>
    <v-card elevation="0">
      <v-card-title>
        {{ this.$translate.getTranslation("Last Returned Products") }}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$translate.getTranslation('Search')"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="returnedProducts"
        :search="search"
      ></v-data-table>
    </v-card>
  </material-card>
</template>

<script>
import materialCard from "@/components/MaterialCard.vue";
import moment from "moment";

export default {
  props: ["value"],
  components: { materialCard },
  data() {
    return {
      valid: null,
      pizziId: null,
      returnedReason: null,
      nameRules: [
        (v) => !!v || this.$translate.getTranslation("Name is required"),
        (v) =>
          (v && v.length <= 10) ||
          this.$translate.getTranslation(
            "Name must be less than 10 characters"
          ),
      ],
      search: "",
      headers: [
        {
          text: "ProductID",
          align: "start",
          filterable: true,
          value: "name",
        },
        { text: "Reasons", value: "reason" },
        { text: "Date", value: "date" },
      ],
      returnedProducts: [],
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      this.returnedProducts.push({
        name: this.pizziId,
        reason: this.returnedReason,
        date: moment().format("LLL"),
      });
      this.$refs.form.reset();
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
