<template>
  <v-app>
    <v-content>
      <v-container class="background" fluid fill-height>
        <v-col align="center">
          <v-card outlined max-width="1000">
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
                  <v-btn
                    @click="processSignIn()"
                    :disabled="!email && !password"
                    justify-center
                    small
                    color="primary"
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
      <v-snackbar
        color="red"
        v-model="snackbar"
        :timeout="3000"
      >
        {{ $translate.getTranslation(textSnackbar) }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import Bugsnag from '@bugsnag/js'
import { mapActions } from "vuex";

export default {
  name: "LoginComponent",

  data: () => ({
    textSnackbar: "Login Error, please contact us",
    snackbar: false,
    email: null,
    password: null,
  }),

  computed: {},

  methods: {
    ...mapActions("defaultStore", ["userLogin"]),

    async processSignIn() {
      const body = {
        email: this.email,
        password: this.password,
      };

      const basicAuth = {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.VUE_APP_CLIENT_ID + ":" + process.env.VUE_APP_SECRET
          ).toString("base64"),
      };
      axios
        .post(process.env.VUE_APP_AUTHORIZATION_URL + "/shop/login", body, {
          headers: basicAuth,
        })
        .then((response) => {
          const success = this.userLogin({
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            expirationToken: response.data.access_token_expires_at,
          });
          if (success) {
            Bugsnag.Breadcrumb("User Login", this.email)
            this.$router.push("/dashboard");
          } else {
            this.textSnackbar = "Ouch, an error happened. Please contact us"
            this.snackbar = true
            Bugsnag.notify('Error happened during login', this.email)
            console.error("Error login");
          }
        })
        .catch((error) => {
          Bugsnag.notify('Error - invalid credentials', this.email)
          this.textSnackbar = "Error - invalid credentials"
          this.snackbar = true
          console.error(error);
        });
    },
  },
};
</script>

<style>
.background {
  margin: 0px;
  height: 100%;
}

.v-text-field {
  width: 400px;
}
</style>
