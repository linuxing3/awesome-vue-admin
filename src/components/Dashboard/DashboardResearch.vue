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
          v-for="(item, index) in bookmarks"
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
              class="pt-1">
            <div class="grey--text font-weight-thin">{{item.title}}</div>
          </v-card-title>

          <v-card-text
              class="pt-0">
            <div>
              <v-html>{{item.url}}</v-html>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { pickBy, mapKeys } from 'lodash'
import models from '@/models'
import { gradients, bookmarks } from '@/api/globals'
import { BrowserWindow } from 'electron'

export default {
  data: () => ({
    fill: true,
    gradient: gradients[1],
    gradients,
    bookmarks,
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
  mounted () {
    // let win = new BrowserWindow()
    // win.webContents.openUrl(url)
  }
}
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>
