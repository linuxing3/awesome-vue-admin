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
                :fill="fill"
                :gradient="gradient"
                :smooth="radius || false"
                :labels="['first', 'total']"
                :value="[ 0, item.count() ]"
                color="white"
                line-width="2"
                :padding="padding"
              ></v-sparkline>
          </v-sheet>

          <v-card-text
              @click="crud({ blueprint: item.entity })"
              class="pt-0">
            <div class="title text-capitalize font-weight-bold mb-2">{{item.entity}}</div>
            <span class="font-weight-light grey--text">Total Records: </span>
            <v-spacer />
            <span class="display-1 font-weight-bold grey--text">{{item.count()}}</span>
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

const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea']
]

export default {
  data: () => ({
    fill: true,
    gradient: gradients[1],
    gradients,
    padding: 8,
    radius: 10,
    items: models,
    labels: [
      'first',
      'last'
    ],
    value: [
      0,
      10
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
