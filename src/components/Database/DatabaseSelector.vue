<template>
  <v-layout
      row
      wrap>
    <v-flex
        xs7
        offset-xs1>
      <v-select
          @change="updateDataPath"
          label="选择数据模板"
          :items="dataFiles"
          v-model="dataPath">
      </v-select>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from 'vue'
import { get, sync, call } from 'vuex-pathify'
import { remote, shell } from 'electron'

import path from 'path'

import { log, getFilesByExtentionInDir } from '@/util'
import fs from 'fs'

export default {
  props: {
    dataFiles: {
      type: Array
    }
  },
  methods: {
    ...call('database/*'),
    updateDataPath() {
      this.$store.set('database/export@dataPath', this.dataPath)
    }
  },
  computed: {
    dataPath: sync('database/export@dataPath')
  }
}
</script>
