<template>
  <v-dialog v-model="show" max-width="500">
    <v-card max-width="500" class="mx-auto">
      <v-row class="d-flex justify-center pa-4">
        <v-avatar size="100">
          <img
          src="https://i.pinimg.com/236x/b4/29/f3/b429f319f9cb5e37affe1f74f5e8311f.jpg"
          alt="Logo">
        </v-avatar>
      </v-row>
      <v-row dense class="flex-column my-4 ml-3">
        <v-row dense>
          #01489017
        </v-row>
        <v-row dense>
          552 178 639 00132
        </v-row>
        <v-row dense>
          27 rue du temps passé
        </v-row>
      </v-row>
      <v-divider></v-divider>
      <v-row dense class="flex-column">
        <v-row dense class="pt-4">
         <v-col class="d-flex justify-start ml-4">
          Payment
         </v-col>
         <v-col class="d-flex justify-end mr-4">
           Status
         </v-col>
        </v-row>
        <v-row dense class="pb-2">
          <v-col class="d-flex justify-start ml-4">
            Means
          </v-col>
          <v-col class="d-flex justify-end mr-4">
            Card
          </v-col>
        </v-row>
        <v-row dense>
          <v-col class="d-flex justify-start ml-4">
            Date
          </v-col>
          <v-col class="d-flex justify-end mr-4">
            16:30 13/01/2022
          </v-col>
        </v-row>
      </v-row>
      <v-divider></v-divider>
      <v-row dense v-for="(detail, idx) in transaction" :key="idx" class="my-2">
        <v-col class="d-flex justify-start ml-4">
          <div>
            1 x {{detail.product}}
          </div>
        </v-col>
        <v-col class="d-flex justify-end mr-4">
          <div>
            {{detail.price}}€
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row dense class="flex-column pl-2">
        <v-row dense class="pt-4">
         <v-col class="font-weight-bold d-flex justify-start ml-4">
          Total
         </v-col>
         <v-col class="d-flex justify-end mr-4">
           47€
         </v-col>
        </v-row>
        <v-row dense class="pb-2">
          <v-col class="font-weight-bold d-flex justify-start ml-4">
            TVA
          </v-col>
          <v-col class="d-flex justify-end mr-4">
            0€
          </v-col>
        </v-row>
        <v-row dense>
          <v-col class="font-weight-bold d-flex justify-start ml-4">
            Eco-Part
          </v-col>
          <v-col class="d-flex justify-end mr-4">
            0€
          </v-col>
        </v-row>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["value"],
  data : () => ({
    transaction: [
      {product: "Coupe Homme", price: "18"},
      {product: "Shampoing", price: "12"},
      {product: "Taille Barbe", price: "17"}
    ],
  }),
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
};
</script>