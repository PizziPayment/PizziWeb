<template>
  <v-main>
    <router-view />

    <core-footer />
  </v-main>
</template>

<script>
  export default {
    name: 'DashboardCoreView',

    components: {
      CoreFooter: () => import('./Footer'),
    },
  }
</script>