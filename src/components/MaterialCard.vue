<template>
  <v-card v-bind="$attrs" :class="classes" class="v-card--material pa-3">
    <div class="d-flex grow flex-wrap">
      <v-avatar
        v-if="avatar"
        :size="avatar_size"
        class="mx-auto v-card--material__avatar elevation-6"
        :style="avatar_position"
      >
        <v-img :src="avatar" />
      </v-avatar>

      <v-sheet
        v-else
        :class="{
          'pa-1': !$slots.image,
        }"
        :max-height="icon ? 90 : undefined"
        :width="icon ? 'auto' : '100%'"
        class="text-start my-2 pb-6"
        dark
      >
        <slot v-if="$slots.heading" name="heading" />

        <slot v-else-if="$slots.image" name="image" />

        <div
          v-else-if="title && !icon"
          class="display-1 font-weight-light"
          v-text="title"
        />

        <v-icon v-else-if="icon" size="32" v-text="icon" />

        <div v-if="text" class="headline font-weight-thin" v-text="text" />
      </v-sheet>

      <div v-if="$slots['after-heading']" class="ml-6">
        <slot name="after-heading" />
      </div>

      <div v-else-if="icon && title" class="ml-4">
        <div class="card-title font-weight-light" v-text="title" />
      </div>
    </div>

    <slot />

    <template v-if="$slots.actions">
      <v-divider class="mt-2" />

      <v-card-actions class="pb-0">
        <slot name="actions" />
      </v-card-actions>
    </template>
  </v-card>
</template>

<script>
export default {
  name: "MaterialCard",
  props: {
    avatar: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "green",
    },
    icon: {
      type: String,
      default: undefined,
    },
    image: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  computed: {
    classes() {
      return {
        "v-card--material--has-heading": this.hasHeading,
      };
    },
    avatar_size () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 64
        case 'sm': return 64
        case 'md': return 64
        case 'lg': return 128
        case 'xl': return 128
        default: return  128
      }
    },
    avatar_position() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return "top: -35px;"
        case 'sm': return "top: -35px;"
        case 'md': return "top: -35px;"
        case 'lg': return "top: -64px;"
        case 'xl': return "top: -64px;"
        default: return  "top: -64px;"
      }

    },
    hasHeading() {
      return Boolean(this.$slots.heading || this.title || this.icon);
    },
    hasAltHeading() {
      return Boolean(this.$slots.heading || (this.title && this.icon));
    },
  },
};
</script>

<style lang="sass">
.v-card--material
  border: 1px solid white !important
  border-radius: 10px !important
  &__avatar
    position: relative
  &__heading
    position: relative
    top: -40px
    transition: .3s ease
    z-index: 1
    border-radius: 3px
</style>