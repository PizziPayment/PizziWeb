<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" @click:outside="closeDialog()">
      <v-card elevation="5">
        <v-card-title class="text-h6 primary darken-2">
          Connect User with QR Code
        </v-card-title>

        <v-card-text class="mt-6">
          <v-container>
            <qrcode-vue :value="getValueQRCode()" :size="size" level="H" />
          </v-container>
        </v-card-text>

        <v-divider></v-divider>
      </v-card>
      <v-snackbar color="green" v-model="snackbar" :timeout="1500">
        <div class="text-center">
          User connected
        </div>
      </v-snackbar>
    </v-dialog>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  components: {
    QrcodeVue,
  },

  data() {
    return {
      id_transac: null,
      token_transac: null,
      snackbar: false,
      dialog: false,
      size: 400,
    };
  },

  methods: {
    show(id, token) {
      this.id_transac = id
      this.token_transac = token
      this.dialog = true;
    },

    getValueQRCode() {
      return JSON.stringify({
        id: this.id_transac,
        token: this.token_transac,
      })
    },

    closeDialog() {
      this.dialog = false;
    },

    openSnackbar() {
      this.snackbar = true;
    },
  },
};
</script>
