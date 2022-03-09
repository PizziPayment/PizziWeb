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
          Reset Password 🔐
        </v-card-title>
        <v-card-text>
          <div>
            <div>
              <v-text-field
                class="pa-3"
                label="Old Password"
                v-model="oldPassword"
                clear-icon="mdi-close-circle"
                clearable
                width="300"
              >
              </v-text-field>
            </div>
            <div>
              <v-text-field
                class="pa-3"
                label="New Password"
                v-model="newPassword"
                clear-icon="mdi-close-circle"
                clearable
                width="300"
              >
              </v-text-field>
            </div>
          </div>
        </v-card-text>
        <v-row class="pa-2">
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
      oldPassword: null,
      newPassword: null,
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
      if (this.oldPassword && this.newPassword) {
        const body = {
          password: this.oldPassword,
          new_password: this.newPassword,
        };

        const bearerAuth = {
          Authorization:
            "Bearer " + this.getAccessToken,
        };
        axios
          .put(
            process.env.VUE_APP_RESOURCE_URL + "/shops/me/password",
            body,
            {
              headers: bearerAuth,
            }
          )
          .then((response) => {
            console.log(
              "🚀 ~ file: ResetPassword.vue ~ line 92 ~ .then ~ response",
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
