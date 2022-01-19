<template>
  <v-dialog v-model="show" max-width="500">
    <v-container max-width="500" class="mx-auto" style="background-color: white;">
      <v-row class="d-flex justify-center pa-4">
        <v-avatar size="100">
          <img
          src="https://i.pinimg.com/236x/b4/29/f3/b429f319f9cb5e37affe1f74f5e8311f.jpg"
          alt="Logo">
        </v-avatar>
      </v-row>
      <v-divider></v-divider>
      <v-row dense class="flex-column my-4 pl-2">
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
      <v-row dense class="flex-column pl-2">
        <v-row dense class="pt-4">
         <v-col>
          Payment
         </v-col>
         <v-col class="d-flex justify-end">
           Status
         </v-col>
        </v-row>
        <v-row dense class="pb-2">
          <v-col>
            Means
          </v-col>
          <v-col class="d-flex justify-end">
            Card
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            Date
          </v-col>
          <v-col class="d-flex justify-end">
            16:30 13/01/2022
          </v-col>
        </v-row>
      </v-row>
      <v-divider></v-divider>
      <v-row dense v-for="(detail, idx) in transaction" :key="idx" class="mx-2 my-2">
        <v-col>
          <div>
            1 x {{detail.product}}
          </div>
        </v-col>
        <v-col class="d-flex justify-end">
          <div>
            {{detail.price}}€
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row dense class="flex-column pl-2">
        <v-row dense class="pt-4 mx-2">
         <v-col class="font-weight-bold">
          Total
         </v-col>
         <v-col class="d-flex justify-end">
           47€
         </v-col>
        </v-row>
        <v-row dense class="pb-2 mx-2">
          <v-col class="font-weight-bold">
            TVA
          </v-col>
          <v-col class="d-flex justify-end">
            0€
          </v-col>
        </v-row>
        <v-row dense class="mx-2">
          <v-col class="font-weight-bold">
            Eco-Part
          </v-col>
          <v-col class="d-flex justify-end">
            0€
          </v-col>
        </v-row>
      </v-row>
    </v-container>
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