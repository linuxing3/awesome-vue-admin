<template>
  <v-card id="create">
    <v-speed-dial
        v-model="fab"
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        :direction="direction"
        :open-on-hover="hover"
        :transition="transition"
      >
      <v-btn
          slot="activator"
          v-model="fab"
          color="blue darken-2"
          dark
          fab
        >
        <v-icon>star</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn
          fab
          dark
          small
          color="green"
        >
        <v-icon>cloud</v-icon>
      </v-btn>
      <v-btn
          fab
          dark
          small
          color="indigo"
        >
        <v-icon>add</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    direction: 'bottom',
    fab: false,
    fling: true,
    hover: true,
    tabs: null,
    top: false,
    right: true,
    bottom: false,
    left: false,
    transition: 'slide-y-reverse-transition'
  }),

  computed: {
    activeFab () {
      switch (this.tabs) {
        case 'one': return { 'class': 'purple', icon: 'account_circle' }
        case 'two': return { 'class': 'red', icon: 'edit' }
        case 'three': return { 'class': 'green', icon: 'keyboard_arrow_up' }
        default: return {}
      }
    }
  }
}
</script>

<style>
  /* This is for documentation purposes and will not be needed in your application */
  #create .v-speed-dial {
    padding-top: '-100px';
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
</style>
