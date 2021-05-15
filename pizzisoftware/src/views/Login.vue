<template>
  <v-main>
    <v-container class="background ma-0 pt-16 pb-16" fluid fill-height>
      <v-col align="center">
        <v-card class="white" outlined max-width="1000">
          <v-container>
            <v-row class="text-center">
              <v-col cols="12">
                <v-img
                  :src="require('../assets/pizzi.png')"
                  class="my-3"
                  contain
                  height="150"
                />
              </v-col>

              <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">Connexion</h1>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col align="center">
                <v-text-field
                  name="email"
                  label="adresse mail"
                  id="mail"
                  clearable
                  type="text"
                  v-model="email"
                ></v-text-field>
                <v-text-field
                  name="password"
                  label="mot de passe"
                  id="password"
                  clearable
                  type="password"
                  v-model="password"
                ></v-text-field>
                <v-btn @click="processSignIn()" justify-center small color="primary"
                  >connexion</v-btn
                >
                <v-col>
                  <router-link to="/signup">Créez votre compte</router-link>
                </v-col>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "LoginComponent",

  data: () => ({
    email: null,
    password: null,
  }),
  computed: {},
  methods: {
    processSignIn() {
      this.$router.push({ path: '/dashboard' })
      // console.log("credentials : ", this.email, this.password);
      // this.$store.dispatch('defaultStore/signInUser', { email: this.email, password: this.password })
      // console.log(this.$store.state.defaultStore.isUserLoggedIn)
      // if (this.$store.state.defaultStore.isUserLoggedIn == true) {
      //   this.$router.push({ path: '/dashboard' })
      // }
    }
  }
};
</script>

<style>
.background {
  background-color: #030d0fd3;
}

.v-text-field {
  width: 400px;
}
</style>