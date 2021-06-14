<template>
  <nav>
    <v-app-bar flat color="transparent">
      <v-app-bar-nav-icon color="white" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">
        <span class="font-weight-bold">Pizzi</span>
        <span class="font-weight-light">Dashboard</span>
      </v-toolbar-title>
      <v-spacer/>
      <v-btn text color="white">
        <span>Sign Out</span>
        <v-icon medium right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app color="#3a474e">
      <v-row align-center>
        <v-col class="mt-6">
          <v-avatar color="primary" size="100">
            <v-icon>mdi-content-cut</v-icon>
          </v-avatar>
          <p class="white--text sub-heading mt-6 font-weight-bold">
            Art 'Hair
          </p>
        </v-col>
      </v-row>
      <v-list class="mt-6">
        <widgetDialog v-model="dialog"/>
        <v-list-item v-for="(link, i) in links" :key="i" @click="link.action">
          <v-list-item-icon>
            <v-icon color="rgb(112, 192, 242)" v-text="link.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content style="text-align: left;">
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
  import widgetDialog from '@/components/WidgetDialog.vue'
  export default {
    components: {widgetDialog},
    data () {
      return {
        drawer: false,
        links: [
          { icon: 'mdi-plus', text: 'Manage Widget', action: this.addWidget},
          { icon: 'mdi-account', text: 'Account', action: this.toAccountPage},
          { icon: 'mdi-cog', text: 'Settings', action: this.toSettingsPage},
        ],
        dialog: false,
      }
    },
    methods: {
      addWidget() {
        this.dialog = true
      },
      toAccountPage() {
        console.log('toAccountPage')
      },
      toSettingsPage() {
        console.log('toSettingsPage')
      }
    }
  }
</script>

<style>
</style>