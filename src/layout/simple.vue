<template>
  <v-app>
    <v-content>
      <v-container
          fluid
          fill-height>
        <v-layout
            align-center
            justify-center>
          <v-flex
              xs12
              sm8
              md6>
              <slot />
          </v-flex>
        </v-layout>
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
<style scoped>
</style>
