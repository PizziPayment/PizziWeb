<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" @click:outside="closeDialog()">
      <v-card elevation="5">
        <v-card-title class="text-h6 primary darken-2">
          Connect User with QR Code
        </v-card-title>

        <v-card-text class="mt-6">
          <v-container>
            <qrcode-vue :value="value" :size="size" level="H" />
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
      snackbar: false,
      dialog: false,
      value: 'https://youtube.com',
      size: 400,
    };
  },

  methods: {
    show() {
      this.dialog = true;
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
