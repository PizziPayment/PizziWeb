<template>
  <v-app>
  <v-content>
  <v-container class="background" fluid fill-height>
    <v-row class="text-center">
      <v-col class="mb-4">
        <img src="../assets/pizzi.png">
        <h1 class="display-2 font-weight-bold mb-3 white--text">
          Bienvenue sur Pizzi
        </h1>

        <p class="subheading font-weight-regular white--text">
          <router-link to="/login">Connectez-vous</router-link>
           afin d'accéder à nos services
          <br>
        </p>
      </v-col>
    </v-row>
  </v-container>
  </v-content>
  </v-app>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({}),
};
</script>

<style>
.background {
  background-color: black;
  margin: 0px;
  height: 100%;
}
</style>