<script>
import Document from '@/models/Document'

import exportMixin from '@/mixins/exportMixin'
import crudMixin from '@/mixins/crudMixin'

export default {
  data () {
    return {
      modelName: 'document'
    }
  },
  mixins: [exportMixin, crudMixin],
  created () {
    window.DocumentTable = this
  },
  methods: {
    editItem (item) {
      this.$emit('SET_EDITING', item)
      window.DocumentForm.$emit('SET_EDITING', item)
    }
  }
}
</script>

<template>
  <v-card>
    <v-card-title v-show='true'>
      <v-spacer></v-spacer>
      <v-text-field
          v-model='filter.search'
          append-icon='search'
          label="查询姓名，注意区分大小写"
          single-line
        ></v-text-field>
    </v-card-title>
    <v-responsive>
      <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-0"
        >
        <template
            slot="headers"
            slot-scope="props">
          <tr>
            <th
                class="text-xs-left"
                key="action">
              {{ $t('action') }}
            </th>
            <th
                v-for="header in props.headers"
                class="text-xs-left"
                :key="header">
              {{ tryT(header) }}
            </th>
          </tr>
        </template>
        <template
            slot="items"
            slot-scope="props">
          <td class="justify-center layout px-0">
            <v-btn
                icon
                class="mx-0"
                @click="editItem(props.item)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn
                icon
                class="mx-0"
                @click="deleteItem(props.item)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </td>
          <td
              class="text-xs-left"
              :key="header"
              :autocomplete="props.item[header]"
              v-for="header in headers">
            {{ props.item[header] }}
          </td>
        </template>
      </v-data-table>
    </v-responsive>
  </v-card>
</template>
<style scoped>
</style>
