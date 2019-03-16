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
                @click="exportDocx(editedItem)"
                icon>
              <v-icon>attach_file</v-icon>
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
                      :class=' field.attrs.class'
                      v-if="field.type === 'v-textarea'"
                      v-model="editedItem[field.value]"
                      :label=" tryT(field.text) || field.text"></v-textarea>
                  <v-select
                      :class=' field.attrs.class'
                      v-if="field.type === 'v-select'"
                      v-model="editedItem[field.value]"
                      :items="field.items"
                      item-text="name"
                      item-value="_id"
                      :label=" tryT(field.text) || field.text"></v-select>
                  <v-text-field
                      :class=' field.attrs.class'
                      v-if="field.type === 'v-date-picker'"
                      v-model="editedItem[field.value]"
                      :label="tryT(field.text) || field.text"
                      max-width="300px"
                      :hint=" 'Input' + field.text + ', like 2009-09-09'"
                    ></v-text-field>
                  <v-dialog
                      v-if="field.type === 'vvv-date-picker'"
                      :ref="field.value"
                      v-model="modal"
                      full-width
                      width="290px"
                    >
                    <v-btn
                        icon
                        slot="activator"
                      >
                      <v-icon>event</v-icon>
                    </v-btn>
                    <v-date-picker
                        v-show="false"
                        v-model="editedItem[field.value]"
                        scrollable>
                      <v-spacer></v-spacer>
                      <v-btn
                          flat
                          @click="modal = false">Cancel</v-btn>
                      <v-btn
                          flat
                          color="primary"
                          @click="saveDate(field.value, editedItem)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                  <v-text-field
                      v-if="field.type === 'v-text-field'"
                      v-model="editedItem[field.value]"
                      :class=' field.attrs.class'
                      :hint="'Input ' + field.text"
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
        item-key="_id"
        :pagination.sync="pagination"
        select-all
        class="elevation-1"
      >
      <template
          v-slot:header-cell="props">
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
          v-slot:headers="props">
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
          v-slot:items="props">
        <tr
            :active="props.selected">
          <td>
            <v-checkbox
                v-model="props.selected"
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
              class="text-truncate"
              v-for="field in headers"
              :key="field.value"
            >{{ truncateText(props.item[field.value]) }}</td>
        </tr>
      </template>
      <template v-slot:no-data>
        <span class="heading">还没有信息，请点击右上角的按钮添加新的记录</span>
      </template>
      <template v-slot:footer>
        <td :colspan="headers.length">
          共有<span class="heading1 red--text">{{ count }}</span>项记录。选中<span class="heading1 red--text">{{ selected.length }}</span>项记录。
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
      sortBy: '_id',
      rowsPerPage: 25,
      descending: true
    },
    selected: [],
    modal: false,
    dateControl: null
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
    modal (showOrNot) {
      this.$nextTick()
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
    '$route.params': {
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
    // TODO 动态生成的多个日期选择器，在保存时refs自动跳到下一个
    saveDate (fieldName, editedItem) {
      console.log(fieldName)
      this.dateControl = this.$refs[fieldName][0]
      console.log(this.dateControl)
      let newDate = this.editedItem[fieldName]
      this.dateControl.save(newDate)
      this.dateControl = null
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
