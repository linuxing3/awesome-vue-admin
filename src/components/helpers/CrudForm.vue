<template>
  <div>
    <v-container
        id="entity-dropdown">
    </v-container>
    <v-card>
      <v-card-title
          class="success white--text"
          dark>
        <span
            class="headline font-weight-light">
          {{ formTitle }} {{ modelName }}
        </span>
        <v-spacer />
        <v-btn
            fab
            small
            color="red darken-2 white--text"
            @click="exportDocx(modelName)"
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
    modal: false
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '新增' : '编辑'
    }
  },

  watch: {
    // watch params.blueprint to update modelName
    "$route.params": {
      handler (params) {
        let { blueprint, editedItem } = params
        this.modelName = blueprint
        this.setEditedItem(editedItem)
      },
      immediate: true
    }
  },

  created () {
    window.CrudForm = this
  },

  methods: {
    close () {
      setTimeout(() => {
        this.reset()
      }, 300)
    },
    
    saveDate (field, editedItem) {
      let fieldName = field.value
      let dateControl = this.$refs[fieldName][0]
      let newDate = this.editedItem[fieldName]
      dateControl.save(newDate)
    }
  }
}
</script>
