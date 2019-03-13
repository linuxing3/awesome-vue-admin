<template>
  <v-layout class="justify-center align-center">
    <v-flex
      md4
      sm4
    >
      <v-text-field
          label="search"
          append-icon="search"
          id="search" />
    </v-flex>
    <v-flex>
      <v-data-iterator
        :items="news"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        content-tag="v-layout"
        row
        wrap
      >
      <v-flex
          slot="item"
          slot-scope="props"
          xs12
          sm6
          md4
          lg3
        >
        <v-card>
          <v-card-title><h4>{{ props.item.title }}</h4></v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile :key="item.objectID">
              <v-list-tile-content class="align-end" :href="item.url">{{ props.item.title }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import axios, { AxiosResponse } from 'axios'
import { Component, Vue } from 'vue-property-decorator'

import { from, Observable, SchedulerLike } from 'rxjs'
import { debounceTime, map, pluck, switchMap } from 'rxjs/operators'

interface HackerNewsResult {
  objectID: string
  title?: string
  url?: string
}

interface HackerNewsSearchResponse {
  hits: Array<HackerNewsResult>
}

interface HandleObservableOptions {
  time?: number
  scheduler?: SchedulerLike
}

const hackerNewsEndpoint: string = 'http://hn.algolia.com/api/v1/search?query='

export const handleObservable = function(
  observable: Observable<Event>,
  options: HandleObservableOptions = {}
): Observable<Array<HackerNewsResult>> {
  const { time = 300, scheduler } = options
  return observable.pipe(
    debounceTime(time, scheduler),
    pluck<Event, string>('target', 'value'),
    switchMap(value => from(axios.get<HackerNewsSearchResponse>(`${hackerNewsEndpoint}${value}`))),
    pluck<AxiosResponse, Array<HackerNewsResult>>('data', 'hits'),
    map((results: Array<HackerNewsResult>) =>
      results.filter((news: HackerNewsResult) => Boolean(news.title && news.url))
    )
  )
}

@Component<Search>({
  name: 'rx-search',
  subscriptions(this: Vue) {
    return {
      news: handleObservable(this.$fromDOMEvent('v-text-field#search', 'keyup'))
    }
  }
})
export default class ReactiveSearch extends Vue {
  news: Array<HackerNewsResult> = []
  rowsPerPageItems = [4, 8, 12]
  pagination = {
    rowsPerPage: 4
  }
}
</script>

<style scoped>
.input-field {
  width: 50%;
}
</style>
