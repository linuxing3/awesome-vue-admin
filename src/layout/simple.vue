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
import AppToolbar from '@/components/App/AppToolbar.vue'
import AppDrawer from '@/components/App/AppDrawer.vue'

export default {
  components: {
    AppToolbar,
    AppDrawer
  }
}
</script>
