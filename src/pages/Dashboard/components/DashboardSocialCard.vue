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
          lg3
        >
        <v-card
            class="mt-3 mx-auto"
            max-width="400"
          >

          <v-card-title
              class="pt-1 success dark v-sheet--offset">
            <div class="white--text font-weight-bold">Total</div>
            <v-spacer />
            <v-icon
                large
                color="white">autorenew</v-icon>
          </v-card-title>

          <v-card-text
              class="pt-0">
            <v-spacer />
            <span class="display-1 text-capitalize font-weight-bold mb-2 mr-3">200</span>
            <span class="font-weight-light grey--text mr-1"> 20% </span>
            <v-icon
                small
                color="red">alarm_on</v-icon>
            <span class="font-weight-light grey--text ml-1"> 20% </span>
            <v-icon
                small
                color="success">alarm_off</v-icon>
            <v-divider class="my-2"></v-divider>
            <span class="font-weight-light grey--text"> 20% </span>
          </v-card-text>
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
    items: [1, 2, 3, 4],
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

<style scoped>
  .v-sheet--offset {
    top: -36px;
    left: 10px;
    width: calc(100% - 64px);
    height: 64px;
    position: relative;
  }
</style>
