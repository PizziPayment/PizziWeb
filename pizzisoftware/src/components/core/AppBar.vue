<template>
  <v-app-bar app flat absolute color='transparent'>
      <v-app-bar-nav-icon
        @click="showDialog()"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span class="font-weight-bold">Pizzi</span>
        <span class="font-weight-light">Dashboard</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <settings-menu v-model="show">
        <template v-slot:activator="{ on }">
        <v-btn v-on='on' icon>
          <v-icon>mdi-cog</v-icon>
        </v-btn>
        </template>
      </settings-menu>
    </v-app-bar>
</template>

<script>

  import settingsMenu from '@/components/SettingsMenu.vue'

  export default {
    name: 'CoreAppBar',
    components: { settingsMenu },
    data: () => ({
      show:false
    }),
    methods: {
      showDialog() {
        this.$emit('showDialog')
      }
    }
  }

</script>

<style>
</style>