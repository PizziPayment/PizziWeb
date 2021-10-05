<template>
  <div class="text-center">
    <v-menu
      v-model='show'
      :close-on-content-click="false"
      :nudge-width="200"
      offset-y
      transition="slide-y-transition"
      nudge-bottom="10"
      content-class="v-settings"
    >
      <template v-slot:activator="slotData">
        <slot v-if="$scopedSlots.activator" name="activator" v-bind="slotData" />
      </template>
      <v-card>
        <v-card-text>
          <p class="font-weight-bold">Main Color</p>
        <v-item-group v-model="color">
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
          </v-item-group>
          <v-divider class="my-4"/>
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="$vuetify.theme.dark" color="green"></v-switch>
            </v-list-item-action>
            <v-list-item-title>Dark Mode</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="drawerImage" color="green"></v-switch>
            </v-list-item-action>
            <v-list-item-title>Drawer Image</v-list-item-title>
          </v-list-item>
        </v-list>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
  data: () => ({
    drawerImage: true,
    colors: [
        '#9C27b0',
        '#00CAE3',
        '#4CAF50',
        '#ff9800',
        '#E91E63',
        '#FF5252',
      ],
  }),
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
         this.$emit('input', value)
      }
    }
  }
};
</script>

<style lang='sass'>
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