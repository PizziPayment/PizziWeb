<template>
  <v-card color="transparent" elevation="0">
    <div class="white--text">
      <h2 class="d-flex text-left">
        Product Return
      </h2>
      <p class="subtitle-2 d-flex text-left ml-6">
        Enter Pizzi to return product
      </p>
    </div>
    <v-text-field 
      label="Pizzi ID" 
      outlined 
      color="rgb(112, 192, 242)" 
      dark
      append-icon="mdi-undo"
      prefix="#">
    </v-text-field>
  </v-card>
</template>