<template>
  <v-container
      fluid
      grid-list-xl
    >
    <v-layout
        row
        wrap
      >
      <v-flex
          xs12
          md6
          sm6
          lg6
        >
        <v-card>
          <v-card-text
              class="pt-3">
            <div class="display-1 text-capitalize primary--text font-weight-bold mb-2">Polar Chart</div>
            <v-divider class="my-2"></v-divider>
            <v-chart :options="polar" />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex
          xs12
          md6
          sm6
          lg6
        >
        <v-card>
          <v-card-text
              class="pt-3">
            <div class="display-1 text-capitalize primary--text font-weight-bold mb-2">Pie Chart</div>
            <v-divider class="my-2"></v-divider>
            <v-chart :options="pie" />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex
          xs12
          md6
          sm6
          lg6
        >
        <v-card>
          <v-card-text
              class="pt-3">
            <div class="display-1 text-capitalize primary--text font-weight-bold mb-2">Bar Chart</div>
            <v-divider class="my-2"></v-divider>
            <v-chart :options="bar" />
          </v-card-text>
        </v-card>
      </v-flex>
      
    </v-layout>
  </v-container>
</template>

<script>
import models from '@/models'
import { getBarOption, getPolarOption, getPieOption } from '@/util/charts'

import { publicAssets } from '@/api/globals'

export default {
  data() {
    let polar = getPolarOption()
    let bar = getBarOption()
    let pie = getPieOption()
    let { backgrounds, avatars, nature } = publicAssets

    return {
      backgrounds,
      avatars,
      nature,
      bar,
      pie,
      polar
    }
  }
}
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>
