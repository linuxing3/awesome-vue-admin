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
                md6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="10"
                  v-model="editedItem['title']"
                  :label=" tryT('title') "
                ></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-select
                  v-model="editedItem['type']"
                  :items="projectTypes"
                  :label="tryT('type')"
                ></v-select>
            </v-flex>
            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="10"
                  v-model="editedItem['status']"
                  :label=" tryT('status') "
                ></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md12
                class="pa-2 pr-2">
              <v-textarea
                  :counter="500"
                  v-model="editedItem['notes']"
                  :label=" tryT('notes') "
                ></v-textarea>
            </v-flex>
            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-select
                  v-model="editedItem['priority']"
                  :label=" tryT('priority') "
                  :items=" [ 'high', 'median', 'low' ] "
                ></v-select>
            </v-flex>
            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="10"
                  v-model="editedItem['percentComplete']"
                  :label=" tryT('percentComplete') "
                ></v-text-field>
            </v-flex>
            <v-flex
                xs12
                sm6
                md4>
              <v-menu
                  ref="expectedStartDatePicker"
                  v-model="expectedStartDatePicker"
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
                    v-model="editedItem['expectedStartDate']"
                    :label=" tryT('expectedStartDate')"
                    append-icon="event"
                    readonly
                  ></v-text-field>
                <v-date-picker
                    v-model="editedItem['expectedStartDate']"
                    no-title
                    scrollable>
                  <v-spacer></v-spacer>
                  <v-btn
                      flat
                      color="primary"
                      @click="expectedStartDatePicker = false">{{ tryT('cancel')}}</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex
                xs12
                sm6
                md4>
              <v-menu
                  ref="expectedEndDatePicker"
                  v-model="expectedEndDatePicker"
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
                    v-model="editedItem['expectedEndDate']"
                    :label=" tryT('expectedEndDate')"
                    append-icon="event"
                    readonly
                  ></v-text-field>
                <v-date-picker
                    v-model="editedItem['expectedEndDate']"
                    no-title
                    scrollable>
                  <v-spacer></v-spacer>
                  <v-btn
                      flat
                      color="primary"
                      @click="expectedEndDatePicker = false">{{ tryT('cancel')}}</v-btn>
                </v-date-picker>
              </v-menu>
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

<script lang='js'>
import models from '@/models'
import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'

let ProjectType = models['projectType']

export default {
  data () {
    return {
      modelName: 'project',
      rules: {
        nameRules: [
          v => !!v || 'Name is required',
          v => v.length <= 10 || 'Name must be less than 10 characters'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ]
      },
      valid: true,
      expectedStartDatePicker: true,
      expectedEndDatePicker: true
    }
  },
  computed: {
    projectTypes () {
      return ProjectType.uniqueValuesOfField('title')
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
    window.ProjectForm = this
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.saveItem(this.editedItem)
        window.ProjectTable.$emit('toggle-form', false)
        this.reset()
      }
    },
    resetValidation () {
      this.$refs.form.resetValidation()
      window.ProjectTable.$emit('toggle-form', false)
      this.reset()
    }
  }
}
</script>

<style scoped>
</style>
