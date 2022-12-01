<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" @click:outside="closeDialog()">
      <v-card elevation="5">
        <v-card-title class="text-h6" style="background-color: #05c39b;">
          {{ $translate.getTranslation("Edit Product") }}
        </v-card-title>

        <v-card-text v-if="oldItem" class="mt-6">
          <v-container>
            <v-row>
              <v-combobox
                v-model="oldItem.category"
                :items="types"
                :label="$translate.getTranslation('Categories')"
                chips
              ></v-combobox>
            </v-row>
            <v-row>
              <v-text-field
                v-model="oldItem.name"
                :label="$translate.getTranslation('Name')"
                :placeholder="oldItem.name"
                filled
                clearable
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="oldItem.price"
                :label="$translate.getTranslation('Price')"
                :placeholder="oldItem.price"
                filled
                type="number"
                clearable
              ></v-text-field>
            </v-row>
            <v-row>
              <v-expansion-panels inset>
                <v-expansion-panel expand focusable>
                  <v-expansion-panel-header>{{ $translate.getTranslation("Select item color") }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-color-picker
                    :v-model="oldItem.color ? oldItem.color : '#BDBDBD'"
                    class="ma-2"
                    show-swatches
                    hide-canvas
                  ></v-color-picker>
                </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" text @click="editItem()">
            {{ $translate.getTranslation('Save') }}
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar color="green" v-model="snackbar" :timeout="1500">
        <div class="text-center">
          {{ $translate.getTranslation('Saved') }}
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
      types: ['services', 'shampoing', 'homme', 'femme', 'enfants'],
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
        price: parseInt(this.oldItem.price) * 1000,
        category: this.oldItem.category,
        color: this.oldItem.color ? this.oldItem.color : '#BDBDBD'
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
