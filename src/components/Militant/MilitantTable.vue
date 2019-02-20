<script>
import Militant from '@/models/Militant'
import MilitantForm from './MilitantForm'
import exportMixin from '@/mixins/exportMixin'
import crudMixin from '@/mixins/crudMixin'
export default {
  components: {
    MilitantForm
  },
  data () {
    return {
      editing: false,
      modelName: 'militant'
    }
  },
  computed: {
    headers () {
      return this.Model.nonRelationFields()
    }
  },
  mixins: [exportMixin, crudMixin],
  created () {
    window.MilitantTable = this
  },
  methods: {
    deleteItem (item) {
      Militant.delete(item._id)
    },
    editItem (item) {
      window.MilitantForm.$emit('SET_EDITING', item)
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
      <MilitantForm></MilitantForm>
    </v-responsive>
  </v-card>
</template>

<style lang="scss" module>
</style>
