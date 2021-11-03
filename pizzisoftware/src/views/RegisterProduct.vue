<template>
  <v-app>
    <v-container fluid class="background">
      <v-row justify="center" class="mt-12">
        <v-col cols="12" md="8">
          <material-card>
            <template v-slot:heading>
              <div class="display-2 font-weight-light">Add a new product</div>
              <div class="subtitle-1 font-weight-light">
                Add a new product to your inventory
              </div>
            </template>
            <v-form  ref="form" v-model="valid" lazy-validation>
              <v-container class="py-0">
                <v-row>
                  <v-col>
                    <v-text-field
                      clearable
                      v-model="nameInput"
                      :rules="nameRules"
                      label="Name"
                      required
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      clearable
                      v-model="priceInput"
                      :rules="priceRules"
                      label="Price"
                      required
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      clearable
                      v-model="idInput"
                      :rules="idRules"
                      label="ID"
                      required
                    />
                  </v-col>

                  <v-col cols="12" class="text-center">
                    <v-btn :disabled="!valid" color="success" @click='validate'>
                      Add to Inventory
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </material-card>
        </v-col>
      </v-row>
      <v-card class="mt-16 mx-12 pa-4">
        <v-simple-table fixed-header height="300px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Price
                </th>
                <th class="text-left">
                  ID
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in inventory"
                :key="item.name"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.price }}€</td>
                <td>#{{item.id}}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import materialCard from "@/components/MaterialCard.vue";

export default {
  components: { materialCard },

  data: () => ({
    valid: true,
    nameInput: '',
    nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ],
    priceInput: '',
    priceRules: [
      v => !!v || 'Price is required',

    ],
    idInput: '',
    idRules: [
        v => !!v || 'Id is required',
        v => (v && v.length == 5) || 'ID must be 5 characters long',
      ],
    inventory: [],
  }),
  methods: {
    validate () {
       if (this.$refs.form.validate()) {
         const obj = {name: this.nameInput, price: this.priceInput, id : this.idInput}
         this.inventory.push(obj)
         this.$refs.form.reset()
       }
       this.$refs.form.reset()
      },
  }
};
</script>

<style>
.background {
  height: 100%;
}
</style>
