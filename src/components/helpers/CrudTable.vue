<template>
  <div>
    <v-container
        id="entity-dropdown">
    </v-container>
    <v-toolbar
        flat
        color="white">
      <v-overflow-btn
          class="heading mt-3"
          :items="entities"
          item-value="entityName"
          v-model="modelName"
          label="Entities"
          target="#entity-dropdown"
        ></v-overflow-btn>
      <v-spacer></v-spacer>
      <v-text-field
          class="ml-5 mr-5"
          label="Search"
          prepend-icon="search"
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
            <v-btn
                fab
                small
                color="red darken-2 white--text"
                @click="exportDocx"
                icon>
              <v-icon>file_copy</v-icon>
            </v-btn>
            <slot
                name="export"
                :modelName="modelName"
                :items="[ editedItem ]"></slot>
          </v-card-title>
          <!-- activator in slot -->
          <v-card-text>
            <v-container
                fluid
                grid-list-xl>
              <v-layout
                  row
                  wrap>
                <!-- generate form from schema  -->
                <v-flex
                    v-for="field in headers"
                    :key="field.value"
                    xs10
                    md10
                    sm10
                    class="pa-2 pr-2">
                  <v-textarea
                      v-if="field.schema.type === 'v-textarea'"
                      v-model="editedItem[field.value]"
                      :label=" tryT(field.text) || field.text"></v-textarea>
                  <v-select
                      v-if="field.schema.type === 'v-select'"
                      v-model="editedItem[field.value]"
                      :items="field.items"
                      item-text="name"
                      item-value="_id"
                      :label=" tryT(field.text) || field.text"></v-select>
                  <v-dialog
                      v-if="field.schema.type === 'v-date-picker'"
                      :ref="field.value"
                      v-model="modal"
                      :return-value.sync="editedItem[field.value]"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                    <v-text-field
                        slot="activator"
                        v-model="editedItem[field.value]"
                        :label="tryT(field.text) || field.text"
                        append-icon="event"
                        readonly
                      ></v-text-field>
                    <v-date-picker
                        v-model="editedItem[field.value]"
                        scrollable>
                      <v-spacer></v-spacer>
                      <v-btn
                          flat
                          @click="modal = false">Cancel</v-btn>
                      <v-btn
                          flat
                          color="primary"
                          @click="saveDate(field, editedItem)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                  <v-text-field
                      v-if="field.schema.type === 'v-text-field'"
                      max-width="300px"
                      v-model="editedItem[field.value]"
                      :label=" tryT(field.text) || field.text "></v-text-field>
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
            {{ tryT(header.text) || header.text }}
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
            >{{ truncateText(props.item[field.value]) }}</td>
        </tr>
      </template>
      <template slot="no-data">
        <span class="heading">还没有信息，请点击右上角的按钮添加新的记录</span>
      </template>
      <template slot="footer">
        <td :colspan="headers.length">
          共有<span class="heading1 red--text">{{ count }}</span>项记录
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
    dialog (showOrNot) {
      showOrNot || this.close()
    },
    // watch modelName to refetch new data
    modelName: {
      handler (newModelName) {
        this.reset()
        this.fetch()
      },
      immediate: true
    },
    // watch params.blueprint to update modelName
    "$route.params": {
      handler (params) {
        this.modelName = params.blueprint
      },
      immediate: true
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

    close () {
      this.dialog = false
      setTimeout(() => {
        this.reset()
      }, 300)
    },

    save () {
      this.close()
    },

    saveDate (field, editedItem) {
      let fieldName = field.value
      let dateControl = this.$refs[fieldName][0]
      let newDate = this.editedItem[fieldName]
      dateControl.save(newDate)
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

    showInfo (item) {
      let params = {
        blueprint: this.modelName,
        editedItem: item,
        id: item._id
      }
      this.info(params)
    }
  }
}
</script>
