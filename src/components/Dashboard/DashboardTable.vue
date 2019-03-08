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
          v-for="(item, index) in items"
          :key="index"
          xs12
          md3
          sm3
          lg4
        >
        <v-card
            class="mt-3 mx-auto"
            max-width="400"
          >
          <v-sheet
              class="v-sheet--offset mx-auto"
              :color="$vuetify.theme.primary"
              elevation="12"
              max-width="calc(100% - 32px)"
            >
            <v-sparkline
                :labels="labels"
                :value="value"
                color="white"
                line-width="2"
                padding="16"
              ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">{{item.entity.toUpperCase()}}</div>
            <div class="subheading font-weight-light grey--text">Total Records: {{item.count()}}</div>
            <v-divider class="my-2"></v-divider>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-icon
                class="mr-2"
                small
              >
              star
            </v-icon>
            <span class="caption grey--text font-weight-light">Belongs To Section: {{item.meta.section}}</span>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { pickBy, mapKeys } from 'lodash'
import models from '@/models'

export default {
  data: () => ({
    items: models,
    labels: [
      'a',
      'b',
      'c',
      'd'
    ],
    value: [
      200,
      675,
      410,
      390
    ]
  }),
  methods: {}
}
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>
