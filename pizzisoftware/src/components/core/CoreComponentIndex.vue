<template>
  <v-app>

    <core-app-bar @showDialog='show =! show'/>

    <core-drawer v-model='show'/>

    <core-view />

  </v-app>
</template>

<script>
  export default {
    name: 'CoreLayout',
    components : {
      CoreAppBar: () => import('./AppBar.vue'),
      CoreDrawer: () => import('./Drawer.vue'),
      CoreView: () => import('./View.vue')
    },
    data() {
      return {
        show: true
      }
    }
  }

</script>