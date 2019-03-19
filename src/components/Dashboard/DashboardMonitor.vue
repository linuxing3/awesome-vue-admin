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
            <div class="display-1 text-capitalize primary--text font-weight-bold mb-2">财务开支</div>
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
            <div class="display-1 text-capitalize primary--text font-weight-bold mb-2">资源消耗</div>
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
            <div class="display-1 text-capitalize primary--text font-weight-bold mb-2">月度工作量</div>
            <v-divider class="my-2"></v-divider>
            <v-chart :options="bar" />
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
            <div class="display-1 text-capitalize primary--text font-weight-bold mb-2">季度工作量</div>
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
  data () {
    let { backgrounds, avatars, nature } = publicAssets

    return {
      backgrounds,
      avatars,
      nature
    }
  },
  computed: {
    pie () {
      return getPieOption()
    },
    bar () {
      return getBarOption()
    },
    polar () {
      return getPolarOption()
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
