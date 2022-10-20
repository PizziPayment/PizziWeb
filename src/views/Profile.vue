<template>
  <v-app class="containerThemeStyle">
    <v-container fluid class="background containerThemeStyle">
      <v-row justify="center" class="mt-12">
        <v-col cols="12" md="8">
          <material-card>
            <template v-slot:heading>
              <div class="display-2 font-weight-light">
                {{ $translate.getTranslation("Edit Profile") }}
              </div>

              <div class="subtitle-1 font-weight-light ml-6">
                {{ $translate.getTranslation("Complete your profile") }}
              </div>
            </template>
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      :label="$translate.getTranslation('Company')"
                      disabled
                      :value="getShopInfos.name"
                    />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      class="purple-input"
                      :label="$translate.getTranslation('Email Address')"
                      disabled
                      :value="getShopInfos.email"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      class="purple-input"
                      :label="$translate.getTranslation('Address')"
                      disabled
                      :value="getShopInfos.address"
                    />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      class="purple-input"
                      :label="$translate.getTranslation('City')"
                      disabled
                      :value="getShopInfos.city"
                    />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      class="purple-input"
                      type="number"
                      :label="$translate.getTranslation('Postal Code')"
                      disabled
                      :value="getShopInfos.zipcode"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      class="purple-input"
                      :label="$translate.getTranslation('About My Company')"
                      v-model="description"
                      auto-grow
                      row="1"
                      row-height="15"
                    />
                  </v-col>
                  <v-row class="pa-6 mb-10">
                    <v-col cols="3">
                      <v-text-field
                        label="Facebook"
                        prepend-icon="mdi-facebook"
                        v-model="facebook"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        label="Instagram"
                        prepend-icon="mdi-instagram"
                        v-model="instagram"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        label="Twitter"
                        prepend-icon="mdi-twitter"
                        v-model="twitter"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        label="Website"
                        prepend-icon="mdi-web"
                        v-model="website"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-col cols="12" class="text-right">
                    <v-btn color="success" class="mr-0" @click="updateShopInfos">
                      {{ this.$translate.getTranslation("Update Profile") }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </material-card>
        </v-col>

        <v-col cols="12" md="4">
          <material-card
            class="v-card-profile"
            avatar="https://img.freepik.com/vecteurs-libre/illustration-vectorielle-outils-coiffeur-ciseaux-rasoir-poteau-ruban-echantillon-texte_74855-10555.jpg?size=338&ext=jpg&ga=GA1.2.1637736129.1624752000"
          >
            <v-card-text class="text-center">
              <h4 class="display-2 font-weight-light mb-3">
                {{getShopInfos.name}}
              </h4>
              <p class="font-weight-light">
                {{getShopInfos.description}}
              </p>
              <v-divider></v-divider>
              <div>
                <div>
                  <v-btn
                    small
                    color="grey"
                    rounded
                    class="ma-2 mr-0"
                    @click.stop="showResetEmail()"
                  >
                    {{ this.$translate.getTranslation("Reset email") }}
                  </v-btn>
                </div>
                <div>
                  <v-btn
                    small
                    color="grey"
                    rounded
                    class="ma-2 mr-0"
                    @click.stop="showResetPassword()"
                  >
                    {{ this.$translate.getTranslation("Reset password") }}
                  </v-btn>
                </div>
              </div>
            </v-card-text>
          </material-card>
        </v-col>
      </v-row>
      <ResetEmail ref="ResetEmailDialog" />
      <ResetPassword ref="ResetPasswordDialog" />
    </v-container>
  </v-app>
</template>

<script>
import materialCard from "@/components/MaterialCard.vue";
import ResetEmail from "@/components/dialog/ResetEmail.vue";
import ResetPassword from "@/components/dialog/ResetPassword.vue";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  components: { materialCard, ResetEmail, ResetPassword },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("defaultStore", ["getShopInfos", "getAccessToken"]),
    description: {
      get () {
        return this.getShopInfos.description
      },
      set (value) {
        this.$store.commit('defaultStore/UPDATE_SHOP_DESCRIPTION', value)
      }
    },
    website: {
      get () {
        return this.getShopInfos.website
      },
      set (value) {
        this.$store.commit('defaultStore/UPDATE_SHOP_WEBSITE', value)
      }
    },
    facebook: {
      get () {
        return this.getShopInfos.facebook
      },
      set (value) {
        this.$store.commit('defaultStore/UPDATE_SHOP_FACEBOOK', value)
      }
    },
    instagram: {
      get () {
        return this.getShopInfos.instagram
      },
      set (value) {
        this.$store.commit('defaultStore/UPDATE_SHOP_INSTAGRAM', value)
      }
    },
    twitter: {
      get () {
        return this.getShopInfos.twitter
      },
      set (value) {
        this.$store.commit('defaultStore/UPDATE_SHOP_TWITTER', value)
      }
    },
  },

  methods: {
    showResetEmail() {
      this.$refs.ResetEmailDialog.show();
    },
    showResetPassword() {
      this.$refs.ResetPasswordDialog.show();
    },
    updateShopInfos() {
      const bearerAuth = {
        Authorization: "Bearer " + this.getAccessToken,
      };
      const body = {
        description : this.description,
        website: this.website,
        twitter: this.twitter,
        facebook: this.facebook,
        instagram: this.instagram
      };
      console.log(this.description, bearerAuth)
      axios
        .patch(process.env.VUE_APP_RESOURCE_URL + "/shops",
          body, 
          {
            headers: bearerAuth,
          }
        )
        .then(() => {
          this.$router.push('/dashboard')
        })
    }
  },
};
</script>

<style>
.background {
  height: 100%;
}
</style>
