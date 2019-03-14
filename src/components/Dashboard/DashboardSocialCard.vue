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

          <v-card-text
              class="pt-0">
            <div class="display-1 text-capitalize font-weight-bold mb-2">{{item}}</div>
            <span class="font-weight-light grey--text">Total Records: </span>
            <v-spacer />
            <span class="display-1 font-weight-bold grey--text">{{item}}</span>
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
    items: [1,2,3,4],
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
