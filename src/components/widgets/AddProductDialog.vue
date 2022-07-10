<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" @click:outside="closeDialog()">
      <v-card elevation="5">
        <v-card-title class="text-h6" style="background-color: #05c39b;">
          Add product
        </v-card-title>

        <v-card-text class="mt-6">
          <v-container>
            <v-row>
              <v-text-field
                v-model="name"
                label="Product name"
                filled
                clearable
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="price"
                label="Price"
                filled
                type="number"
                clearable
              ></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" text @click="saveItem()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar color="green" v-model="snackbar" :timeout="1500">
        <div class="text-center">
          Item saved
        </div>
      </v-snackbar>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Bugsnag from '@bugsnag/js'
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      snackbar: false,
      name: "",
      price: "",
      dialog: false,
    };
  },

  computed: {
    ...mapGetters("defaultStore", ["getAccessToken"]),
  },

  methods: {
    show() {
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
    },

    clearItem() {
      this.name = "";
      this.price = "";
    },

    openSnackbar() {
      this.snackbar = true
    },

    async saveItem() {
      const bearerAuth = {
        Authorization: "Bearer " + this.getAccessToken,
      };
      const body = {
        items: [
          {
            name: this.name,
            price: this.price,
          },
        ],
      };
      axios
        .post(process.env.VUE_APP_RESOURCE_URL + "/shops/me/items", body, {
          headers: bearerAuth,
        })
        .then(() => {
          this.$emit("addItem")
          this.openSnackbar()
          this.clearItem();
          Bugsnag.Breadcrumb('New item added into DB')
          this.dialog = false
        })
        .catch((error) => {
          Bugsnag.notify(error)
          console.error(error);
        });
    },
  },
};
</script>
