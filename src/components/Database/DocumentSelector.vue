<template>
  <v-select
      class="white--text"
      @change="updateDocPath"
      label="选择Word模板"
      :items="docFiles"
      v-model="docPath">
  </v-select>
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
    docFiles: {
      type: Array
    }
  },
  methods: {
    ...call('database/*'),
    updateDocPath() {
      this.$store.set('database/export@docPath', this.docPath)
      window.getApp.$emit('DOCPATH_CHANGED')
    }
  },
  computed: {
    docPath: sync('database/export@docPath')
  }
}
</script>
