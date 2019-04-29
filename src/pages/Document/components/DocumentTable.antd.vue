<template>
  <div>
    <a-button
        type="primary"
        @click="addItem"
      >
      New
    </a-button>
    <a-modal :visible="visible">
      <a-card
          :title=" modelName + '-' + editedIndex ">
        <a-list
            :grid="{ gutter: 16, column: 2 }"
            :dataSource="headers"
          >
          <a-list-item
              slot="renderItem"
              slot-scope="item">
            {{item.text}}
            <a-input
                v-model="editedItem[item.value]"
              >
            </a-input>
          </a-list-item>
        </a-list>
        <div>
          <a-button
              class="primary"
              @click="handleSubmit">
            Confirm
          </a-button>
          <a-button
              @click="handleCancel">
            Cancel
          </a-button>
        </div>
      </a-card>
    </a-modal>
    <a-table :dataSource="items">
      <a-table-column
          title="title"
          dataIndex="title"
          key="title"
        />
      <a-table-column
          title="content"
          dataIndex="content"
          key="content"
        />
      <a-table-column
          title="inOrOut"
          dataIndex="inOrOut"
          key="inOrOut"
        />
      <a-table-column
          title="toEntity"
          dataIndex="toEntity"
          key="toEntity"
        />
      <a-table-column
          title="keywords"
          dataIndex="keywords"
          key="keywords"
        >
        <template slot-scope="tags">
          <span>
            <a-tag
                v-for="tag in tags"
                color="blue"
                :key="tag">{{tag}}</a-tag>
          </span>
        </template>
      </a-table-column>
      <a-table-column
          title="Action"
          key="action"
        >
        <template slot-scope="text, record">
          <span>
            <a-button
                type="primary"
                icon="edit"
                @click="editItem(record)">Edit</a-button>
            <a-button
                icon="delete"
                @click="deleteItem(record)">Delete</a-button>
          </span>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>
<script>
import exportMixin from '@/mixins/exportMixin'
import crudMixin from '@/mixins/crudMixin.request'

import DocumentFormAntd from './DocumentForm.antd'

export default {
  components: {
    DocumentFormAntd
  },
  data () {
    return {
      modelName: 'document',
      visible: false,
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
    window.DocumentTableAntd = this
    this.$on('toggle-form', (v) => {
      this.visible = v
    })
  },
  methods: {
    editItem (item) {
      this.editedItem = Object.assign({}, item)
      this.editedIndex = this.editedItem._id
      this.showModal()
    },

    addItem () {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.showModal()
    },

    showModal () {
      console.log('Opening form')
      this.visible = true
    },

    handleCancel  () {
      this.visible = false
    },

    handleSubmit  () {
      this.saveItem(this.editItem)
      this.reset()
      this.visible = false
    }
  }
}
</script>
