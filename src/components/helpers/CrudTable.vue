<template>
  <div>
    <v-container
        id="dropdown-example">
      <v-layout
          class="justify-end"
          row
          wrap>
        <v-flex
            xs12
            md2
            sm2>
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
        color="success">
      <v-toolbar-title class="heading white--text">
        {{modelName}}共有<span class="heading1 red--text">{{ count }}</span>项记录
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="filter.search">
      </v-text-field>
      <!-- slots of buttons -->
      <slot
          name="export"
          :modelName="modelName"
          :items="items"></slot>
      <slot
          name="import"
          :modelName="modelName"></slot>
      </v-btn>
      <!-- end slots -->
      <v-dialog
          v-model="dialog"
          max-width="60%">
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
          <v-card-title
              class="success lighten-1 white--text"
              dark>
            <span class="headline">{{ formTitle }} {{ modelName }}</span>
            <v-spacer />
            <slot
                name="export"
                :modelName="modelName"
                :items="items"></slot>
            <slot
                name="import"
                :modelName="modelName"></slot>
            <v-btn
                fab
                small
                color="red darken-2 white--text"
                @click="writeDocxFile"
                icon>
                <v-icon>file_copy</v-icon>
            </v-btn>
          </v-card-title>
          <!-- activator in slot -->
          <v-card-text>
            <v-container
                fluid
                grid-list-xs>
              <v-layout
                  v-for="field in headers"
                  :key="field.value"
                  row
                  wrap>
                <!-- generate form from schema  -->
                <v-flex
                    v-if="field.schema.type === 'v-textarea'"
                    xs12
                    md8
                    sm8
                    class="ml-5">
                  <v-textarea
                      v-model="editedItem[field.value]"
                      :label=" $t(field.text) || field.text"></v-textarea>
                </v-flex>
                <v-flex
                    v-else-if="field.schema.type === 'v-date-picker'"
                    xs12
                    md4
                    sm4
                    class="ml-5">
                  <slot
                    name="datedialog"
                    :field="field"
                    :editedItem="editedItem"></slot>
                </v-flex>
                <v-flex
                    v-else
                    xs12
                    md4
                    sm4
                    class="ml-5">
                  <v-text-field
                      max-width="300px"
                      v-model="editedItem[field.value]"
                      :label=" $t(field.text) || field.text "></v-text-field>
                </v-flex>
                <!-- end form from schema  -->
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                :class="editing ? 'warning' : 'success'"
                @click="saveItem(editedItem)">{{ editing ? '编辑': '新增'}}</v-btn>
            <v-btn
                class="gray"
                @click="close">取消</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-divider></v-divider>

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
            {{ $t(header.text) || header.text }}
          </th>
        </tr>
      </template>
      <template
          slot="items"
          slot-scope="props">
        <tr
            :active="props.selected">
          <td>
            <v-checkbox
                :input-value="props.selected"
                @click.stop="props.selected = !props.selected"
                primary
                hide-details
              ></v-checkbox>
          </td>
          <td class="layout row justify-center align-center">
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
        <span class="heading">还没有信息，请点击右上角的按钮添加新的记录</span>
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
  components: {},
  mixins: [crudMixin, exportMixin],
  data: () => ({
    modelName: 'user',
    dialog: false,
    pagination: {
      sortBy: 'name'
    },
    selected: [],
    modal: false
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
