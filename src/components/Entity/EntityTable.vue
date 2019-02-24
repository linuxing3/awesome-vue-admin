<script>
import Entity from '@/models/Entity'
import EntityForm from './EntityForm'
import EntityIterator from './EntityIterator'
import EntityList from './EntityList'

import exportMixin from '@/mixins/exportMixin'
import crudMixin from '@/mixins/crudMixin'

export default {
  components: {
    EntityForm,
    EntityIterator,
    EntityList
  },
  data () {
    return {
      editing: false,
      modelName: 'entity'
    }
  },
  mixins: [crudMixin, exportMixin],
  computed: {
    headers () {
      return this.Model.nonRelationFields()
    }
  },
  created () {
    window.EntityTable = this
  },
  methods: {
    editItem (item) {
      this.$emit('SET_EDITING', item)
      window.EntityForm.$emit('SET_EDITING', item)
    }
  }
}
</script>

<template>
  <v-card>
    <v-card-title v-show='true'>
      <slot name="form-dialog" />
      <!-- 导出多个，将item属性设置为items数组 -->
      <ExportDialog
          buttonText="导出/打印"
          :item="items"
          :modelName="modelName" ></ExportDialog>
      <ImportDialog
          buttonText="导入/整理"
          :modelName="modelName"></ImportDialog>
      <v-spacer></v-spacer>
      <v-text-field
          v-model='filter.search'
          append-icon='search'
          label="模糊查询，不分大小写"
          single-line
        ></v-text-field>
    </v-card-title>
    <v-responsive>
      <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-0">
        <template
            slot="headers"
            slot-scope="props">
          <tr>
            <th
                v-for="header in props.headers"
                class="text-xs-left"
                :key="header"
              >{{ $t !== undefined ? $t(header) : header }}</th>
          </tr>
        </template>
        <template
            slot="items"
            slot-scope="props">
          <td
              class="text-xs-left"
              :key="header"
              :autocomplete="props.item[header]"
              v-for="header in headers"
            >{{ props.item[header] }}</td>
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
            <v-btn
                icon
                class="mx-0"
                @click="exportItem(props.item)">
              <v-icon color="pink">fas fa-print</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-responsive>
    <v-responsive>
      <EntityForm></EntityForm>
    </v-responsive>
  </v-card>
</template>

<style lang="scss" module>
</style>
