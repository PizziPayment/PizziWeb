<template>
  <v-row class="text-center">
    <v-col class="mb-4" style="color: white">
      <h1 class="display-2 font-weight-bold mb-3">Bienvenue sur Pizzi</h1>

      <p class="subheading font-weight-regular">
        <router-link to="/login">Connectez-vous</router-link>
        afin d'accéder à nos services
        <br />
      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({}),
};
</script>
