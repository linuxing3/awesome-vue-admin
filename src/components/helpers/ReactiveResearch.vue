<template>
  <v-card>
    <v-card-title>
      <label for="search">
        <h3>智能小Q，帮你调研</h3>
      </label>
      <v-spacer />
      <input
          type="text"
          id="search"
          placeholder="输入任何关键字，试试看"
          class="input-field">
    </v-card-title>
    <v-card-text>
      <v-data-iterator
          :items="news"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          row
          wrap
        >
        <v-list
            slot="item"
            slot-scope="props"
          >
          <v-flex
              xs12
              sm12
              md12
              lg12
            >
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>
                  <a
                      :href="props.item.url"
                      target="_blank">{{ props.item.title }}</a>
                </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon
                    @click="addToBookmark(props.item)"
                  >add</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
          </v-flex>
        </v-list>
      </v-data-iterator>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import axios, { AxiosResponse } from 'axios'
import { Component, Vue } from 'vue-property-decorator'

import { from, Observable, SchedulerLike } from 'rxjs'
import { debounceTime, map, pluck, switchMap } from 'rxjs/operators'

import models from '@/models'
import { searchEngine } from '@/api/globals'

interface HackerNewsResult {
  objectID: string
  title?: string
  url?: string
}

interface wikipediaSearchResult {
  title?: string
  url?: string
  description?: string
}

interface HackerNewsSearchResponse {
  hits: Array<HackerNewsResult>
}

interface HandleObservableOptions {
  time?: number
  scheduler?: SchedulerLike
}

interface AjaxOptions {
  endPoint?: string
  formatFunc?: Function
}

const researchNewsEndpoint: string = searchEngine[0]['endPoint']

const researchWikipediaEndpoint: string = searchEngine[1]['endPoint']

/**
 * 开始调研
 */

export const researchGeneric = function (
  observable: Observable<Event>,
  ajaxOptions: AjaxOptions = {},
  options: HandleObservableOptions = {}
): Observable<Array<HackerNewsResult>> {
  const { time = 300, scheduler } = options

  const { endPoint, formatFunc } = ajaxOptions

  return observable.pipe(
    // 节流
    debounceTime(time, scheduler),
    // 摘取输入框内容
    pluck<Event, string>('target', 'value'),
    // 遍历
    switchMap(value => from(axios.get(`${endPoint}${value}`))),
    // 摘取data和hits
    pluck('data', 'hits'),
    // 去除无效数据
    map(results => formatFunc(results))
  )
}

export const researchHackerNews = function (
  observable: Observable<Event>,
  options: HandleObservableOptions = {}
): Observable<Array<HackerNewsResult>> {
  const { time = 300, scheduler } = options
  return observable.pipe(
    // 节流
    debounceTime(time, scheduler),
    // 摘取输入框内容
    pluck<Event, string>('target', 'value'),
    // 遍历
    switchMap(value => from(axios.get<HackerNewsSearchResponse>(`${researchNewsEndpoint}${value}`))),
    // 摘取data和hits
    pluck<AxiosResponse, Array<HackerNewsResult>>('data', 'hits'),
    // 去除无效数据
    map((results: Array<HackerNewsResult>) =>
      results.filter((news: HackerNewsResult) => Boolean(news.title && news.url))
    )
  )
}

export const researchWikipedia = function (
  observable: Observable<Event>,
  options: HandleObservableOptions = {}
): Observable<Array<any>> {
  const { time = 300, scheduler } = options
  return observable.pipe(
    // 节流
    debounceTime(time, scheduler),
    // 摘取输入框内容
    pluck('target', 'value'),
    // 遍历
    switchMap(value => from(axios.get(`${researchWikipediaEndpoint}${value}`))),
    pluck('data'),
    // 选择result的第二个元素，为真是数据
    map((results) => results[1].map((title, i) => ({
      title: title,
      description: results[2][i],
      url: results[3][i]
    }))
    )
  )
}

@Component<ReactiveResearch>({
  name: 'reactive-research',
  subscriptions (this: Vue) {
    return {
      news: researchWikipedia(this.$fromDOMEvent('input', 'keyup'))
    }
  }
})
export default class ReactiveResearch extends Vue {
  news: Array<any> = []
  searchEngine: Array<any> = searchEngine
  rowsPerPageItems = [ 25, 50, 100 ]
  pagination = {
    rowsPerPage: 50
  }

  async addToBookmark (item) {
    console.log(item)
    let BookMark = models['bookmark']
    let newBookmarks = await BookMark.$create({ data: item })
    console.log(newBookmarks)
  }

  openLinkInNewWindow (item) {
    window.open(item.url, '_blank', 'nodeIntegration=yes')
  }
}
</script>

<style scoped>
.input-field {
  width: 50%;
  height: 60px;
  font-size: 25px;
  border-color: "red" ;
  border-style: "solid";
  border-width: "3px";
}
</style>
