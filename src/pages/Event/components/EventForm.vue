<template>
  <v-card>
    <v-card-title
        :class="editing ? 'success darken-1' : 'red darken-1'"
        dark>
      <span class="display-1 text-capitalize white--text font-weight-thin">{{ formTitle }} - {{ modelName }}  {{editedIndex !== -1 ? '-' + editedIndex : ''}}</span>
      <v-spacer />
      <v-btn
          v-if="editedIndex !== -1"
          fab
          small
          color="red darken-2 white--text"
          @click="exportDocx(editedItem)"
          icon>
        <v-icon>attach_file</v-icon>
      </v-btn>
      <ExportDialog
          buttonText="导出/打印"
          :items="[ editedItem ]"
          :modelName="modelName" ></ExportDialog>
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
                md12
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
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="10"
                  v-model="editedItem['applicant']"
                  :label=" tryT('applicant') "
                ></v-text-field>
            </v-flex>
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
                  :counter="10"
                  v-model="editedItem['startTime']"
                  :label=" tryT('startTime') "
                ></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-text-field
                  v-model="editedItem['duration']"
                  :label=" tryT('duration') "
                ></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="10"
                  v-model="editedItem['participants']"
                  :label=" tryT('participants') "
                ></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="10"
                  v-model="editedItem['guests']"
                  :label=" tryT('guests') "
                ></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md12
                class="pa-2 pr-2">
              <v-textarea
                  :rules="rules.textRules"
                  :counter="100"
                  v-model="editedItem['content']"
                  :label=" tryT('event.content') "
                ></v-textarea>
            </v-flex>
            <v-flex
                xs12
                md12
                class="pa-2 pr-2">
              <v-textarea
                  :rules="rules.textRules"
                  :counter="100"
                  v-model="editedItem['reportContent']"
                  :label=" tryT('reportContent') "
                ></v-textarea>
            </v-flex>
            <v-flex
                xs12
                md6>
              <v-menu
                  ref="reportDatePicker"
                  v-model="reportDatePicker"
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
                    label="报告日期"
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
                md12
                class="pa-2 pr-2">
              <v-textarea
                  :rules="rules.textRules"
                  :counter="100"
                  v-model="editedItem['instruction']"
                  :label=" tryT('instruction') "
                ></v-textarea>
            </v-flex>
            <v-flex
                xs12
                md6>
              <v-menu
                  ref="instructionDatePicker"
                  v-model="instructionDatePicker"
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
                    label="批示日期"
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
            <!-- end form from schema  -->
          </v-layout>
        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          :class="editing ? 'success white--text' : 'red white--text'"
          @click="validate">{{ editing ? '编辑': '新增'}}</v-btn>
      <v-btn
          class="gray"
          @click="resetValidation">取消</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'

export default {
  data () {
    return {
      modelName: 'event',
      datePicker: false,
      reportDatePicker: false,
      instructionDatePicker: false,
      rules: {
        nameRules: [
          v => !!v || 'Name is required',
          v => v.length <= 10 || 'Name must be less than 10 characters'
        ],
        textRules: [
          v => v.length <= 100 || 'Name must be less than 100 characters'
        ]
      },
      valid: true
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
  mixins: [ crudMixin, exportMixin ],
  created () {
    this.$on('set-edit-item', (item) => {
      this.setEditedItem(item)
    })
    window.EventForm = this
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.saveItem(this.editedItem)
        window.EventTable.$emit('toggle-form', false)
        this.reset()
      }
    },
    resetValidation () {
      this.$refs.form.resetValidation()
      window.EventTable.$emit('toggle-form', false)
      this.reset()
    }
  }
}
</script>

<style scoped>
</style>
