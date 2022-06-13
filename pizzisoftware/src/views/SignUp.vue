<template>
  <v-app>
    <v-content>
      <v-container class="background" fluid fill-height>
        <v-col align="center">
          <v-card class="mx-auto" max-width="60%">
            <v-card-title
              class="title font-weight-regular justify-space-between"
            >
              <span>{{ currentTitle }}</span>
              <v-avatar
                color="primary lighten-2"
                class="subheading white--text"
                size="24"
                v-text="step"
              ></v-avatar>
            </v-card-title>

            <v-window v-model="step">
              <v-window-item :value="1">
                <v-card-text>
                  <v-text-field
                    label="Email"
                    clearable
                    type="text"
                    id="mail"
                    v-model="email"
                    :rules="[(v) => !!v || 'Champ obligatoire']"
                    required
                    outlined
                  ></v-text-field>
                  <span class="caption grey--text text--darken-1">
                    Cette adresse e-mail sera utilisée pour vous connecter à
                    votre compte Pizzi.
                  </span>
                </v-card-text>
              </v-window-item>

              <v-window-item :value="2">
                <v-card-text>
                  <v-text-field
                    label="Mot de passe"
                    type="password"
                    clearable
                    v-model="password"
                    :rules="[(v) => !!v || 'Champ obligatoire']"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Confirmation du mot de passe"
                    type="password"
                    clearable
                    v-model="confirmPassword"
                    :rules="[(v) => !!v || 'Champ obligatoire']"
                    required
                    outlined
                  ></v-text-field>
                </v-card-text>
              </v-window-item>

              <v-window-item :value="3">
                <v-card-text>
                  <v-text-field
                    label="Nom de votre commerce"
                    type="text"
                    clearable
                    v-model="shopName"
                    :rules="[(v) => !!v || 'Champ obligatoire']"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Adresse"
                    type="text"
                    clearable
                    v-model="address"
                    :rules="[(v) => !!v || 'Champ obligatoire']"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Ville"
                    type="text"
                    clearable
                    v-model="city"
                    :rules="[(v) => !!v || 'Champ obligatoire']"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Code Postal"
                    type="text"
                    clearable
                    v-model="zipCode"
                    :rules="[(v) => !!v || 'Champ obligatoire']"
                    required
                    outlined
                  ></v-text-field>
                </v-card-text>
              </v-window-item>

              <v-window-item :value="4">
                <div class="pa-4 text-center">
                  <v-img
                    class="mb-4"
                    contain
                    height="128"
                    src="../assets/pizzi.png"
                  ></v-img>
                  <h3 class="title font-weight-light mb-2">
                    Bienvenue sur Pizzi
                  </h3>
                  <span class="caption grey--text"
                    >Merci d'avoir créé votre compte</span
                  >
                  <v-spacer></v-spacer>
                  <v-btn @click="processSignUp()" color="success"
                    >connectez-vous</v-btn
                  >
                </div>
              </v-window-item>
            </v-window>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn :disabled="step === 1" text @click="step--">
                Précédent
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                v-if="step === 4"
                :disabled="step === 4"
                color="primary"
                depressed
                @click="passwordConfirm()"
              >
                Suivant
              </v-btn>
              <v-btn
                v-if="step !== 4"
                :disabled="step === 4"
                color="primary"
                depressed
                @click="step++"
              >
                Suivant
              </v-btn>
            </v-card-actions>
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
import Bugsnag from '@bugsnag/js';

export default {
  data: () => ({
    textSnackbar: "Login Error, please contact us",
    snackbar: false,
    step: 1,
    shopName: '',
    address: '',
    city: '',
    zipCode: '',
    email: null,
    password: null,
    confirmPassword: null,
    dialog: false,
  }),
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Inscription";
        case 2:
          return "Créez votre mot de passe";
        case 3:
          return "Informations sur votre commerce";
        default:
          return "Compte créé";
      }
    },
  },
  methods: {
    processSignUp() {
      if (
        this.password &&
        this.password.length > 0 &&
        this.email &&
        this.email.length > 0
      ) {
        const body = {
          name: this.shopName,
          place: {
            address: this.address,
            city: this.city,
            zipcode: this.zipCode
          },
          password: this.password,
          email: this.email,
          phone: '+33 6 12 34 56 78',
          siret: '43014643100019' 
        };
        console.log(body)
        const basicAuth = {
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.VUE_APP_CLIENT_ID + ':' + process.env.VUE_APP_SECRET
            ).toString("base64"),
        };
        axios
          .post(process.env.VUE_APP_RESOURCE_URL + "/shops", body, { headers: basicAuth })
          .then((response) => {
            Bugsnag.leaveBreadcrumb('New user subscribed', response)
            this.$router.push({ path: "/login" });
          })
          .catch((error) => {
            this.textSnackbar = "Error - impossible to sign up, please check your inputs"
            this.snackbar = true
            this.step = 1
            Bugsnag.notify(error)
            console.error(error);
          });
      }
    },

    passwordConfirm() {
      if (!this.password || !this.confirmPassword) {
        console.error("Error: fetching password input");
        return;
      }
      if (this.password !== this.confirmPassword) {
        console.error("Error: passwords are different");
        return;
      }
      if (this.password.length < 8) {
        console.error("Error: password should be more than 8 characters");
        return;
      }
      this.step++;
    },
  },
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
