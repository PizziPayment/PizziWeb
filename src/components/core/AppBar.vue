<template>
  <v-app-bar class="themeStyle" app flat absolute>
    <v-app-bar-nav-icon
      class="themeStyle"
      @click="showDialog()"
    ></v-app-bar-nav-icon>
    <v-spacer />
    <v-btn class="themeStyle" icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <settings-menu v-model="show">
      <template v-slot:activator="{ on }">
        <v-btn class="themeStyle" v-on="on" icon>
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </template>
    </settings-menu>
  </v-app-bar>
</template>

<script>
import settingsMenu from "@/components/SettingsMenu.vue";

export default {
  name: "CoreAppBar",
  components: { settingsMenu },
  data: () => ({
    show: false,
  }),
  methods: {
    showDialog() {
      this.$emit("showDialog");
    },
  },
};
</script>

<style></style>
