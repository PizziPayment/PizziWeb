<template>
  <v-app>
    <v-content>
      <v-container class="background" fluid fill-height>
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
                    :rules="[(v) => !!v || 'Champ obligatoire']"
                    required
                    type="text"
                    v-model="email"
                  ></v-text-field>
                  <v-text-field
                    name="password"
                    label="mot de passe"
                    id="password"
                    clearable
                    :rules="[(v) => !!v || 'Champ obligatoire']"
                    required
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
    </v-content>
  </v-app>
</template>

<script>

import axios from "axios";

export default {
  name: "LoginComponent",

  data: () => ({
    email: null,
    password: null,
  }),
  computed: {},
  methods: {
    processSignIn() {
      const body = JSON.stringify({
        password: this.password,
        email: this.email
      })
      const options = {
        headers: { "Content-Type": "application/json" },
      };

      axios.post('https://pointecouteau.fr:40402/auth/shop/login', body, options).then(response => {
        console.log(response)
        this.$router.push('/dashboard')
      }).catch(error => {
        console.error(error)
      })
    }
  }
};
</script>

<style>
.background {
  background-color: #030d0fd3;
  margin: 0px;
  height: 100%;
}

.v-text-field {
  width: 400px;
}
</style>