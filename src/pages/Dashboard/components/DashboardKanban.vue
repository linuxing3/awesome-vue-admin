<template>
  <v-container
      fluid
      grid-list-xl
    >
    <v-text-field
        label="标题"
        placeholder="输入项目清单..."
        @keyup.enter="createKanban"
        v-model="editedItem['title']">
    </v-text-field>
    <v-layout
        row
        wrap
      >
      <v-flex
          v-for="(kanban, index) in items"
          :key="index"
          xs12
          md4
          sm4
          lg4
        >
        <v-card
            class="mt-1 mx-auto"
          >
          <v-card-title
              class="pt-1">
            <span class="headline text-capitalize primary--text font-weight-bold mb-0">{{kanban.title}}</span>
          </v-card-title>
          <v-card-text class="pt-0">
            <DashboardProject />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { pickBy, mapKeys, camelCase } from 'lodash'
import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'

import models from '@/models'
import DashboardProject from './DashboardProject'

export default {
  components: {
    DashboardProject
  },
  mixins: [crudMixin, exportMixin],
  data: () => ({
    modelName: 'projectBoard'
  }),
  methods: {
    createKanban () {
      this.editedItem['name'] = camelCase(this.editedItem['title'])
      this.saveItem(this.editedItem)
    }
  }
}
</script>

<style scoped>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>
