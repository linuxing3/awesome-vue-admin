<template>
  <div>
  <v-container
      id="dropdown-example"
      grid-list-xl>
    <v-layout
        row
        wrap>
      <v-flex
          xs12
          sm4>
        <v-overflow-btn
            :items="entities"
            item-value="entityName"
            v-model="modelName"
            label="Entities"
            target="#dropdown-example"
          ></v-overflow-btn>
      </v-flex>
    </v-layout>
  </v-container>
    <v-toolbar
        flat
        color="white">
      <v-toolbar-title class="heading">{{modelName}} 表格</v-toolbar-title>
      <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog
          v-model="dialog"
          max-width="80%">
        <v-btn
            slot="activator"
            color="primary"
            dark
            class="mb-2">New Item</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex
                    v-for="field in headers"
                    :key="field.value"
                    xs12
                    sm6
                    md4>
                  <v-text-field
                      v-model="editedItem[field.value]"
                      :label="field.value"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                flat
                @click="close">Cancel</v-btn>
            <v-btn
                color="blue darken-1"
                flat
                @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-data-table
        v-model="selected"
        :headers="headers"
        :items="items"
        :pagination.sync="pagination"
        select-all
        item-key="name"
        class="elevation-1"
      >
      <template
          slot="headerCell"
          slot-scope="props">
        <v-tooltip bottom>
          <span slot="activator">
            {{ props.header.text }}
          </span>
          <span>
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template>
      <template
          slot="headers"
          slot-scope="props">
        <tr>
          <th>
            <v-checkbox
                :input-value="props.all"
                :indeterminate="props.indeterminate"
                primary
                hide-details
                @click.stop="toggleAll"
              ></v-checkbox>
          </th>
          <th
              v-for="header in props.headers"
              :key="header.text"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header.value)"
            >
            <v-icon small>arrow_upward</v-icon>
            {{ $t(header.text) }}
          </th>
        </tr>
      </template>
      <template
          slot="items"
          slot-scope="props">
        <tr
            :active="props.selected"
            @click="props.selected = !props.selected">
          <td>
            <v-checkbox
                :input-value="props.selected"
                primary
                hide-details
              ></v-checkbox>
          </td>
          <td
              v-for="field in headers"
              :key="field.value"
              >{{ props.item[field.value] }}</td>
          <td class="justify-center layout px-0">
            <v-icon
                small
                class="mr-2"
                @click="editItem(props.item)"
              >
              edit
            </v-icon>
            <v-icon
                small
                @click="deleteItem(props.item)"
              >
              delete
            </v-icon>
          </td>
        </tr>
      </template>
      <template slot="no-data">
        <v-btn
            color="primary"
            @click="initialize">Reset</v-btn>
      </template>
      <template slot="footer">
        <td :colspan="headers.length">
          <slot name="dialog"></slot>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { pick, map } from 'lodash/fp'
import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'

export default {
  mixins: [crudMixin, exportMixin],
  data: () => ({
    modelName: 'user',
    dialog: false,
    pagination: {
      sortBy: 'name'
    },
    selected: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    modelName (val) {
      // refetch data for current model
      this.fetch()
      // force update
      this.$forceUpdate()
    }
  },

  created () {
    this.$on('SET_MODEL', (name) => this.modelName = name)
    window.CrudTable = this
  },

  methods: {
    initializeMock () {
      this.items = [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7
        }
      ]
    },

    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    },

    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.items.slice()
    },

    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },

    handleChange (entityName) {
      this.modelName = entityName
      this.$forceUpdate()
    }
  }
}
</script>
