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
              <v-container class="py-0 themeStyleCard">
                <v-row dense>
                  <v-col v-for="(item, i) in products" :key="i" cols="6">
                    <v-card color="grey" dark>
                      <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                          <v-card-title
                            class="text-h5"
                            v-text="item.name"
                          ></v-card-title>

                          <v-card-subtitle
                            v-text="item.price + ' $'"
                          ></v-card-subtitle>

                          <v-card-actions>
                            <v-btn
                              class="ml-2 mt-5"
                              outlined
                              rounded
                              small
                              @click="addToItems(item)"
                            >
                              {{ $translate.getTranslation("Add Item") }}
                            </v-btn>
                          </v-card-actions>
                        </div>
                      </div>
                    </v-card>
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
              <h6 class="display-1 mb-1 grey--text">
                {{ $translate.getTranslation("Receipt") }}
              </h6>

              <h4 class="display-2 font-weight-light mb-3">Faudra Tiff Hair</h4>

              <v-btn class="ma-2" color="primary" @click="openCalculator()">
                {{ $translate.getTranslation("Open calculator") }}
              </v-btn>

              <div v-if="items && items.length > 0">
                <v-card
                  class="mx-auto ma-2"
                  max-width="500"
                  max-height="500"
                  containerThemeStyle
                  style="overflow: auto"
                >
                  <div class="d-flex justify-end">
                    <v-btn icon @click="clearAllItems()">
                      <v-icon> mdi-trash-can </v-icon>
                    </v-btn>
                  </div>
                  <v-list two-line>
                    <v-list-item-group
                      v-model="selected"
                      active-class="blue--text"
                      multiple
                    >
                      <template v-for="(item, key, index) in items2">
                        <v-list-item :key="index + item">
                          <template>
                            <v-list-item-avatar style="font-size: 18px;">
                                {{item.value}}x
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title
                                class="text-center"
                                v-text="item.item_objects[0].name"
                              >
                              </v-list-item-title>
                              <v-list-item-title
                                v-text="item.item_objects[0].price + ' $'"
                              ></v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-row class="pr-1">
                                <v-col class="px-1 mx-0">
                                  <v-btn icon x-small @click="addToItems(item.item_objects[0])">
                                    <v-icon> mdi-plus </v-icon>
                                  </v-btn>
                                </v-col>
                                <v-col class="px-1 mx-0">
                                  <v-btn icon x-small @click="removeThisItem(item.item_objects[0])">
                                    <v-icon> mdi-minus </v-icon>
                                  </v-btn>
                                </v-col>
                              </v-row>
                              <v-btn class="mr-2" icon x-small @click="deleteItem(item.item_objects[0])">
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
                          v-text="'Total ' + calculatePrice() + ' $'"
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
                  color="primary"
                  rounded
                  class="mr-0"
                  @click="createTransaction('card')"
                >
                  {{ $translate.getTranslation("Confirm and link user") }}
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                  color="grey darken-2"
                  rounded
                  icon
                  class="ma-4 mr-0"
                  @click="createTransaction('card')"
                >
                  {{ $translate.getTranslation("Save pdf receipt") }}
                </v-btn>
              </div>
              <div v-else>
                <v-btn disabled color="primary" rounded class="mr-0">
                  {{ $translate.getTranslation("No items selected") }}
                </v-btn>
              </div>
            </v-card-text>
          </material-card>
        </v-col>
      </v-row>
      <DisplayQRCodeDialog ref="QRCodeDialog" />
      <CalculatorDialog ref="CalculatorDialog" />
      <CashReturn :totalAmount="calculatePrice()" @cashAccepted="createTransaction('cash')" ref="CashReturn" />
    </v-container>
  </v-app>
</template>

<script>
import materialCard from "@/components/MaterialCard.vue";
import DisplayQRCodeDialog from "@/components/widgets/QRCode/DisplayQRCodeDialog.vue";
import CalculatorDialog from "@/components/widgets/Calculator/Calculator.vue";
import CashReturn from '@/components/dialog/CashReturn.vue'
import labelmake from "labelmake";
import moment from "moment";
import axios from "axios";
import Bugsnag from "@bugsnag/js";
import { mapGetters } from "vuex";

export default {
  components: { CalculatorDialog, materialCard, DisplayQRCodeDialog, CashReturn },

  computed: {
    ...mapGetters("defaultStore", ["getAccessToken"]),
  },

  data: () => ({
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
      if (this.items2[item.name]) {
        this.items2[item.name].value -= 1
        this.items2[item.name].item_objects.pop()
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].name == item.name) {
            this.items.splice(i, 1)
            return
          }
        }
      }
    },
    addToItems(item) {
      console.log(item)
      if (!this.items2[item.name]) {
        this.items2[item.name] = {item_objects: [], value : 0}
      }
      this.items2[item.name].value += 1
      this.items2[item.name].item_objects.push(item)
      this.items.push(item);
    },

    deleteItem(item) {
      delete this.items2[item.name]
      for (let i = this.items.length - 1; i >= 0; i--) {
        if (this.items[i].name == item.name) {
          if (i == 0) {
            this.items.pop()
          }
          this.items.splice(i, 1)
        }
      }
    },

    clearAllItems() {
      for (const key in this.items2) {
        delete this.items2[key]
      }
      this.items.splice(0, this.items.length)
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
            this.convertPriceInCents()
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
      console.log("test", body);
      axios
        .post(
          process.env.VUE_APP_RESOURCE_URL + "/shops/me/transactions",
          body,
          {
            headers: bearerAuth,
          }
        )
        .then((response) => {
          this.transactionId = response.data.id;
          this.transactionToken = response.data.token;
          this.transactionCreated = true;
          if (response.data.id && response.data.token) {
            this.openQrCodeDialog(response.data.id, response.data.token);
          }
        });
    },

    openCashPayment() {
      this.$refs.CashReturn.show()
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

    async generateReceipt() {
      this.createTransaction();
      const template = {
        basePdf: { width: 210, height: 297 },
        schemas: [
          {
            shopName: {
              type: "text",
              position: {
                x: 50.96,
                y: 49.63,
              },
              width: 100,
              height: 15,
              alignment: "center",
              fontSize: 30,
              characterSpacing: 0,
              lineHeight: 1,
            },
            shopLogo: {
              type: "image",
              position: {
                x: 74.88,
                y: 0,
              },
              width: 51.4,
              height: 49.6,
            },
            PizziID: {
              type: "text",
              position: {
                x: 84.67,
                y: 80.43,
              },
              width: 35,
              height: 7,
              alignment: "center",
              fontSize: 12,
              characterSpacing: 0,
              lineHeight: 1,
            },
            divider1: {
              type: "text",
              position: {
                x: 70.39,
                y: 65.08,
              },
              width: 67.27,
              height: 6.21,
              alignment: "left",
              fontSize: 12,
              characterSpacing: 0,
              lineHeight: 1,
            },
            phoneNumber: {
              type: "text",
              position: {
                x: 84.67,
                y: 72.49,
              },
              width: 35,
              height: 7,
              alignment: "center",
              fontSize: 12,
              characterSpacing: 0,
              lineHeight: 1,
            },
            address: {
              type: "text",
              position: {
                x: 57.15,
                y: 88.9,
              },
              width: 89.5,
              height: 7,
              alignment: "center",
              fontSize: 12,
              characterSpacing: 0,
              lineHeight: 1,
            },
            products: {
              type: "text",
              position: {
                x: 21.7,
                y: 121.98,
              },
              width: 170.2,
              height: 80.02,
              alignment: "center",
              fontSize: 12,
              characterSpacing: 0,
              lineHeight: 1,
            },
            divider2: {
              type: "text",
              position: {
                x: 67.2,
                y: 108.17,
              },
              width: 69.13,
              height: 7,
              alignment: "left",
              fontSize: 12,
              characterSpacing: 0,
              lineHeight: 1,
            },
            date: {
              type: "text",
              position: {
                x: 81.75,
                y: 97.64,
              },
              width: 41.08,
              height: 7,
              alignment: "center",
              fontSize: 12,
              characterSpacing: 0,
              lineHeight: 1,
            },
          },
        ],
      };

      const inputs = [
        {
          shopName: "Pizzi",
          shopLogo:
            "data:image/png;base64,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",
          PizziID: "Pizzi ID",
          divider1: "----------------------------------------------",
          phoneNumber: "06 98 73 96 33\n",
          address: "32 rue de la boetie, 33000 Bordeaux",
          products: this.getSelectedProducts(),
          divider2: "------------------------------------------------",
          date: moment().format("LLL"),
        },
      ];
      const pdf = await labelmake({ template, inputs });
      const blob = new Blob([pdf.buffer], { type: "application/pdf" });
      if (blob) {
        this.saveBlob(blob, "pizziReceiptArtHair.pdf");
      }

      let finalOjb = this.getReceiptObject();
      console.log("final json obj is:", finalOjb);
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
      socials.website = "https://www.faudratiffhair.com";
      socials.instagram = "faudratiffhair";
      socials.linkedin = "faudratiffhair";
      socials.snapchat = "faudratiffhair";
      socials.tiktok = "faudratiffhair";
      socials.facebook = "faudratiffhair";
      socials.twitter = "faudratiffhair";
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
