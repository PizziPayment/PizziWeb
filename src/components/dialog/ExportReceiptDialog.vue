<template>
  <div class="text-center">
    <v-dialog v-if="receipt" v-model="dialog" width="30vw" @click:outside="closeDialog()">
        <vue-html2pdf
          :show-layout="false"
          :float-layout="true"
          :enable-download="true"
          :preview-modal="true"
          :paginate-elements-by-height="1400"
          :filename="'TicketPizzi#' + receiptId"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a4"
          @hasStartedGeneration="hasStartedGeneration()"
          @hasGenerated="hasGenerated($event)"
          ref="html2Pdf"
        >
          <section slot="pdf-content">
            <div class="container_content" id="container_content">
              <div class="invoice-box">
                <table cellpadding="0" cellspacing="0">
                  <tr class="top">
                    <td colspan="2">
                      <table>
                        <tr>
                          <td class="title">
                            <img
                              :src="require('@/assets/pizzi.png')"
                              style="max-width: 200px max-height: 200px;"
                            />
                          </td>

                          <td>
                            Pizzi ID #: {{ receiptId }}<br />
                            {{ $translate.getTranslation("Creation date") }} :
                            {{ moment(receipt.creation_date).format("LLL")
                            }}<br />
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr class="information">
                    <td colspan="2">
                      <table>
                        <tr>
                          <td>
                            {{ getShopInfos.name }} <br />
                            {{ getShopInfos.address }}<br />
                            {{ getShopInfos.city + " " + getShopInfos.zipcode }}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr class="heading">
                    <td>{{ $translate.getTranslation("Payment method") }}</td>

                    <td>{{ $translate.getTranslation("Amount") }}</td>
                  </tr>

                  <tr class="details">
                    <td>{{ receipt.payment_type }}</td>

                    <td> {{ receipt.total_ttc / 1000 }} </td>
                  </tr>

                  <tr class="heading">
                    <td>{{ $translate.getTranslation("Product") }}</td>

                    <td>{{ $translate.getTranslation("Price") }}</td>
                  </tr>

                  <div v-for="(product, idx) in receipt.products" :key="idx">
                    <tr class="item">
                      <td>
                        {{ product.quantity }} x {{ product.product_name }}
                      </td>

                      <td>{{( product.unit_price / 1000)}} €</td>
                    </tr>
                  </div>

                  <tr class="total">
                    <td></td>
                    <td>{{ $translate.getTranslation("Total (without taxes)") }}: {{ receipt.total_ht / 1000 }} €</td>
                  </tr>

                  <tr class="total">
                    <td></td>

                    <td>{{ $translate.getTranslation("Total (taxes included)") }}: {{ receipt.total_ttc / 1000 }} €</td>
                  </tr>
                </table>
              </div>
            </div>
          </section>
        </vue-html2pdf>
    </v-dialog>
  </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
import { mapGetters } from "vuex";
import moment from "moment";

moment.locale("fr");
export default {
  components: { VueHtml2pdf },

  props: {},
  data() {
    return {
      moment,
      dialog: false,
      receiptId: null,
      receipt: null,
    };
  },
  computed: {
    ...mapGetters("defaultStore", ["getAccessToken", "getShopInfos"]),
  },
  methods: {
    show(id, receipt) {
      this.dialog = true;
      this.receiptId = id;
      this.receipt = receipt
      if (this.$refs.html2Pdf) {
        this.generateReport()
      }
    },

    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },

    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>

<style>
.invoice-box {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 24px;
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  color: #555;
}

.invoice-box table {
  width: 100%;
  line-height: inherit;
  text-align: left;
}

.invoice-box table td {
  padding: 5px;
  vertical-align: top;
}

.invoice-box table tr td:nth-child(2) {
  text-align: right;
}

.invoice-box table tr.top table td {
  padding-bottom: 20px;
}

.invoice-box table tr.top table td.title {
  font-size: 45px;
  line-height: 45px;
  color: #333;
}

.invoice-box table tr.information table td {
  padding-bottom: 40px;
}

.invoice-box table tr.heading td {
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}

.invoice-box table tr.details td {
  padding-bottom: 20px;
}

.invoice-box table tr.item td {
  border-bottom: 1px solid #eee;
}

.invoice-box table tr.item.last td {
  border-bottom: none;
}

.invoice-box table tr.total td:nth-child(2) {
  border-top: 2px solid #eee;
  font-weight: bold;
}

@media only screen and (max-width: 600px) {
  .invoice-box table tr.top table td {
    width: 100%;
    display: block;
    text-align: center;
  }

  .invoice-box table tr.information table td {
    width: 100%;
    display: block;
    text-align: center;
  }
}

/** RTL **/
.invoice-box.rtl {
  direction: rtl;
  font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial,
    sans-serif;
}

.invoice-box.rtl table {
  text-align: right;
}

.invoice-box.rtl table tr td:nth-child(2) {
  text-align: left;
}
</style>
