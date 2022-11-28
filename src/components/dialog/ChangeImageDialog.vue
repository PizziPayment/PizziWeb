<template>
  <v-dialog max-width="40vw" @click:outside="close()" v-model="isVisible">
    <v-card
      class="d-flex align-center justify-center"
      v-if="loading"
      height="20vw"
    >
      <v-progress-circular
        :size="50"
        color="grey"
        indeterminate
      ></v-progress-circular>
    </v-card>
    <v-card v-else class="" elevation="0">
      <v-card-title class="d-flex justify-center">
          {{ $translate.getTranslation("Change image") }}
        </v-card-title>
      <v-container
        style="height: 30vh; width: 20vw; overflow: auto"
        class="pa-3 themeStyleCard"
      >
      <v-row>
        <v-file-input
         v-model="imageSelected"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Choisir image"
          prepend-icon="mdi-camera"
          label="Avatar"
        ></v-file-input>
      </v-row>
      <v-row class="pa-2">
          <v-col>
            <v-btn :disabled="!imageSelected" color="primary" @click.stop="saveImage()"> {{ $translate.getTranslation("Save") }} </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import Bugsnag from "@bugsnag/js";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    loading: false,
    isVisible: false,
    imageSelected: null,
    imageBase64String: null
  }),
  computed: {
    ...mapGetters("defaultStore", [
      "getAccessToken",
    ]),
  },
  watch: {
    // imageSelected: function (newVal) {
    //   if(newVal) {
    //     this.createBase64Image(newVal);
    //   } else {
    //     this.imageBase64String = null;
    //   }
    // }
  },
  methods: {
    show() {
      this.isVisible = true;
    },

    close() {
      this.isVisible = false;
    },

    async saveImage() {
      if (this.imageSelected) {
        let formData = new FormData();
        formData.append('avatar', this.imageSelected);

        const bearerAuth = {
          'content-Type': 'multipart/form-data',
          Authorization: "Bearer " + this.getAccessToken,
        };
        axios
          .post(
            process.env.VUE_APP_RESOURCE_URL + "/shops/me/avatar",
            formData,
            {
              headers: bearerAuth,
            }
          )
          .then((response) => {
            // emit image changed
            // loading false
            console.log("res", response)
            this.close()
            // if success - dialog false
          })
          .catch((error) => {
            alert('Erreur de chargement');
            Bugsnag.notify(error);
            console.error(error);
          });
      }
    },

    createBase64Image: function(FileObject) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.imageBase64String = event.target.result;
      }
      reader.readAsDataURL(FileObject);
    },
  },
};
</script>
