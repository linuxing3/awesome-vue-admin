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
                md6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="25"
                  v-model="editedItem['name']"
                  :label=" tryT('name') "></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="25"
                  v-model="editedItem['gender']"
                  :label=" tryT('gender') "></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="25"
                  v-model="editedItem['etnia']"
                  :label=" tryT('etnia') "></v-text-field>
            </v-flex>
            <v-flex
                xs12
                sm6
                md4>
              <v-menu
                  ref="birthdayPicker"
                  v-model="birthdayPicker"
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
                    v-model="editedItem['birthday']"
                    :label=" tryT('birthday')"
                    append-icon="event"
                    readonly
                  ></v-text-field>
                <v-date-picker
                    v-model="editedItem['birthday']"
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
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="25"
                  v-model="editedItem['idNumber']"
                  :label=" tryT('idNumber') "></v-text-field>
            </v-flex>

            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="25"
                  v-model="editedItem['academicBackground']"
                  :label=" tryT('academicBackground') "></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="25"
                  v-model="editedItem['hrCategory']"
                  :label=" tryT('hrCategory') "></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md12
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="25"
                  v-model="editedItem['department']"
                  :label=" tryT('department') "></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md12
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="25"
                  v-model="editedItem['workPosition']"
                  :label=" tryT('workPosition') "></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md12
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="25"
                  v-model="editedItem['positionAndRank']"
                  :label=" tryT('positionAndRank') "></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md12
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="25"
                  v-model="editedItem['militantComission']"
                  :label=" tryT('militantComission') "></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md12
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="25"
                  v-model="editedItem['militantRole']"
                  :label=" tryT('militantRole') "></v-text-field>
            </v-flex>
            <v-flex
                xs12
                sm6
                md4>
              <v-menu
                  ref="admissionDatePicker"
                  v-model="admissionDatePicker"
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
                    v-model="editedItem['militantAdmissionDate']"
                    :label=" tryT('militantAdmissionDate')"
                    append-icon="event"
                    readonly
                  ></v-text-field>
                <v-date-picker
                    v-model="editedItem['militantAdmissionDate']"
                    no-title
                    scrollable>
                  <v-spacer></v-spacer>
                  <v-btn
                      flat
                      color="primary"
                      @click="admissionDatePicker = false">{{ tryT('cancel')}}</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex
                xs12
                sm6
                md4>
              <v-menu
                  ref="formalizationDatePicker"
                  v-model="formalizationDatePicker"
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
                    v-model="editedItem['militantFormalizationDate']"
                    :label=" tryT('militantFormalizationDate')"
                    append-icon="event"
                    readonly
                  ></v-text-field>
                <v-date-picker
                    v-model="editedItem['militantFormalizationDate']"
                    no-title
                    scrollable>
                  <v-spacer></v-spacer>
                  <v-btn
                      flat
                      color="primary"
                      @click="formalizationDatePicker = false">{{ tryT('cancel')}}</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex
                xs12
                md12
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="25"
                  v-model="editedItem['militanceStatus']"
                  :label=" tryT('militanceStatus') "></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md12
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="25"
                  v-model="editedItem['telephone']"
                  :label=" tryT('telephone') "></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md12
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="25"
                  v-model="editedItem['homeAddress']"
                  :label=" tryT('homeAddress') "></v-text-field>
            </v-flex>
            <v-flex
                xs12
                sm6
                md4>
              <v-menu
                  ref="registerDate"
                  v-model="registerDatePicker"
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
                    v-model="editedItem['registerDate']"
                    :label=" tryT('registerDate')"
                    append-icon="event"
                    readonly
                  ></v-text-field>
                <v-date-picker
                    v-model="editedItem['registerDate']"
                    no-title
                    scrollable>
                  <v-spacer></v-spacer>
                  <v-btn
                      flat
                      color="primary"
                      @click="registerDatePicker = false">{{ tryT('cancel')}}</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex
                xs12
                sm6
                md4>
              <v-menu
                  ref="transferDate"
                  v-model="transferDatePicker"
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
                    v-model="editedItem['transferDate']"
                    :label=" tryT('transferDate')"
                    append-icon="event"
                    readonly
                  ></v-text-field>
                <v-date-picker
                    v-model="editedItem['transferDate']"
                    no-title
                    scrollable>
                  <v-spacer></v-spacer>
                  <v-btn
                      flat
                      color="primary"
                      @click="transferDatePicker = false">{{ tryT('cancel')}}</v-btn>
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
      modelName: 'userMilitant',
      rules: {
        nameRules: [
          v => !!v || 'Name is required',
          v => v.length <= 25 || 'Name must be less than 25 characters'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ]
      },
      registerDatePicker: false,
      transferDatePicker: false,
      admissionDatePicker: false,
      formalizationDatePicker: false
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
    window.UserMilitantForm = this
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.saveItem(this.editedItem)
        window.UserMilitantTable.$emit('toggle-form', false)
        this.reset()
      }
    },
    resetValidation () {
      this.$refs.form.resetValidation()
      window.UserMilitantTable.$emit('toggle-form', false)
      this.reset()
    }
  }
}
</script>

<style scoped>
</style>
