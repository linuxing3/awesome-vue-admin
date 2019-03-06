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
      v-for="(section, index) in sections"
      :key="index"
      xs12
      md3
      sm3
      lg2
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
          <div class="title font-weight-light mb-2">{{section}}</div>
          <div class="subheading font-weight-light grey--text">{{countSectionModels(section)}}</div>
          <v-divider class="my-2"></v-divider>
          <v-icon
              class="mr-2"
              small
            >
            clock
          </v-icon>
          <span class="caption grey--text font-weight-light">note</span>
        </v-card-text>
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { pickBy, mapKeys } from 'lodash'
import { sections } from '@/api/globals'
import models from '@/models'

export default {
  data: () => ({
    sections,
    items: {},
    currentSection: '',
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
  methods: {
    countSectionModels (section) {
      let items = pickBy(models, model => {
        return model.meta.section === section
      })
      let count = Object.keys(items).length
      return count
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
