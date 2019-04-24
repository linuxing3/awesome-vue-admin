<template>
  <v-card
      class="ma-3">
    <v-sheet
        class="v-sheet--offset mx-auto"
        elevation="12"
        max-width="calc(100% - 64px)"
      >
      <v-sheet
          class="pa-3 justify-center layout"
          :color="$vuetify.theme.primary"
          height="60"
        >
        <span
            class="title text-capitalize white--text font-weight-bold">{{ title }}</span>
      </v-sheet>
    </v-sheet>

    <v-divider />

    <v-card-actions>
      <span
          class="pa-3 grey--text font-weight-light">表名: {{ subSection }}</span>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['imgPath', 'title', 'item', 'color', 'subSection']
}
</script>
<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>
