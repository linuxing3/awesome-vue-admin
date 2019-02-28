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
      <slot name="export" :modelName="modelName" :items="items"></slot>
      <slot name="import" :modelName="modelName"></slot>
      <v-dialog
          v-model="dialog"
          max-width="80%">
        <v-btn
            slot="activator"
            class="offset-mt-5"
            fab
            large
            absolute
            right
            top
            color="red darken-1"
          >
          <v-icon dark>
            add
          </v-icon>
        </v-btn>
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
                class="editing ? 'primary' : 'warn'"
                flat
                @click="saveItem(editedItem)">{{ editing ? '编辑': '新增'}}</v-btn>
            <slot name="export" :modelName="modelName" :items="[ editedItem ]"></slot>
            <v-btn
                flat
                @click="close">取消</v-btn>
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
          <th>actions</th>
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
          <td class="layout row justify-center align-item-center">
            <v-icon
                color="green"
                @click="editItem(props.item)"
              >
              edit
            </v-icon>
            <v-icon
                color="red"
                @click="deleteItem(props.item)"
              >
              delete
            </v-icon>
          </td>
          <td
              v-for="field in headers"
              :key="field.value"
            >{{ props.item[field.value] }}</td>
        </tr>
      </template>
      <template slot="no-data">
        <v-btn
            color="primary"
            @click="reset">重置</v-btn>
      </template>
      <template slot="footer">
        <td :colspan="headers.length">
          Total {{ count }}
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
    selected: []
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '新增' : '编辑'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    modelName (val) {
      this.reset()
      // refetch data for current model
      this.fetch()
    }
  },

  created () {

    this.$on('SET_MODEL', (name) => {
      this.modelName = name
    })
    window.CrudTable = this
  },

  methods: {

    editItem (item) {
      this.setEditedItem(item)
      this.dialog = true
    },

    removeItem (item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.reset()
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        // Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        // this.items.push(this.editedItem)
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

    entityChanged (entityName) {
      this.modelName = entityName
      this.$forceUpdate()
    }
  }
}
</script>
