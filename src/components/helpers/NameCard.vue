<template>
  <v-card class="mt-3">
    <v-sheet
        class="v-sheet--offset mx-auto"
        :color="$vuetify.theme.primary"
        elevation="12"
        max-width="calc(100% - 32px)"
      >
      <v-img
          :src="imgPath"
          height="60px"
        />
    </v-sheet>
    <v-container
        fill-height
        fluid
        pa-2
      >
      <v-layout fill-height>
        <v-flex
            xs12
            align-end
            flexbox>
          <span
              class="headline primary--text"
              v-text="title"></span>
        </v-flex>
      </v-layout>
    </v-container>

    <v-card-actions>
      <span
          class="grey--text"
          v-text="subSection"></span>
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
