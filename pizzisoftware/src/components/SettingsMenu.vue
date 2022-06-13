<template>
  <div class="text-center">
    <v-menu
      v-model="show"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-y
      transition="slide-y-transition"
      nudge-bottom="10"
      content-class="v-settings"
      max-width="300"
    >
      <template v-slot:activator="slotData">
        <slot
          v-if="$scopedSlots.activator"
          name="activator"
          v-bind="slotData"
        />
      </template>
      <v-card class="themeStyle">
        <v-card-text>
          <p class="font-weight-bold themeStyle">
            {{ $translate.getTranslation("Settings") }}
          </p>
          <!-- <v-item-group>
            <v-item
              v-for="color in colors"
              :key="color"
              :value="color"
              class="mr-2"
            >
              <template v-slot="{ active, toggle }">
                <v-avatar
                  :class="active && 'v-settings__item--active'"
                  :color="color"
                  class="v-settings__item"
                  size="25"
                  @click="toggle"
                />
              </template>
            </v-item>
          </v-item-group> -->
          <v-divider class="my-4 dividerThemeStyle" />
          <v-list class="themeStyle">
            <v-list-item class="themeStyle">
              <v-list-item-action class="themeStyle">
                {{ $translate.getTranslation("Dark Mode") }}
              </v-list-item-action>
              <v-list-item-content>
                <v-switch
                  @click="switchTheme()"
                  v-model="darkTheme"
                  color="green"
                ></v-switch>
              </v-list-item-content>
            </v-list-item>

            <v-list-item class="themeStyle">
              <v-list-item-action class="themeStyle">
                {{ $translate.getTranslation("Drawer Image") }}
              </v-list-item-action>
              <v-list-item-content>
                <v-switch v-model="drawerImage" color="green"></v-switch>
              </v-list-item-content>
            </v-list-item>

            <v-list-item class="themeStyle">
              <v-list-item-action class="themeStyle">
                {{ $translate.getTranslation("Language") }}
              </v-list-item-action>
              <!-- <v-list-item-title> -->
              <!-- </v-list-item-title> -->
              <v-list-item-content>
                <v-menu bottom right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn outlined color="primary" v-bind="attrs" v-on="on">
                      {{ language }}
                    </v-btn>
                  </template>

                  <v-list class="themeStyle">
                    <v-list-item
                      class="themeStyle"
                      @click="setLanguage(item)"
                      v-for="(item, i) in ['en', 'fr']"
                      :key="i"
                    >
                      <v-list-item-title class="themeStyle">{{
                        item
                      }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item-content>
            </v-list-item>

            <v-list-item class="themeStyle">
              <v-list-item-action class="themeStyle">
                {{ $translate.getTranslation("Tutoriel") }}
              </v-list-item-action>
              <v-list-item-content>
                <v-btn
                  outlined
                  color="primary"
                  @click="setTutorialGiven(false)"
                >
                  <v-icon>
                    mdi-help
                  </v-icon>
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    value: Boolean,
  },
  data: () => ({
    darkTheme: true,
    container: undefined,
    drawerImage: true,
    colors: ["#9C27b0", "#00CAE3", "#4CAF50", "#ff9800", "#E91E63", "#FF5252"],
  }),
  mounted() {
    this.$vuetify.theme.dark = true;
    this.container = document.getElementsByClassName("customContainer")[0];
  },
  computed: {
    ...mapState("defaultStore", ["language"]),
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    ...mapActions("defaultStore", [
      "setDarkTheme",
      "setLanguage",
      "setTutorialGiven",
    ]),

    switchTheme() {
      this.setDarkTheme(this.darkTheme);
      this.$vuetify.theme.dark = this.darkTheme;
      this.darkTheme
        ? this.container.removeAttribute("data-theme")
        : this.container.setAttribute("data-theme", "light");
    },
  },
};
</script>

<style lang="sass">
.v-settings
  .v-item-group > *
    cursor: pointer
  &__item
    border-width: 3px
    border-style: solid
    border-color: white !important

    &--active
      border-color: #00cae3 !important
</style>
