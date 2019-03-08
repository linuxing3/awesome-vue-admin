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
          class="title white--text font-weight-light">{{title.toUpperCase()}}</span>
      </v-sheet>
    </v-sheet>

    <v-card-actions>
      <span
          class="grey--text">选择功能板块</span>
      <v-spacer></v-spacer>
      <v-btn
          @click="crud(item)"
          icon>
        <v-icon :color="color">edit</v-icon>
      </v-btn>
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