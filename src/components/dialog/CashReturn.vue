<template>
  <v-dialog
    @click:outside="dialog = false"
    v-model="dialog"
    persistent
    max-width="40%"
  >
    <v-card>
      <v-card-text>
        <v-card-title class="d-flex justify-center">
          {{ $translate.getTranslation("Cash payment") }}
        </v-card-title>
        <div>
          <h2> {{ $translate.getTranslation("Amount") }} : {{ totalAmount }} $ </h2>
        </div>
        <v-card-text>
          <div>
            <div>
              <v-text-field
                v-model="amountGiven"
                prepend-inner-icon="mdi-cash"
                @input="processGiveBack()"
                :label="$translate.getTranslation('Amount given')"
                filled
                type="number"
                clearable
              ></v-text-field>
            </div>
          </div>
          <v-spacer />
          <div>
            <h2 :class="textColor"> {{ $translate.getTranslation(textCashReturn) }} : {{ cashReturn }} $ </h2>
          </div>
        </v-card-text>
        <v-row class="pa-2">
          <v-col>
            <v-btn color="green" @click.stop="acceptPayment()">
              {{ $translate.getTranslation("Save payment") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      textCashReturn: 'Give back',
      textColor: 'grey--text',
      amountGiven: 0,
      cashReturn: 0,
      newEmail: null,
      dialog: false,
    };
  },

  props: {
    totalAmount: Number,
  },

  computed: {
    ...mapGetters("defaultStore", ["getAccessToken"]),
  },

  methods: {
    show() {
      this.dialog = true;
    },

    getTextColor() {
      return this.textColor
    },

    processGiveBack() {
      this.textCashReturn = 'Give back'
      if (this.amountGiven > 0) {
        this.textColor = 'green--text'
        this.cashReturn = this.amountGiven - this.totalAmount
        if (this.cashReturn < 0) {
          this.textColor = 'red--text'
          this.textCashReturn = 'Missing'
        }
        this.cashReturn = this.cashReturn.toFixed(2)
      } else {
        this.cashReturn = 0
      }
    },

    acceptPayment() {
      this.$emit('cashAccepted')
      this.dialog = false
    },
  },
};
</script>
