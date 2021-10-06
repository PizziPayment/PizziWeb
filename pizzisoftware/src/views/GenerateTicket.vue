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
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      clearable
                      v-model="input"
                      label="Item"
                      class="purple-input"
                      @keyup.enter="addToItems()"
                    />
                  </v-col>

                  <v-col cols="12" class="text-center">
                    <v-btn color="success" class="mr-0" @click="addToItems()">
                      Add item
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
              <h6 class="display-1 mb-1 grey--text">Receipt</h6>

              <h4 class="display-2 font-weight-light mb-3">
                Faudra Tiff Hair
              </h4>

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
                              v-text="item.title"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </v-list-item>

                      <v-divider
                        v-if="index < items.length - 1"
                        :key="index"
                      ></v-divider>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-card>

              <v-btn
                color="primary"
                rounded
                class="mr-0"
                @click="generateReceipt()"
              >
                Download
              </v-btn>
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
    input: null,
    selected: [2],
    items: [
      {
        title: "Shampoing Nova Ultra Brillance",
      },
      {
        title: "Coupe Homme",
      },
    ],
  }),

  methods: {
    addToItems() {
      if (this.input && this.input.length > 0) {
        const obj = { title: this.input.toString() };
        this.items.push(obj);
        this.input = "";
      }
    },

    generateReceipt() {
      const doc = new jsPDF();

      doc.addImage(
        "https://img.freepik.com/vecteurs-libre/illustration-vectorielle-outils-coiffeur-ciseaux-rasoir-poteau-ruban-echantillon-texte_74855-10555.jpg?size=338&ext=jpg&ga=GA1.2.1637736129.1624752000",
        5,
        10
      );
      doc.text("Pizzi Receipt", 85, 20);
      doc.text("Art Hair", 85, 25);

      // add items to pdf
      let xPosition = 100;
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i] && this.items[i].title.length > 0) {
          doc.text(this.items[i].title, 10, xPosition);
          xPosition += 10;
        }
      }
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
