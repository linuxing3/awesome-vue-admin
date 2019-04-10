<template>
  <v-card class="elevation-0">
    <v-card-text
        class="pt-1">
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
            <v-card-title class="subheading font-weight-bold">{{ props.item.title }}</v-card-title>
            <v-divider />
            <v-card-actions>
              <v-btn icon>
                <v-icon color="success">start</v-icon>
              </v-btn>
              {{ props.item.status }}
              <v-spacer />
              <v-avatar
                  size="24px"
                  color="grey lighten-4"
                >
                <v-img
                    alt='avatar'
                    :src="props.item.participants[1]['avatar'] || 'avatar/a1.jpg'">
                </v-img>
              </v-avatar>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-data-iterator>

    </v-card-text>
    <v-card-actions>
      <v-btn
          flat
          @click="crud({ blueprint: 'project'})"
        >
        Add a Card
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { pickBy, mapKeys } from 'lodash'
import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'

import models from '@/models'

export default {
  props: [ 'kanban' ],
  mixins: [crudMixin, exportMixin],
  watch: {
    kanban: {
      handler (value) {
        this.filter.search = value
      },
      immediate: true
    }
  },
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
