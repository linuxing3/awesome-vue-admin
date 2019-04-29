<template>
  <v-card class="mt-5">
    <v-card-title>
      <v-dialog
          v-model="dialog"
          max-width="60%">
        <v-btn
            slot="activator"
            class="offset-mt-5"
            fab
            large
            absolute
            left
            top
            color="red darken-1"
          >
          <v-icon dark>
            add
          </v-icon>
        </v-btn>
        <slot></slot>
      </v-dialog>
      <!-- 导出多个，将item属性设置为items数组 -->
      <v-spacer></v-spacer>
      <v-text-field
          class="mr-3"
          v-model='filter.search'
          append-icon='search'
          label="模糊查询，不分大小写"
          single-line
        ></v-text-field>
      <ExportDialog
          buttonText="导出/打印"
          :items="selected.length === 0 ? items: selected "
          :modelName="modelName" ></ExportDialog>
      <ImportDialog
          buttonText="导入/整理"
          :modelName="modelName"></ImportDialog>
    </v-card-title>
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
          <th>{{ tryT('action')}}</th>
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
  </v-card>
</template>

<script>
import exportMixin from '@/mixins/exportMixin'
import crudMixin from '@/mixins/crudMixin.request'

export default {
  data () {
    return {
      modelName: 'projectTask',
      dialog: false,
      pagination: {
        sortBy: '_id',
        rowsPerPage: 25,
        descending: true
      },
      selected: [],
      modal: false
    }
  },
  watch: {
    modelName: {
      handler (newModelName) {
        this.fetch()
      },
      immediate: true
    }
  },
  mixins: [ exportMixin, crudMixin ],
  created () {
    window.ProjectTaskTable = this
    this.$on('toggle-form', (v) => {
      this.dialog = v
    })
  },
  methods: {
    editItem (item) {
      this.setEditedItem(item)
      window.ProjectTaskForm.setEditedItem(item)
      this.dialog = true
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

<style scoped>
</style>
