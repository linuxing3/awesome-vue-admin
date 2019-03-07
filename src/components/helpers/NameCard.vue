<template>
  <v-card>
    <v-img
        :src="imgPath"
        height="120px"
      >
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
                class="headline white--text"
                v-text="title"></span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>

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
