<template>
  <v-app class="containerThemeStyle">
    <v-container fluid class="background containerThemeStyle">
      <v-row justify="center" class="mt-12">
        <v-col cols="12" md="8">
          <material-card>
            <template v-slot:heading>
              <div class="display-2 font-weight-light">
                {{ $translate.getTranslation("Customize Receipt") }}
              </div>

              <div class="subtitle-1 font-weight-light ml-6">
                {{
                  $translate.getTranslation(
                    "Select the informations that will appear on the receipt"
                  )
                }}
              </div>
            </template>
            <v-form>
              <v-container class="py-0">
                <!-- <v-row> -->
                <v-switch
                  :label="this.$translate.getTranslation('Display Logo')"
                  v-model="shopLogo"
                ></v-switch>
                <v-switch
                  :label="this.$translate.getTranslation('Display shop name')"
                  v-model="shopName"
                ></v-switch>
                <v-switch
                  :label="
                    this.$translate.getTranslation('Display shop address')
                  "
                  v-model="shopAddress"
                ></v-switch>
                <v-switch
                  :label="
                    this.$translate.getTranslation('Display shop website')
                  "
                  v-model="shopWebsite"
                ></v-switch>
                <v-switch
                  :label="
                    this.$translate.getTranslation('Display shop Facebook')
                  "
                  v-model="shopFacebook"
                ></v-switch>
                <v-switch
                  :label="
                    this.$translate.getTranslation('Display shop Instagram')
                  "
                  v-model="shopInstagram"
                ></v-switch>
                <v-switch
                  :label="
                    this.$translate.getTranslation('Display shop Twitter')
                  "
                  v-model="shopTwitter"
                ></v-switch>
                <!-- </v-row> -->
                <v-btn color="success">{{
                  $translate.getTranslation("Save")
                }}</v-btn>
              </v-container>
            </v-form>
          </material-card>
        </v-col>

        <v-col cols="12" md="4">
          <material-card
            class="v-card-profile"
            :avatar="getAvatarUrl"
          >
            <h3 class="pa-2 white--text">Preview</h3>
            <div class="d-flex justify-center align-center">
              <v-card
                style="background-color: white; height: 60%; width: 50%"
              >
                <v-card-text>
                  <v-container class="d-flex justify-center align-center">
                    <v-row>
                      <v-col cols="12">
                        <v-avatar v-if="shopLogo" size="50">
                          <img
                            :src="getAvatarUrl"
                            alt="alt"
                          />
                        </v-avatar>
                      </v-col>
                      <v-col cols="12">
                        <h4 v-if="shopName" class="black--text"> {{getShopInfos.name}} </h4>
                        <h6 v-if="shopAddress" class="black--text">
                          {{getShopInfos.address + ' ' + getShopInfos.address + ' ' + getShopInfos.zipcode}}
                        </h6>
                        <h6 class="black--text">
                          {{ moment().format("LLL") }}
                        </h6>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-simple-table light>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-left"> {{ $translate.getTranslation("Name") }} </th>
                              <th class="text-left"> {{ $translate.getTranslation("Price") }}</th>
                              <th class="text-left"> {{ $translate.getTranslation("Taxes") }}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in items" :key="item.id">
                              <td>{{ item.name }}</td>
                              <td>{{ item.price }}</td>
                              <td>{{ item.taxes + " %" }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                      <v-col cols="12">
                        <h5 class="black--text">
                          Total (incl. taxes) - 60 euros
                        </h5>
                        <v-container>
                          <qrcode-vue
                            :value="valueQRCode"
                            :size="50"
                            level="H"
                          />
                    <div class="d-flex align-center justify-center flex-column">
                      <v-btn v-if="shopWebsite" x-small icon color="primary">
                        <v-icon>mdi-web</v-icon>
                        <span> {{ getShopInfos.website }} </span>
                      </v-btn>
                      <v-btn v-if="shopFacebook" x-small icon color="primary">
                        <v-icon>mdi-facebook</v-icon>
                        <span> {{ getShopInfos.facebook }} </span>
                      </v-btn>
                      <v-btn v-if="shopTwitter" x-small icon color="primary">
                        <v-icon>mdi-twitter</v-icon>
                        <span> {{ getShopInfos.twitter }} </span>
                      </v-btn>
                      <v-btn v-if="shopInstagram" x-small icon color="primary">
                        <v-icon>mdi-instagram</v-icon>
                        <span> {{ getShopInfos.instagram }} </span>
                      </v-btn>
                    </div>
                        </v-container>
                      </v-col>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </div>
          </material-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import materialCard from "@/components/MaterialCard.vue";
import QrcodeVue from "qrcode.vue";
import { mapGetters } from "vuex";
import moment from "moment";
// import axios from "axios";

export default {
  components: { materialCard, QrcodeVue },

  mounted() {
    moment().locale("fr");
  },
  data() {
    return {
      moment,
      shopLogo: false,
      shopName: false,
      shopAddress: false,
      shopEmail: false,
      shopWebsite: false,
      shopFacebook: false,
      shopInstagram: false,
      shopTwitter: false,
      paymentMethod: false,
      items: [
        {
          id: 123,
          name: "Item 1",
          price: 20,
          taxes: 5,
        },
        {
          id: 124,
          name: "Item 2",
          price: 20,
          taxes: 2,
        },
        {
          id: 125,
          name: "Item 3",
          price: 20,
          taxes: 5,
        },
      ],
      valueQRCode: JSON.stringify({
        id: this.id,
        token: this.token,
      }),
    };
  },
  computed: {
    ...mapGetters("defaultStore", ["getShopInfos", "getAccessToken", "getAvatarUrl"]),
  },

  methods: {
    saveCustomReceipt() {
      console.log("save");
    },
  },
};
</script>

<style>
.background {
  height: 100%;
}
</style>
