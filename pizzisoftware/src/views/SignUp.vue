<template>
    <div class="background ma-0 pt-16 pb-16" fluid fill-height>
      <v-col align="center">
        <v-card class="mx-auto" max-width="800">
          <v-card-title class="title font-weight-regular justify-space-between">
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
                  clearable="true"
                  type="text"
                  id="mail"
                  v-model="email"
                  :rules="[(v) => !!v || 'Champ obligatoire']"
                  required
                  outlined
                ></v-text-field>
                <span class="caption grey--text text--darken-1">
                  Cette adresse e-mail sera utilisée pour vous connecter à votre
                  compte Pizzi.
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="2">
              <v-card-text>
                <v-text-field
                  label="Mot de passe"
                  type="password"
                  clearable="true"
                  v-model="password"
                  :rules="[(v) => !!v || 'Champ obligatoire']"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  label="Confirmation du mot de passe"
                  type="password"
                  clearable="true"
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
                <v-btn @click="processSignUp()" color="success">connectez-vous</v-btn>
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
    </div>
</template>

<script>
export default {
  data: () => ({
    step: 1,
    email: null,
    password: null,
    confirmPassword: null,
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
      this.$store.dispatch('defaultStore/signUpUser', {email: this.email, password: this.password})
      this.$router.push({ path: '/login' })
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