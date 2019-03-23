<template>
  <v-btn color="red">
    <v-icon>favorite</v-icon>
    {{love}}
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import { VBtn, VIcon } from 'vuetify/lib' // <-- add this

export default Vue.extend({
  components: { VBtn, VIcon }, // <-- and this
  props: ['love']
})
</script>
