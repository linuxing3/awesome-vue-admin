<template>
  <div id="pageCard">
    <v-container
        grid-list-xl
        fluid>
      <v-layout
          wrap
          row>
        <v-flex
            xs12
            md4
            sm4
            class="mt-2 ml-5">
          <h1 class="primary--text font-weight-bold">
            {{ modelName  }}
          </h1>
          <v-spacer />
          <v-text-field
              class="mt-2 ml-2"
              label="Search"
              prepend-icon="search"
              v-model="filter.search" />
        </v-flex>
        <v-flex
            class="pr-5 pl-5"
            xs12
            md12
            sm12>
          <DatabaseChips
              :search="filter.search"
              :items="filteredItems"
            >
          </DatabaseChips>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="js">
import models from '@/models'

import DatabasesIterator from './DatabasesIterator.vue'
import DatabaseChips from './DatabaseChips.vue'

export default {
  components: {
    DatabasesIterator,
    DatabaseChips
  },
  data () {
    return {
      modelName: 'user',
      filter: {
        search: '',
        sort: ''
      }
    }
  },
  computed: {
    filteredItems () {
      let { search } = this.filter
      return this.entities.filter((entity) => {
        let match = String(entity).toLowerCase()
        return match.indexOf(search) > -1
      })
    }
  },
  created () {
    this.$on('SELECT_MODEL', modelName => {
      // go to crud component
      this.crud({ blueprint: modelName })
    })
    window.databaseManager = this
  },
  methods: {
    async exportEntities () {
      // 导出csv文件
      this.exportItem(this.entities)
    },
    resetEntities () {
      // 删除数据
      this.resetData(this.entities)
    }
  }
}
</script>
