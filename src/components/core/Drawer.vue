<template>
  <v-navigation-drawer
    v-model="show"
    app
    hide-overlay
    dark
    src="https://graphiste.com/blog/wp-content/uploads/2016/08/barbier-5.jpg"
  >
    <template v-slot:img="props">
      <v-img
        v-bind="props"
        gradient="to top, rgba(0, 0, 0, .75), rgba(0, 0, 0, .90)"
      ></v-img>
    </template>
    <v-list nav dense id="drawer-header">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <p class="headline font-weight-bold mt-4">
              {{getShopInfos.name}}
            </p>
            <p class="overline font-weight-thin mb-n4">
              {{getShopInfos.address}}
            </p>
            <p class="overline font-weight-thin">
              {{getShopInfos.zipcode}} {{getShopInfos.city}}
            </p>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider class="mb-2" />
    <v-list flat class="mt-6">
      <v-list-item-group v-model="model" color="green">
        <v-list-item
          v-for="(link, i) in links"
          :key="i"
          routeur
          :to="link.to"
          :id="link.id"
        >
          <v-list-item-icon>
            <v-icon v-text="link.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content style="text-align: left">
            <v-list-item-title
              v-text="$translate.getTranslation(link.text)"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-btn @click.stop="processSignOut()" class="mt-16" text color="red">
        <div class="d-flex justify-center align-center" style="height: 100%">
          <v-icon>mdi-exit-to-app</v-icon>
          {{ $translate.getTranslation("Sign Out") }}
        </div>
      </v-btn>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CoreDrawer",
  props: {
    value: Boolean,
  },
  data() {
    return {
      drawer: false,
      links: [
        {
          icon: "mdi-view-dashboard",
          text: "Dashboard",
          to: "/dashboard",
          id: "drawer-dashboard",
        },
        {
          icon: "mdi-text",
          text: "Generate Receipt",
          to: "/GenerateTicket",
          id: "drawer-generate",
        },
        {
          icon: "mdi-notebook-multiple",
          text: "Product Register",
          to: "/RegisterProduct",
          id: "drawer-register",
        },
        {
          icon: "mdi-cash",
          text: "Last Sales",
          to: "/ReceiptList",
          id: "drawer-last-sales",
        },
        {
          icon: "mdi-account",
          text: "Profile",
          to: "/profile",
          id: "drawer-profile",
        },
        {
          icon: "mdi-undo",
          text: "Return Product",
          to: "/ProductReturn",
          id: "drawer-return",
        },
      ],
      model: 0,
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    ...mapGetters("defaultStore", ["getShopInfos"])
  },
  methods: {
    ...mapActions("defaultStore", ["userLogout"]),

    processSignOut() {
      this.userLogout();
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.v-navigation-drawer__border {
  width: 1.5px !important;
  background-color: rgba(255, 255, 255, 0.12) !important;
}
</style>
