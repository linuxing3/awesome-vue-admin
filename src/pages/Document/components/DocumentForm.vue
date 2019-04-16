<template>
  <v-card>
    <v-card-title
        :class="editing ? 'success darken-1' : 'red darken-1'"
        dark>
      <span
          class="display-1 text-capitalize white--text font-weight-thin"
        >{{ formTitle }} - {{ modelName }} {{editedIndex !== -1 ? '-' + editedIndex : ''}}</span>
      <v-spacer/>
      <v-btn
          v-if="editedIndex !== -1"
          fab
          small
          color="red darken-2 white--text"
          @click="exportDocx(editedItem)"
          icon
        >
        <v-icon>attach_file</v-icon>
      </v-btn>
      <ExportDialog
          buttonText="导出/打印"
          :items="[ editedItem ]"
          :modelName="modelName"></ExportDialog>
    </v-card-title>
    <!-- activator in slot -->
    <v-card-text>
      <v-form
          ref="form"
          v-model="valid">
        <v-container
            fluid
            grid-list-xl>
          <v-layout
              row
              wrap>
            <!-- generate form from schema  -->
            <v-flex
                xs12
                md6>
              <v-menu
                  ref="datePicker"
                  v-model="datePicker"
                  false-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                <v-text-field
                    slot="activator"
                    v-model="editedItem['date']"
                    :label=" tryT('date')"
                    append-icon="event"
                    readonly
                  ></v-text-field>
                <v-date-picker
                    v-model="editedItem['date']"
                    no-title
                    scrollable>
                  <v-spacer></v-spacer>
                  <v-btn
                      flat
                      color="primary"
                      @click="birthdayPicker = false">{{ tryT('cancel')}}</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="50"
                  v-model="editedItem['year']"
                  :label=" tryT('year') "
                ></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md12
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="50"
                  v-model="editedItem['title']"
                  :label=" tryT('title') "
                ></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-select
                  v-model="editedItem['classiLevel']"
                  :items="['internal', 'classified']"
                  :label="tryT('classiLevel')"
                ></v-select>
            </v-flex>
            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-select
                  v-model="editedItem['category']"
                  :items="documentTypes"
                  :label="tryT('category')"
                ></v-select>
            </v-flex>
            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-select
                  v-model="editedItem['inOrOut']"
                  :items="['out', 'in']"
                  :label="tryT('inOrOut')"
                ></v-select>
            </v-flex>
            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-text-field
                  :counter="10"
                  v-model="editedItem['sendignCode']"
                  :label=" tryT('sendingCode') "
                ></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="10"
                  v-model="editedItem['orderedNumber']"
                  :label=" tryT('orderedNumber') "
                ></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="50"
                  v-model="editedItem['title']"
                  :label=" tryT('title') "
                ></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md12
                class="pa-2 pr-2">
              <v-textarea
                  :counter="500"
                  v-model="editedItem['content']"
                  :label=" tryT('content') "></v-textarea>
            </v-flex>
            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="50"
                  v-model="editedItem['toEntity']"
                  :label=" tryT('toEntity') "
                ></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-text-field
                  :counter="50"
                  v-model="editedItem['copyEntity']"
                  :label=" tryT('copyEntity') "
                ></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="50"
                  v-model="editedItem['workEntity']"
                  :label=" tryT('workEntity') "
                ></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-text-field
                  :counter="50"
                  v-model="editedItem['keyword']"
                  :label=" tryT('keyword') "
                ></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="10"
                  v-model="editedItem['author']"
                  :label=" tryT('author') "
                ></v-text-field>
            </v-flex>
            <!-- end form from schema  -->
          </v-layout>
        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          :class="editing ? 'success white--text' : 'red white--text'"
          @click="validate"
        >{{ editing ? '编辑': '新增'}}</v-btn>
      <v-btn
          class="gray"
          @click="resetValidation">取消</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import models from '@/models'
import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'

let DocumentType = models['documentType']

export default {
  data () {
    return {
      modelName: 'document',
      datePicker: false,
      yearPicker: false,
      valid: true
    }
  },
  computed: {
    documentTypes () {
      return DocumentType.uniqueValuesOfField('title')
    }
  },
  watch: {
    editedItem: {
      handler (newItem) {
        console.log(newItem)
      },
      immediate: true
    }
  },
  mixins: [crudMixin, exportMixin],
  created () {
    this.$on('set-edit-item', item => {
      this.setEditedItem(item)
    })
    window.DocumentForm = this
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.saveItem(this.editedItem)
        window.DocumentTable.$emit('toggle-form', false)
        this.reset()
      }
    },
    resetValidation () {
      this.$refs.form.resetValidation()
      window.DocumentTable.$emit('toggle-form', false)
      this.reset()
    }
  }
}
</script>

<style scoped>
</style>
