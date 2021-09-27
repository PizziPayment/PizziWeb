<template>
  <nav>
    <v-app-bar flat color="transparent">
      <v-app-bar-nav-icon
        color="white"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">
        <span class="font-weight-bold">Pizzi</span>
        <span class="font-weight-light">Dashboard</span>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app color="#3a474e">
      <v-row align-center>
        <v-col class="mt-6">
          <v-avatar size="100">
            <img src="https://img.freepik.com/vecteurs-libre/illustration-vectorielle-outils-coiffeur-ciseaux-rasoir-poteau-ruban-echantillon-texte_74855-10555.jpg?size=338&ext=jpg&ga=GA1.2.1637736129.1624752000">
          </v-avatar>
          <p class="white--text sub-heading mt-6 font-weight-bold">Art 'Hair</p>
        </v-col>
      </v-row>
      <v-divider dark>
      </v-divider>
      <v-list class="mt-6">
        <v-list-item v-for="(link, i) in links" :key="i" @click="link.action">
          <v-list-item-icon>
            <v-icon color="rgb(112, 192, 242)" v-text="link.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content style="text-align: left">
            <v-list-item-title class="white--text">{{
              link.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: "mdi-view-dashboard", text: 'Dashboard', action: this.toDashboard },
        { icon: "mdi-account", text: "Profile", action: this.toProfilePage },
        { icon: "mdi-cog", text: "Settings", action: this.toSettingsPage},
        { icon: "mdi-exit-to-app", text: "Sign Out", action: this.signOut}
      ],
      dialog: false,
    };
  },
  methods: {
    toDashboard() {
      this.$router.push({ path: '/dashboard' })
    },
    toProfilePage() {
      this.$router.push({ path: '/profile' })
    },
    toSettingsPage() {
      this.$router.push({ path: '/settings' })
    },
    signOut() {
      this.$router.push({ path: '/login' })
    }
  },
};
</script>

<style>
.theme--light.v-navigation-drawer .v-divider {
    border-color: rgba(255, 255, 255, 0.4);
}
</style>