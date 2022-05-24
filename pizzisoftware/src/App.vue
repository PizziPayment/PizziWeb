<template>
  <v-app>
    <div class="app">
      <router-view/>
    </div>
  </v-app>
</template>

<script>
export default {
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: var(--v-background-base);
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<style>
.v-step {
  background-color: transparent !important;
  backdrop-filter: blur(10px) !important;
  max-width: fit-content !important;
  border: thin dotted white !important;
}
.v-step__content {
  font-size: 20px !important;
}
.v-step__arrow {
  background-color: white !important
}
</style>
