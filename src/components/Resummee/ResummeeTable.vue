<script>
import Resummee from '@/models/Resummee'
import ResummeeForm from './ResummeeForm'

import exportMixin from '@/mixins/exportMixin'
import crudMixin from '@/mixins/crudMixin'

export default {
  components: {
    ResummeeForm
  },
  data () {
    return {
      editing: false,
      modelName: 'resummee'
    }
  },
  mixins: [exportMixin, crudMixin],
  computed: {
    headers () {
      return this.Model.nonRelationFields()
    }
  },
  created () {
    window.ResummeeTable = this
  },
  methods: {
    editItem (item) {
      this.$emit('SET_EDITING', item)
      window.ResummeeForm.$emit('SET_EDITING', item)
    }
  }
}
</script>

<template>
  <v-card>
    <v-responsive>
      <v-data-table
          :headers="headers"
          :items="all"
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
              {{ $t !== undefined ? $t(header) : header }}
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
            <v-btn
                icon
                class="mx-0"
                @click="exportItem(props.item)">
              <v-icon color="pink">fas fa-print</v-icon>
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
    <v-responsive>
      <ResummeeForm></ResummeeForm>
    </v-responsive>
  </v-card>
</template>

<style lang="scss" module>
</style>
