<template>
  <v-app>
    <v-content style="background-color: black">
      <img src="../assets/pizzi.png" />
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </v-content>
  </v-app>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
