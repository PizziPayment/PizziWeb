<template>
  <v-app>
    <v-content>
      <v-container class="background" fluid fill-height>
        <v-col align="center">
          <v-card class="mx-auto" max-width="70%">
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
                    label="Prénom"
                    clearable
                    type="text"
                    id="name"
                    v-model="name"
                    :rules="[(v) => !!v || 'Champ obligatoire']"
                    required
                    outlined
                  ></v-text-field>
                  <!-- <span class="caption grey--text text--darken-1">
                    Cette adresse e-mail sera utilisée pour vous connecter à
                    votre compte Pizzi.
                  </span> -->
                </v-card-text>
                <v-card-text>
                  <v-text-field
                    label="Nom de famille"
                    clearable
                    type="text"
                    id="surname"
                    v-model="surname"
                    :rules="[(v) => !!v || 'Champ obligatoire']"
                    required
                    outlined
                  ></v-text-field>
                  <!-- <span class="caption grey--text text--darken-1">
                    Cette adresse e-mail sera utilisée pour vous connecter à
                    votre compte Pizzi.
                  </span> -->
                </v-card-text>
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
                v-if="step === 2"
                :disabled="step === 3"
                color="primary"
                depressed
                @click="passwordConfirm()"
              >
                Suivant
              </v-btn>
              <v-btn
                v-if="step !== 2"
                :disabled="step === 3"
                color="primary"
                depressed
                @click="step++"
              >
                Suivant
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    step: 1,
    email: null,
    password: null,
    name: null,
    surname: null,
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
        this.email.length > 0 &&
        this.name &&
        this.name.length > 0 &&
        this.surname &&
        this.surname.length > 0
      ) {
        const body = JSON.stringify({
          name: this.name,
          surname: this.surname,
          password: this.password,
          email: this.email,
        });
        const options = {
          headers: { "Content-Type": "application/json" },
        };
        axios
          .post("https://pointecouteau.fr:40401/shops", body, options)
          .then((response) => {
            console.log(response);
            this.$router.push({ path: "/login" });
          })
          .catch((error) => {
            this.$router.push("/");
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
