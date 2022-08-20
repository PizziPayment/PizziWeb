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
                    :error-messages="emailErrors"
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
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
                <v-card-text
                  class="d-flex flex-column justify-center align-center"
                >
                  <v-text-field
                    label="Mot de passe"
                    type="password"
                    clearable
                    v-model="password"
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Confirmation du mot de passe"
                    type="password"
                    clearable
                    v-model="confirmPassword"
                    :error-messages="confirmPasswordErrors"
                    @input="$v.confirmPassword.$touch()"
                    @blur="$v.confirmPassword.$touch()"
                    required
                    outlined
                  ></v-text-field>
                  <div
                    style="
                      min-width: 200px;
                      width: 60%;
                      display: grid;
                      grid-template-columns: repeat(2, 1fr);
                    "
                  >
                    <v-tooltip
                      :left="index % 2 === 0"
                      :right="index % 2 !== 0"
                      v-for="(rule, index) in rulesConfig"
                      :key="index"
                      style="width: fit-content"
                    >
                      <template v-slot:activator="{ on }">
                        <div class="d-inline-flex flex-row align-center">
                          <v-icon> mdi-circle-medium </v-icon>
                          <span
                            v-on="on"
                            :style="
                              'color: ' +
                              (rule.rule && rule.rule(password)
                                ? 'green'
                                : 'red')
                            "
                          >
                            {{ $translate.getTranslation(rule.label) }}
                          </span>
                        </div>
                      </template>
                      <template
                        v-if="
                          rule.tooltip && typeof rule.tooltip === 'function'
                        "
                      >
                        {{ rule.tooltip(password) }}
                      </template>
                      <template v-else>
                        {{ $translate.getTranslation(rule.tooltip) }}
                      </template>
                    </v-tooltip>
                  </div>
                </v-card-text>
              </v-window-item>

              <v-window-item :value="3">
                <v-card-text>
                  <v-text-field
                    label="Nom de votre commerce"
                    type="text"
                    clearable
                    v-model="shopName"
                    :error-messages="shopNameErrors"
                    @input="$v.shopName.$touch()"
                    @blur="$v.shopName.$touch()"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Adresse"
                    type="text"
                    clearable
                    v-model="address"
                    :error-messages="addressErrors"
                    @input="$v.address.$touch()"
                    @blur="$v.address.$touch()"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Ville"
                    type="text"
                    clearable
                    v-model="city"
                    :error-messages="cityErrors"
                    @input="$v.city.$touch()"
                    @blur="$v.city.$touch()"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Code Postal"
                    type="text"
                    clearable
                    v-model="zipCode"
                    :error-messages="zipCodeErrors"
                    @input="$v.zipCode.$touch()"
                    @blur="$v.zipCode.$touch()"
                    required
                    outlined
                  ></v-text-field>

                  <v-text-field
                    label="Numéro de téléphone"
                    type="text"
                    clearable
                    v-model="phoneNumber"
                    :error-messages="phoneNumberErrors"
                    @input="$v.phoneNumber.$touch()"
                    @blur="$v.phoneNumber.$touch()"
                    required
                    outlined
                  ></v-text-field>

                  <v-text-field
                    label="Siret"
                    type="text"
                    clearable
                    v-model="siret"
                    :error-messages="siretErrors"
                    @input="$v.siret.$touch()"
                    @blur="$v.siret.$touch()"
                    required
                    outlined
                  ></v-text-field>
                </v-card-text>
              </v-window-item>

              <v-window-item :value="4">
                <div
                  class="d-flex flex-column align-start justify-center"
                  style="
                    min-width: 200px;
                    width: fit-content;
                    margin-bottom: 20px;
                  "
                >
                  <div
                    class="d-flex flex-row justify-start align-center"
                    v-for="(config, index) in resumeConfig"
                    :key="index"
                    style="width: fit-content; gap: 10px; margin-top: 10px"
                  >
                    <span style="font-weight: bold">
                      {{ $translate.getTranslation(config.label) + ": " }}
                    </span>
                    <div
                      class="resumeField d-inline-flex justify-center align-center"
                    >
                      {{ getResumeData(config.dataName) }}
                      <v-icon @click="step = config.step" small>
                        mdi-pen
                      </v-icon>
                    </div>
                  </div>
                </div>
              </v-window-item>

              <v-window-item :value="5">
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
                :disabled="step === 5"
                color="primary"
                depressed
                @click="goToNextSlide()"
              >
                {{
                  step !== 4
                    ? $translate.getTranslation("Suivant")
                    : $translate.getTranslation("Create account")
                }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-snackbar color="red" v-model="snackbar" :timeout="3000">
          {{ $translate.getTranslation(textSnackbar) }}

          <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
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
import Bugsnag from "@bugsnag/js";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required },
    confirmPassword: { required },
    shopName: { required },
    address: { required },
    city: { required },
    zipCode: { required },
    phoneNumber: { required },
    siret: { required },
  },

  data: () => ({
    rulesConfig: [
      {
        rule: (toCheck) => {
          return toCheck && toCheck.length >= 12;
        },
        label: "at least 12 characters",
        tooltip: (string) => {
          return "current length " + (string ? string.length : 0);
        },
      },
      {
        rule: (toCheck) => {
          return toCheck && /[a-z]/.test(toCheck);
        },
        label: "at least a lower case",
        tooltip: "at least a lower case letter",
      },
      {
        rule: (toCheck) => {
          return toCheck && /[0-9]/.test(toCheck);
        },
        label: "at least a number",
        tooltip: "at least a number",
      },
      {
        rule: (toCheck) => {
          return toCheck && /[A-Z]/.test(toCheck);
        },
        label: "at least a upper case",
        tooltip: "at least a upper case letter",
      },
      {
        rule: (toCheck) => {
          return toCheck && /[^\w]/.test(toCheck);
        },
        label: "at least a symbol",
        tooltip: "at least a symbol",
      },
    ],
    resumeConfig: [
      {
        label: "email",
        dataName: "email",
        step: 1,
      },
      {
        label: "shopName",
        dataName: "shopName",
        step: 3,
      },
      {
        label: "address",
        dataName: "address",
        step: 3,
      },
      {
        label: "city",
        dataName: "city",
        step: 3,
      },
      {
        label: "zipCode",
        dataName: "zipCode",
        step: 3,
      },
      {
        label: "phoneNumber",
        dataName: "phoneNumber",
        step: 3,
      },
      {
        label: "siret",
        dataName: "siret",
        step: 3,
      },
    ],
    textSnackbar: "Login Error, please contact us",
    snackbar: false,
    step: 1,
    shopName: "",
    address: "",
    city: "",
    zipCode: "",
    phoneNumber: "",
    siret: "",
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
        case 4:
          return "Resume";
        default:
          return "Compte créé";
      }
    },

    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Adresse email invalide");
      !this.$v.email.required && errors.push("Requis");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Requis");
      if (!this.checkRegexPassword(this.password))
        errors.push(
          "Doit contenir 12 charactères ou plus, une majuscule, une minuscule, un chiffre, et un charactère spécial."
        );
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.required && errors.push("Requis");
      if (this.confirmPassword !== this.password)
        errors.push("Les mots de passe doivent être identiques");
      return errors;
    },
    shopNameErrors() {
      const errors = [];
      if (!this.$v.shopName.$dirty) return errors;
      !this.$v.shopName.required && errors.push("Requis");
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.address.$dirty) return errors;
      !this.$v.address.required && errors.push("Requis");
      return errors;
    },
    cityErrors() {
      const errors = [];
      if (!this.$v.city.$dirty) return errors;
      !this.$v.city.required && errors.push("Requis");
      return errors;
    },
    zipCodeErrors() {
      const errors = [];
      if (!this.$v.zipCode.$dirty) return errors;
      !this.$v.zipCode.required && errors.push("Requis");
      return errors;
    },
    phoneNumberErrors() {
      const errors = [];
      if (!this.$v.phoneNumber.$dirty) return errors;
      !this.$v.phoneNumber.required && errors.push("Requis");
      return errors;
    },
    siretErrors() {
      const errors = [];
      if (!this.$v.siret.$dirty) return errors;
      !this.$v.siret.required && errors.push("Requis");
      return errors;
    },
  },
  methods: {
    getResumeData(dataName) {
      return this[dataName];
    },
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
            zipcode: this.zipCode,
          },
          password: this.password,
          email: this.email,
          phone: this.phoneNumber,
          siret: this.siret,
        };
        console.log(body);
        const basicAuth = {
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.VUE_APP_CLIENT_ID + ":" + process.env.VUE_APP_SECRET
            ).toString("base64"),
        };
        axios
          .post(process.env.VUE_APP_RESOURCE_URL + "/shops", body, {
            headers: basicAuth,
          })
          .then((response) => {
            Bugsnag.leaveBreadcrumb("New user subscribed", response);
            this.$router.push({ path: "/login" });
          })
          .catch((error) => {
            this.textSnackbar =
              "Error - impossible de créer un compte, veuillez nous contacter";
            this.snackbar = true;
            this.step = 1;
            Bugsnag.notify(error);
            console.error(error);
          });
      }
    },

    checkRegexPassword(password) {
      const regexExpr =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*_?&])[A-Za-z\d \t@$!%_*?&]{12,}$/;
      if (regexExpr.test(password)) {
        return true;
      }
      return false;
    },

    isShopDescriptionValid() {
      if (
        this.shopNameErrors.length === 0 &&
        this.addressErrors.length === 0 &&
        this.cityErrors.length === 0 &&
        this.zipCodeErrors.length === 0 &&
        this.phoneNumberErrors.length === 0 &&
        this.siretErrors.length === 0
      ) {
        return true;
      }
      return false;
    },

    goToNextSlide() {
      this.$v.$touch();
      if (this.step === 1 && this.emailErrors.length === 0) {
        this.step += 1;
      } else if (
        this.step === 2 &&
        this.passwordErrors.length === 0 &&
        this.confirmPasswordErrors.length === 0
      ) {
        this.step += 1;
      } else if (this.step === 3 && this.isShopDescriptionValid()) {
        this.step += 1;
      } else if (this.step === 4) {
        this.step += 1;
      }
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

<style scoped>
.resumeField {
  padding-inline: 10px;
  background: rgba(169, 166, 166, 0.182);
  border-radius: 20px;
}
</style>
