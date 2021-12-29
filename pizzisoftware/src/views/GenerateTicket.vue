<template>
  <v-app>
    <v-container fluid class="background">
      <v-row justify="center" class="mt-12">
        <v-col cols="12" md="8">
          <material-card>
            <template v-slot:heading>
              <div class="display-2 font-weight-light">Edit Receipt</div>

              <div class="subtitle-1 font-weight-light">
                Add Items to the receipt
              </div>
            </template>
            <v-form>
              <v-container class="py-0">
                <v-row dense>
                  <v-col v-for="(item, i) in products" :key="i" cols="6">
                    <v-card :color="item.color" dark>
                      <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                          <v-card-title
                            class="text-h5"
                            v-text="item.title"
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
                              Add Item
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
              <h6 class="display-1 mb-1 grey--text">Receipt</h6>

              <h4 class="display-2 font-weight-light mb-3">
                Faudra Tiff Hair
              </h4>

              <div v-if="items && items.length > 0">
                <v-card
                  class="mx-auto ma-2"
                  max-width="500"
                  max-height="500"
                  style="overflow: auto;"
                >
                  <v-list two-line>
                    <v-list-item-group
                      v-model="selected"
                      active-class="blue--text"
                      multiple
                    >
                      <template v-for="(item, index) in items">
                        <v-list-item :key="item.title">
                          <template>
                            <v-list-item-content>
                              <v-list-item-title
                                class="text-center"
                                v-text="item.title"
                              >
                              </v-list-item-title>
                              <v-list-item-title
                                v-text="item.price + ' $'"
                              ></v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-btn icon x-small @click="deleteItem(index)">
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
                  color="primary"
                  rounded
                  class="mr-0"
                  @click="generateReceipt()"
                >
                  Download
                </v-btn>
              </div>
              <div v-else>
                <v-btn
                  disabled
                  color="primary"
                  rounded
                  class="mr-0"
                  @click="generateReceipt()"
                >
                  no items selected
                </v-btn>
              </div>
            </v-card-text>
          </material-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import materialCard from "@/components/MaterialCard.vue";
import jsPDF from "jspdf";

export default {
  components: { materialCard },

  data: () => ({
    appliedDiscount: 0,
    selected: [2],
    discount: [0, 5, 10, 20, 30, 40, 50, 60, 70],
    items: [],
    products: [
      {
        color: "#1F7087",
        title: "Coupe Homme",
        price: "20",
      },
      {
        color: "#952175",
        title: "Coupe Femme",
        price: "35",
      },
      {
        color: "#1F7061",
        title: "Coupe Enfant",
        price: "10",
      },
      {
        color: "#959175",
        title: "Tarif Réduit",
        price: "18",
      },
      {
        color: "#1F7981",
        title: "Shampoing Supernova Brillance",
        price: "10",
      },
      {
        color: "#959175",
        title: "Café",
        price: "5",
      },
    ],
  }),

  methods: {
    addToItems(item) {
      if (item) {
        this.items.push(item);
      }
    },

    deleteItem(index) {
      this.items.splice(index, 1);
    },

    calculatePrice() {
      let result = 0
      if (this.items && this.items.length) {
        for(const item of this.items) {
          result += parseInt(item.price)
        }
      }
      result = result * (1 - this.appliedDiscount / 100)
      return result
    },

    generateReceipt() {
      const doc = new jsPDF();

      doc.addImage(
        "https://img.freepik.com/vecteurs-libre/illustration-vectorielle-outils-coiffeur-ciseaux-rasoir-poteau-ruban-echantillon-texte_74855-10555.jpg?size=338&ext=jpg&ga=GA1.2.1637736129.1624752000",
        5,
        10
      );
      doc.text("Pizzi Receipt 01", 85, 20);
      doc.text("Faudra Tiff Hair", 85, 25);

      // add items to pdf
      let xPosition = 100;
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i] && this.items[i].title.length > 0) {
          doc.text(this.items[i].title, 10, xPosition);
          doc.text(this.items[i].price + ' $', 10, xPosition + 10);
          xPosition += 20;
        }
      }
      doc.text("Total: " + this.calculatePrice() + ' $', 10, xPosition + 10);
      doc.save("pizziReceiptArtHair.pdf");
    },
  },
};
</script>

<style>
.background {
  height: 100%;
}
</style>
