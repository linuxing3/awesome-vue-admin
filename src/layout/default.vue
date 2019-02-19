<template>
  <v-app>
    <AppToolbar></AppToolbar>
    <v-content>
      <v-container>
        <slot></slot>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import AppToolbar from '@/components/app/app-toolbar.vue'

export default {
  components: {
    AppToolbar
  }
}
</script>
