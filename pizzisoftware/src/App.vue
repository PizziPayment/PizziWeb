<template>
  <v-app class="customContainer">
    <div class="app themeStyle">
      <router-view />
    </div>
  </v-app>
</template>

<style lang="scss">
.containerThemeStyle {
  background: var(--pizzi-bg2) !important;
}
.colorTheme {
  color: var(--pizzi-color) !important;
}
.themeStyle {
  background: var(--pizzi-bg) !important;
  color: var(--pizzi-color) !important;
}
.themeStyleCard {
  color: var(--pizzi-color) !important;
  background: var(--pizzi-bg-chart) !important;
}
.dividerThemeStyle {
  border-color: var(--pizzi-color) !important;
}

:root,
/* Dark Mode Theme */
[data-theme="default"] {
  --pizzi-green: #02c39a;
  --pizzi-gradient: radial-gradient(circle, rgba(2, 195, 154, 1) 0%, black 60%);
  --pizzi-bg: black;
  --pizzi-bg2: #121212;
  --pizzi-bg-chart: #1e1e1e;
  --pizzi-color: #02c39a;
  --pizzi-color2: #efefef;
  --box-shadow-color: rgb(18, 18, 19, 0.2);
  --toggler-color: #444352;
  --switch-on-color: #fff;
  --switch-off-color: #ccc;
}

[data-theme="light"] {
  --pizzi-green: #02c39a;
  --pizzi-gradient: "";
  --pizzi-bg: #02c39a;
  --pizzi-bg2: #02c39a;
  --pizzi-bg-chart: white;
  --pizzi-color: black;
  --pizzi-color2: black;
  --box-shadow-color: rgba(0, 0, 0, 0.2);
  --switch-on-color: #444352;
  --switch-off-color: #ccc;
  --toggler-color: #fff;
}

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
  background-color: white !important;
}
</style>
