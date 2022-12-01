<template>
  <v-app>
    <v-container fluid class="background containerThemeStyle">
      <v-row justify="center" class="mt-12">
        <v-col cols="12" md="8">
          <material-card class="themeStyleCard">
            <template v-slot:heading>
              <div class="display-2 font-weight-light">
                {{ $translate.getTranslation("Generate Receipt") }}
              </div>

              <div class="subtitle-1 font-weight-light ml-6">
                {{ $translate.getTranslation("Add Items to the receipt") }}
              </div>
            </template>
            <v-form>
              <v-container
                style="height: 70vh; overflow: auto"
                class="py-0 themeStyleCard"
              >
                <v-expansion-panels v-model="panel" multiple>
                  <v-expansion-panel
                    v-for="(category, i) in categoriesList"
                    :key="i"
                  >
                    <v-expansion-panel-header>
                      <h3>{{ category.name.toUpperCase() }}</h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row dense style="overflow: auto">
                        <v-col
                          v-for="(item, i) in category.items"
                          :key="i"
                          cols="6"
                        >
                          <v-card
                            @click="addToItems(item)"
                            :color="item.color ? item.color : 'grey'"
                            dark
                            style="min-height: 60px"
                          >
                            <div
                              class="d-flex flex-no-wrap justify-space-between align-center"
                              style="height: 100%"
                            >
                              <div
                                class="d-flex flex-column justify-center align-start"
                                style="padding: 10px"
                              >
                                <span class="text-h5"> {{ item.name }}</span>
                                <span>{{ item.price + " €" }}</span>
                              </div>

                              <div
                                v-if="item.value"
                                class="d-inline-flex justify-center align-center"
                                style="padding-right: 10px"
                              >
                                <v-btn icon @click="addToItems(item)">
                                  <v-icon size="2em"> mdi-plus </v-icon>
                                </v-btn>
                                <span style="font-size: 2em">
                                  {{ item.value }}
                                </span>
                                <v-btn icon @click="removeThisItem(item)">
                                  <v-icon size="2em"> mdi-minus </v-icon>
                                </v-btn>
                              </div>
                            </div>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-container>
            </v-form>
          </material-card>
        </v-col>

        <v-col cols="12" md="4">
          <material-card
            class="v-card-profile"
            :avatar="getAvatarUrl"
          >
            <v-card-text class="text-center">
              <h6 class="display-1 mb-1 grey--text mb-8 mt-n8">
                {{ $translate.getTranslation("Receipt") }}
              </h6>

              <!-- <h4 class="display-2 font-weight-light mb-3">Coiffure Zimone</h4> -->

              <v-btn class="ma-2" color="#58C09D" @click="openCalculator()">
                <div class="d-inline-flex justify-center align-center">
                  <v-icon> mdi-calculator</v-icon>
                  {{ $translate.getTranslation("Open calculator") }}
                </div>
              </v-btn>

              <div v-if="items && items.length > 0">
                <v-card
                  class="mx-auto ma-2 containerThemeStyle"
                  max-width="500"
                  max-height="500"
                  style="overflow: auto"
                >
                  <div class="d-flex justify-end">
                    <v-btn icon @click="clearAllItems()">
                      <v-icon color="red"> mdi-trash-can </v-icon>
                    </v-btn>
                  </div>
                  <v-list two-line>
                    <v-list-item-group
                      v-model="selected"
                      active-class="green--text"
                      multiple
                    >
                      <template v-for="(item, key, index) in items2">
                        <v-list-item :key="index + item">
                          <template>
                            <div
                              class="d-flex flex-column justify-center align-center"
                              style=""
                            >
                              <v-btn
                                icon
                                x-small
                                @click="addToItems(item.item_objects[0])"
                              >
                                <v-icon> mdi-plus </v-icon>
                              </v-btn>
                              <span style="font-size: 18px">
                                {{ item.value }}x
                              </span>
                              <v-btn icon x-small @click="removeThisItem(item)">
                                <v-icon> mdi-minus </v-icon>
                              </v-btn>
                            </div>
                            <v-list-item-content>
                              <v-list-item-title
                                class="text-center"
                                v-text="item.item_objects[0].name"
                              >
                              </v-list-item-title>
                              <v-list-item-title
                                v-text="item.item_objects[0].price + ' €'"
                              ></v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-btn
                                class="mr-2"
                                icon
                                x-small
                                @click="deleteItem(item)"
                              >
                                <v-icon color="red lighten-1"
                                  >mdi-trash-can</v-icon
                                >
                              </v-btn>
                            </v-list-item-action>
                          </template>
                        </v-list-item>

                        <v-divider
                          v-if="index < items.length - 1"
                          :key="index"
                        ></v-divider>
                      </template>
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="'Total ' + calculatePrice() + ' €'"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item-group>
                  </v-list>
                </v-card>

                <v-select
                  :items="discount"
                  v-model="appliedDiscount"
                  dense
                  outlined
                  label="Apply Discount"
                ></v-select>

                <v-btn
                  color="grey"
                  rounded
                  class="ma-3"
                  @click="openCashPayment()"
                >
                  {{ $translate.getTranslation("Cash payment") }}
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                  color="#58C09D"
                  rounded
                  class="mr-0"
                  @click="createTransaction('card')"
                >
                  {{ $translate.getTranslation("Confirmer") }}
                </v-btn>

                <v-spacer></v-spacer>
              </div>
              <div v-else>
                <v-btn disabled color="#58C09D" rounded class="mr-0">
                  {{ $translate.getTranslation("No items selected") }}
                </v-btn>
              </div>
            </v-card-text>
          </material-card>
        </v-col>
      </v-row>
      <DisplayQRCodeDialog ref="QRCodeDialog" />
      <CalculatorDialog ref="CalculatorDialog" />
      <CashReturn
        :totalAmount="calculatePrice()"
        @cashAccepted="createTransaction('cash')"
        ref="CashReturn"
      />
    </v-container>
  </v-app>
</template>

<script>
import materialCard from "@/components/MaterialCard.vue";
import DisplayQRCodeDialog from "@/components/widgets/QRCode/DisplayQRCodeDialog.vue";
import CalculatorDialog from "@/components/widgets/Calculator/Calculator.vue";
import CashReturn from "@/components/dialog/CashReturn.vue";
import moment from "moment";
import axios from "axios";
import Bugsnag from "@bugsnag/js";
import { mapGetters } from "vuex";

moment.locale('fr')
export default {
  components: {
    CalculatorDialog,
    materialCard,
    DisplayQRCodeDialog,
    CashReturn,
  },

  computed: {
    ...mapGetters("defaultStore", ["getAccessToken", "getShopCategories", "getAvatarUrl"]),
  },

  data: () => ({
    panel: [],
    categoriesList: [],
    appliedDiscount: 0,
    selected: [2],
    discount: [0, 5, 10, 20, 30, 40, 50, 60, 70],
    items2: {},
    items: [],
    products: [],
    transactionId: "",
    transactionToken: "",
    transactionCreated: false,
  }),

  mounted() {
    this.loadShopItems();
  },

  methods: {
    removeThisItem(item) {
      item.value -= 1;
      if (this.items2[item.name]) {
        this.items2[item.name].value -= 1;
        this.items2[item.name].item_objects.pop();
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].name == item.name) {
            this.items.splice(i, 1);
            return;
          }
        }
      }
    },
    addToItems(item) {
      if (!this.items2[item.name]) {
        this.items2[item.name] = { item_objects: [], value: 0 };
      }
      this.items2[item.name].value += 1;
      item.value = this.items2[item.name].value;
      this.items2[item.name].item_objects.push(item);
      this.items.push(item);
    },

    getCategories() {
      const uniqueArray = [...new Set(this.getShopCategories)];
      return uniqueArray;
    },

    getCategoryItems(category) {
      const res = [];
      this.products.forEach((product) => {
        if (product.category === category) {
          res.push(product);
        }
      });
      return res;
    },

    buildCategories() {
      const list = [];
      const categories = this.getCategories();

      if (categories.length) {
        categories.forEach((category) => {
          list.push({
            name: category.toLowerCase(),
            items: this.getCategoryItems(category),
          });
        });
      }
      this.categoriesList = list;
    },

    deleteItem(item) {
      item.value = 0;
      delete this.items2[item.name];
      for (let i = this.items.length - 1; i >= 0; i--) {
        if (this.items[i].name == item.name) {
          if (i == 0) {
            this.items.pop();
          }
          this.items.splice(i, 1);
        }
      }
    },

    clearAllItems() {
      for (const key in this.items2) {
        delete this.items2[key];
      }
      this.items.splice(0, this.items.length);
    },

    convertPriceInCents() {
      if (this.products) {
        this.products.forEach(item => {
          item.price = (item.price / 1000)
        })
      }
    },

    loadShopItems() {
      const bearerAuth = {
        Authorization: "Bearer " + this.getAccessToken,
      };
      axios
        .get(process.env.VUE_APP_RESOURCE_URL + "/shops/me/items", {
          headers: bearerAuth,
        })
        .then((response) => {
          if (response.data.items) {
            this.products = response.data.items;
            this.convertPriceInCents();
            this.buildCategories();
          }
        })
        .catch((error) => {
          Bugsnag.notify(error);
          console.error(error);
        });
    },

    setTransactionItemObject() {
      const items = this.getProducts();
      const transactionItemArray = [];
      for (let i = 0; i < items.length; i++) {
        let transactionObj = {};
        transactionObj.shop_item_id = items[i].id;
        transactionObj.discount = items[i].reduction;
        transactionObj.eco_tax = items[i].ecoTax;
        transactionObj.quantity = items[i].quantity;
        transactionObj.warranty = items[i].warranty;
        transactionItemArray.push(transactionObj);
      }
      return transactionItemArray;
    },

    async createTransaction(method) {
      const total_price = this.calculatePrice();
      const items = this.setTransactionItemObject();
      const bearerAuth = {
        Authorization: "Bearer " + this.getAccessToken,
      };
      const body = {
        tva_percentage: 20,
        total_price: parseInt(total_price) * 1000,
        payment_method: method,
        items: items,
      };
      axios
        .post(
          process.env.VUE_APP_RESOURCE_URL + "/shops/me/transactions",
          body,
          {
            headers: bearerAuth,
          }
        )
        .then((response) => {
          console.log('res', response)
          this.transactionId = response.data.id;
          this.transactionToken = response.data.token;
          this.transactionCreated = true;
          if (response.data.id && response.data.token) {
            this.openQrCodeDialog(response.data.id, response.data.token);
          }
        });
    },

    openCashPayment() {
      this.$refs.CashReturn.show();
    },

    calculatePrice() {
      let result = 0;
      if (this.items && this.items.length) {
        for (const item of this.items) {
          result += item.price;
        }
      }
      result = result * (1 - this.appliedDiscount / 1000);
      return parseFloat(result.toFixed(3));
    },

    saveBlob(blob, filename) {
      const link = document.createElement("a");
      // create a blobURI pointing to our Blob
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      // some browser needs the anchor to be in the doc
      document.body.append(link);
      link.click();
      link.remove();
      // in case the Blob uses a lot of memory
      setTimeout(() => URL.revokeObjectURL(link.href), 7000);
    },

    // randomColor() {
    //   return (
    //     "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
    //   );
    // },

    openQrCodeDialog(id, token) {
      this.$refs.QRCodeDialog.show(id, token);
    },

    openCalculator() {
      this.$refs.CalculatorDialog.show();
    },

    getSelectedProducts() {
      let result = "\n";
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i] && this.items[i].name.length > 0) {
          result += this.items[i].name;
          result += "   ";
          result += this.items[i].price;
          result += " $ ";
          result += "\n\n";
        }
      }
      return result;
    },

    getProducts() {
      let products = [];
      for (let i = 0; i < this.items.length; i++) {
        let productObj = {};
        if (this.items[i] && this.items[i].name.length > 0) {
          productObj.id = this.items[i].id;
          productObj.productName = this.items[i].name;
          productObj.quantity = 1;
          productObj.priceUnit = this.items[i].price;
          productObj.warranty = moment().format("LLL").toString();
          productObj.ecoTax = 0;
          productObj.reduction = 0;
        }
        products.push(productObj);
      }
      return products;
    },

    getSocials() {
      let socials = {};
      socials.website = "https://www.coiffurezimone.com";
      socials.instagram = "coiffurezimone";
      socials.linkedin = "coiffurezimone";
      socials.snapchat = "coiffurezimone";
      socials.tiktok = "coiffurezimone";
      socials.facebook = "coiffurezimone";
      socials.twitter = "coiffurezimone";
      return socials;
    },

    getVendor() {
      let vendor = {};
      // set header
      vendor.logo = "";
      vendor.name = "Faudra Tiff Hair";
      vendor.siret = "4379217493821";
      vendor.shopNumber = "562-234-43234";
      // set address
      vendor.address = {};
      vendor.address.street = "19 rue jean soula";
      vendor.address.city = "Bordeaux";
      vendor.address.postalCode = "33000";
      return vendor;
    },

    getReceiptObject() {
      let newReceipt = {};

      newReceipt.vendor = this.getVendor();
      newReceipt.socials = this.getSocials();
      newReceipt.products = this.getProducts();

      // Receipt total
      newReceipt.creationDate = moment().format("LLL").toString();
      newReceipt.paymentType = "card";
      newReceipt.TvaPercentage = 0;
      newReceipt.discount = this.appliedDiscount;
      newReceipt.TotalHt = this.calculatePrice();
      newReceipt.TotalTtc = this.calculatePrice();

      // Receipt Message
      newReceipt.message = "Merci pour votre confiance et à bientôt";
      return JSON.stringify(newReceipt);
    },
  },
};
</script>

<style>
.background {
  height: 100%;
}
</style>
