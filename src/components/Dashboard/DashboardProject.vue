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
          xs12
          md4
          sm4
          lg4
          @click="crud({ blueprint: 'project'})"
        >
        <v-card
            class="mt-1 mx-auto"
          >
          <v-card-text
              class="pt-3">

            <div class="display-1 text-capitalize primary--text font-weight-bold mb-2">进行中项目</div>

            <v-divider class="my-2"></v-divider>

            <v-data-iterator
                :items="items"
                :pagination.sync="pagination"
                hide-actions
                row
                wrap
              >
              <v-flex
                  slot="item"
                  slot-scope="props"
                  xs12
                  sm12
                  md12
                  lg12
                >
                <v-card>
                  <v-card-title class="subheading font-weight-bold">{{ props.item.status }}</v-card-title>
                </v-card>
              </v-flex>
            </v-data-iterator>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { pickBy, mapKeys } from 'lodash'
import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'

import models from '@/models'

export default {
  mixins: [crudMixin, exportMixin],
  data: () => ({
    modelName: 'project',
    pagination: {
      sortBy: '_id',
      rowsPerPage: 25,
      descending: true
    },
    selected: []
  })
}
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>
