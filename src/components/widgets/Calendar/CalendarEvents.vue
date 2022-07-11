<template>
  <v-card elevation="0" class="py-0">
    <v-card-title
      class="font-weight-black py-1 mb-3 pl-0 text-capitalize"
      v-text="formatDateToString()"
    ></v-card-title>
    <v-row>
      <v-col cols="8">
        <div v-if="eventsArray.length > 0" class="pl-2">
          <div class="ml-n4" v-for="dayEvent in visibleEvents" :key="dayEvent">
            <v-badge dot inline left color="accent">
              {{ dayEvent }}
            </v-badge>
          </div>
        </div>
        <div v-else>Pas d'evenement a ce jour</div>
      </v-col>
      <v-col cols="4">
        <v-pagination
          v-model="page"
          :length="Math.ceil(eventsArray.length / perPage)"
          total-visible="0"
          circle
        ></v-pagination>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    eventsArray: Array,
    date: String,
  },
  data: () => ({
    page: 1,
    perPage: 2,
  }),
  methods: {
    formatDateToString() {
      return new Date(this.date).toLocaleDateString("fr", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  computed: {
    visibleEvents() {
      return this.eventsArray.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    },
  },
};
</script>

<style lang="scss">
.v-pagination__navigation--disabled {
  opacity: 0.3 !important;
}
</style>
