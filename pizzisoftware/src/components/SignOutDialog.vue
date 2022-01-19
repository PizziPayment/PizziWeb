<template>
  <v-dialog v-model="show" max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          Sign Out ?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            text
          >
            No
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="$router.push({ path: '/Login' })"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["value"],
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