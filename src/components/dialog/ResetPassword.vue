<template>
  <v-dialog
    @click:outside="dialog = false"
    v-model="dialog"
    persistent
    max-width="40%"
  >
    <v-card>
      <v-card-text>
        <v-card-title class="d-flex justify-center">
          {{ $translate.getTranslation("Reset Password") }} 🔐
        </v-card-title>
        <v-card-text>
          <div style="width: 100%">
            <div style="width: 100%">
              <v-text-field
                :label="$translate.getTranslation('Old Password')"
                :type="passwordIsVisible ? 'text' : 'password'"
                :append-icon="passwordIsVisible ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="passwordIsVisible = !passwordIsVisible"
                clearable
                v-model="oldPassword"
                required
                width="300"
                outlined
              ></v-text-field>
            </div>
            <v-text-field
              :label="$translate.getTranslation('New Password')"
              :type="passwordIsVisible ? 'text' : 'password'"
              :append-icon="passwordIsVisible ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="passwordIsVisible = !passwordIsVisible"
              clearable
              width="300"
              v-model="newPassword"
              required
              outlined
            ></v-text-field>
            <div
              style="
                width: 100%;
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
                        (rule.rule && rule.rule(newPassword) ? 'green' : 'red')
                      "
                    >
                      {{ $translate.getTranslation(rule.label) }}
                    </span>
                  </div>
                </template>
                <template
                  v-if="rule.tooltip && typeof rule.tooltip === 'function'"
                >
                  {{ rule.tooltip(newPassword) }}
                </template>
                <template v-else>
                  {{ $translate.getTranslation(rule.tooltip) }}
                </template>
              </v-tooltip>
            </div>
          </div>
        </v-card-text>
        <v-row class="pa-2">
          <v-col>
            <v-btn
              :disabled="!checkRegexPassword(this.newPassword)"
              color="primary"
              @click.stop="processReset()"
            >
              Reset
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import Bugsnag from "@bugsnag/js";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      oldPassword: null,
      newPassword: null,
      dialog: false,
      passwordIsVisible: false,
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
          tooltip: "at least a lower case",
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
          tooltip: "at least a upper case",
        },
        {
          rule: (toCheck) => {
            return toCheck && /[^\w]/.test(toCheck);
          },
          label: "at least a symbol",
          tooltip: "at least a symbol",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("defaultStore", ["getAccessToken"]),
  },
  methods: {
    checkRegexPassword(password) {
      const regexExpr =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*_?&])[A-Za-z\d \t@$!%_*?&]{12,}$/;
      if (regexExpr.test(password)) {
        return true;
      }
      return false;
    },

    show() {
      this.dialog = true;
    },

    async processReset() {
      if (this.oldPassword && this.newPassword) {
        const body = {
          password: this.oldPassword,
          new_password: this.newPassword,
        };

        const bearerAuth = {
          Authorization: "Bearer " + this.getAccessToken,
        };
        axios
          .put(process.env.VUE_APP_RESOURCE_URL + "/shops/me/password", body, {
            headers: bearerAuth,
          })
          .then((response) => {
            console.log(
              "🚀 ~ file: ResetPassword.vue ~ line 92 ~ .then ~ response",
              response
            );
            // if success - dialog false
          })
          .catch((error) => {
            alert(error);
            Bugsnag.notify(error);
            console.error(error);
          });
      }
    },
  },
  watch: {
    dialog() {
      if (!this.dialog) {
        this.newPassword = "";
        this.oldPassword = "";
      }
    },
  },
};
</script>
