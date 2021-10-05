<template>
  <v-dialog v-model="show" persistent max-width="500">
    <div class="d-flex flex-column" style="background-color: #3a474e;">
      <h3 class="white--text py-6">
        Select widgets you want to work with
      </h3>
      <v-divider dark/>
      <v-list color="#3a474e" class="pt-4 px-4">
        <v-list-item-group v-model="selected" multiple>
          <template v-for="(widget, index) in widgets">
            <v-list-item :key="widget.text">
              <template v-slot:default="{ active }">
                <v-list-item-icon>
                  <v-icon v-text="widget.icon" color="white" large></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="widget.text" class="white--text"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon v-if="active" color="green"> mdi-check-outline </v-icon>
                </v-list-item-action>
              </template>
            </v-list-item>
            <v-divider
            v-if="index < widgets.length"
            :key="index"
            dark
          ></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
      <v-row class="mt-6 mb-2">
        <v-col class="pa-6">
          <v-btn color="white" @click="save">Save</v-btn>
        </v-col>
        <v-col class="pa-6">
          <v-btn color="red" @click.stop="quit" >Quit</v-btn>
        </v-col>
      </v-row>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      selected : [],
      selectedSave: [],
      widgets : [
        { icon: 'mdi-chart-bar', text: 'Graphs' },
        { icon: 'mdi-book-open-blank-variant', text: 'Sells'},
        { icon: 'mdi-undo', text: 'Returns'},
        { icon: 'mdi-cash-multiple', text: 'Cash Payment'},
      ]
    }
  },
  computed: {
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    save () {
      this.selectedSave = [...this.selected]
      this.show = false

    },
    quit () {
      this.show = false
      this.selected = [...this.selectedSave]
    }
  }
}
</script>

<style>
</style>