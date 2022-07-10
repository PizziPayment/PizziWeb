<template>
  <v-card color="transparent" elevation="0">
    <v-card class="pa-2 rounded">
      <v-row>
        <v-col cols="4" class="month-card flex-column my-1">
          <calendar-sidebar :date="date" @change-picker-date="onClickChild" />
        </v-col>
        <v-col cols="8">
          <v-date-picker
            v-model="date"
            no-title
            :events="datesArray"
            locale="fr"
            full-width
            first-day-of-week="0"
            :weekday-format="getDay"
            event-color="primary"
            @change="getDayEvents(date)"
            :picker-date.sync="pickerDate"
          ></v-date-picker>
          <calendar-events
            :eventsArray="eventsArray"
            :date="date"
            class="event-card"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
export default {
  components: {
    CalendarSidebar: () =>
      import("@/components/widgets/Calendar/CalendarSidebar.vue"),
    CalendarEvents: () =>
      import("@/components/widgets/Calendar/CalendarEvents.vue"),
  },
  data: () => ({
    datesArray: [],
    eventsArray: [],
    eventsObjects: [
      {
        date: "2022-02-09",
        event: "Société XXXXX : Evenement 1",
      },
      {
        date: "2022-02-09",
        event: "Société XXXXX : Evenement 2",
      },
      {
        date: "2022-02-09",
        event: "Société XXXXX : Evenement 3",
      },
      {
        date: "2022-02-09",
        event: "Société XXXXX : Evenement 4",
      },
      {
        date: "2022-02-09",
        event: "Société YYYYYY : Evenement 5",
      },
      {
        date: "2022-02-11",
        event: "Société XXXXX : dépôt des comptes à effectuer",
      },
      {
        date: "2022-02-15",
        event: "Société XXXXX : dépôt des comptes à effectuer",
      },
      {
        date: "2022-02-17",
        event: "Société XXXXX : dépôt des comptes à effectuer",
      },
      {
        date: "2022-02-26",
        event: "Société XXXXX : dépôt des comptes à effectuer",
      },
      {
        date: "2022-02-27",
        event: "Société XXXXX : dépôt des comptes à effectuer",
      },
    ],
    daysOfWeek: ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"],
    pickerDate: "",
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  }),
  mounted() {
    this.datesArray = this.eventsObjects.map((value) => value.date);
  },
  methods: {
    onClickChild(value) {
      this.pickerDate = value;
    },
    getDay(date) {
      var i = new Date(date).getDay(date);
      return this.daysOfWeek[i];
    },
    getDayEvents(date) {
      var dayEventsArray = this.eventsObjects.filter(
        (obj) => obj.date === date
      );
      this.eventsArray = dayEventsArray.map((value) => value.event);
    },
  },
};
</script>
<style lang="scss">
.month-badge .v-badge__badge {
  height: 15px !important;
  min-width: 15px !important;
  font-size: 10px !important;
}
.month-card {
  border-right: 1px solid rgba(128, 128, 128, 0.2) !important;
}
.event-card {
  border-top: 1px solid rgba(128, 128, 128, 0.2) !important;
}
.v-date-picker-header {
  display: none !important;
}
.v-date-picker-table {
  min-height: 300px !important;
}
.v-date-picker-table table {
  height: 100% !important;
}
.v-btn--active .v-date-picker-table__events {
  display: none !important;
}
.no-uppercase {
  text-transform: unset !important;
}
.v-card .v-card--link::before {
  background: none;
}
</style>
