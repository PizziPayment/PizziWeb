<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" @click:outside="closeDialog()">
      <v-card elevation="5">
        <v-card-title class="text-h6" style="background-color: #05c39b;">
          Edit product
        </v-card-title>

        <v-card-text v-if="oldItem" class="mt-6">
          <v-container>
            <v-row>
              <v-text-field
                v-model="oldItem.name"
                label="Name"
                :placeholder="oldItem.name"
                filled
                clearable
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="oldItem.price"
                label="Price"
                :placeholder="oldItem.price"
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
          <v-btn color="green" text @click="editItem()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar color="green" v-model="snackbar" :timeout="1500">
        <div class="text-center">
          Saved
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
      oldItem: null,
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
    show(oldItem) {
      this.oldItem = oldItem
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
    },

    clearItem() {
      this.oldItem = null;
    },

    openSnackbar() {
      this.snackbar = true
    },

    async editItem() {
      const bearerAuth = {
        Authorization: "Bearer " + this.getAccessToken,
      };
      const body = {
        name: this.oldItem.name,
        price: this.oldItem.price,
      };
      axios
        .patch(process.env.VUE_APP_RESOURCE_URL + "/shops/me/items/" + this.oldItem.id , body, {
          headers: bearerAuth,
        })
        .then(() => {
          this.$emit("editItem")
          this.openSnackbar()
          this.clearItem();
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
