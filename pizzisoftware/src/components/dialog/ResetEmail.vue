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
          Reset Email ✉️
        </v-card-title>
        <v-card-text>
          <div>
            <div>
              <v-text-field
                class="pa-3"
                label="New Email"
                v-model="newEmail"
                clear-icon="mdi-close-circle"
                clearable
                width="300"
              >
              </v-text-field>
            </div>
            <div>
              <v-text-field
                class="pa-3"
                label="Password"
                v-model="password"
                clear-icon="mdi-close-circle"
                clearable
                width="300"
              >
              </v-text-field>
            </div>
          </div>
        </v-card-text>
        <v-row class="pa-6">
          <v-col>
            <v-btn color="primary" @click.stop="processReset()"> Reset </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      newEmail: null,
      password: null,
      dialog: false,
    };
  },
  computed: {
    ...mapGetters('defaultStore', [
      'getAccessToken',
    ])
  },
  methods: {
    show() {
      this.dialog = true;
    },

    async processReset() {
      if (this.newEmail && this.password) {
        const body = {
          new_email: this.newEmail,
          password: this.password,
        };

        const bearerAuth = {
          Authorization:
            "Bearer " + this.getAccessToken,
        };
        axios
          .patch(
            process.env.VUE_APP_AUTHORIZATION_URL + "/shops/me/email",
            body,
            {
              headers: bearerAuth,
            }
          )
          .then((response) => {
            console.log(
              "🚀 ~ file: ResetEmail.vue ~ line 86 ~ .then ~ response",
              response
            );
           // if success - dialog false
          })
          .catch((error) => {
            alert(error);
            console.error(error);
          });
      }
    },
  },
};
</script>
