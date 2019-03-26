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
                sm6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.nameRules"
                  :counter="25"
                  v-model="editedItem['name']"
                  :label=" tryT('name') "></v-text-field>
            </v-flex>
            <v-flex
                xs12
                sm6
                md4>
              <v-menu
                  ref="birthday"
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
                md6
                sm6
                class="pa-2 pr-2">
              <v-select
                  :label=" tryT('gender')"
                  :items="[ tryT('male'), tryT('female')]"
                  v-model="editedItem['gender']">
              </v-select>
            </v-flex>
            <v-flex
                xs12
                md6
                sm6
                class="pa-2 pr-2">
              <v-select
                  :label=" tryT('etnia')"
                  :items="['male', 'female']"
                  v-model="editedItem['etnia']">
              </v-select>
            </v-flex>
            <v-flex
                xs12
                md6
                sm6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.textRules"
                  :counter="50"
                  v-model="editedItem['academicBackground']"
                  :label=" tryT('academicBackground') "></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md6
                sm6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.textRules"
                  :counter="50"
                  v-model="editedItem['positionAndRank']"
                  :label=" tryT('positionAndRank') "></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md6
                sm6
                class="pa-2 pr-2">
              <v-select
                  :label=" tryT('politicalRole')"
                  :items="[ tryT('militant'), tryT('youth') ]"
                  v-model="editedItem['politicalRole']">
              </v-select>
            </v-flex>
            <v-flex
                xs12
                md6
                sm6
                class="pa-2 pr-2">
              <v-select
                  :label=" tryT('militantRole')"
                  :items="[ tryT('militant'), tryT('youth') ]"
                  v-model="editedItem['militantRole']">
              </v-select>
            </v-flex>
            <v-flex
                xs12
                md12
                sm12
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.textRules"
                  :counter="50"
                  v-model="editedItem['duty']"
                  :label=" tryT('duty') "></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md6
                sm6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.textRules"
                  :counter="50"
                  v-model="editedItem['fromEntity']"
                  :label=" tryT('fromEntity') "></v-text-field>
            </v-flex>
            <v-divider></v-divider>
            <v-flex
                xs12
                md6
                sm6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.textRules"
                  :counter="50"
                  v-model="editedItem['sendingEntity']"
                  :label=" tryT('sendingEntity') "></v-text-field>
            </v-flex>
            <v-divider />
            <v-flex
                xs12
                md6
                sm6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.textRules"
                  :counter="10"
                  v-model="editedItem['conyugeName']"
                  :label=" tryT('conyugeName') "></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md6
                sm6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.textRules"
                  :counter="50"
                  v-model="editedItem['conyugeEntity']"
                  :label=" tryT('conyugeEntity') "></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md6
                sm6
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.textRules"
                  :counter="50"
                  v-model="editedItem['conyugeBonus']"
                  :label=" tryT('conyugeBonus') "></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md12
                sm12
                class="pa-2 pr-2">
              <v-text-field
                  :rules="rules.textRules"
                  :counter="50"
                  v-model="editedItem['memo']"
                  :label=" tryT('memo') "></v-text-field>
            </v-flex>
            <v-divider class="my-2" />
            <v-spacer />
            <v-flex
                xs12
                md2
                sm2
                class="pa-2 pr-2">
              <v-text-field
                  :counter="10"
                  v-model="editedItem['protocolId']"
                  :label=" tryT('protocolId') "></v-text-field>
            </v-flex>
            <v-flex
                xs12
                md2
                sm2
                class="pa-2 pr-2">
              <v-select
                  v-model="editedItem['isActive']"
                  :label=" tryT('isActive') "></v-select>
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
      modelName: 'user',
      rules: {
        nameRules: [
          v => !!v || 'Required',
          v => v.length <= 25 || 'Must be less than 25 characters'
        ],
        textRules: [
          v => v.length <= 50 || 'Must be less than 50 characters'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ]
      },
      birthdayPicker: false,
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
    window.UserForm = this
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.saveItem(this.editedItem)
        window.UserTable.$emit('toggle-form', false)
        this.reset()
      }
    },
    resetValidation () {
      this.$refs.form.resetValidation()
      window.UserTable.$emit('toggle-form', false)
      this.reset()
    }
  }
}
</script>

<style scoped>
</style>
