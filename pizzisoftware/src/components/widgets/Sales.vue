<template>
  <v-card style="background-color: #3a474e;">
      <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
          :nudge-right="40"
          :nudge-bottom="10"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              dark
              v-model="date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              flat
              hide-details="auto"
              class="pt-6 px-6"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)"> OK </v-btn>
          </v-date-picker>
        </v-menu>
    <v-list dark color="#3a474e" class="pa-6">
      <v-list-item v-for="(fakeProduct, i) in fakeProducts" :key="i">
        <v-list-item-content style="text-align: left;">
          <v-list-item-title v-text="fakeProduct.name"/>
        </v-list-item-content>
        <v-spacer/>
        <v-list-item-icon>
          {{fakeProduct.price}}
          <v-icon small>mdi-currency-eur</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      date: '2021-06-09',
      fakeProducts : [
        { name: 'Coupe Homme Etudiant', price: '18' },
        { name: 'Coupe Femme', price: '30' },
        { name: 'Couleur Femme + Coupe', price: '45' },
        { name: 'Coupe Homme Adulte', price: '25' },
        { name: 'Coupe Enfant', price: '14' },
        { name: 'Coupe Enfant', price: '14' },
        { name: 'Coupe Homme Etudiant', price: '18' },
        { name: 'Coupe Homme Etudiant', price: '18' },
        { name: 'Couleur Femme + Coupe', price: '45' },
        { name: 'Coupe Femme', price: '30' },
      ],
      menu: false
    }
  }
}
</script>