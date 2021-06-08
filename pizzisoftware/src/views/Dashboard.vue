<template>
  <v-app>
    <v-content>
      <v-container fluid class="background">
        <Navbar />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/NavBar.vue'


export default {
  components : { Navbar },
  data () {
    return {

    }
  }
}
</script>

<style>
  .background {
    background-color: rgb(40, 50, 55);
    height: 100%;
  }
</style>