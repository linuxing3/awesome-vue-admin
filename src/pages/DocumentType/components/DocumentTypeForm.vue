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
                  v-model="editedItem['name']"
                  :label=" tryT('name') "></v-text-field>
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
      modelName: 'documentType',
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
    window.DocumentTypeForm = this
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.saveItem(this.editedItem)
        window.DocumentTypeTable.$emit('toggle-form', false)
        this.reset()
      }
    },
    resetValidation () {
      this.$refs.form.resetValidation()
      window.DocumentTypeTable.$emit('toggle-form', false)
      this.reset()
    }
  }
}
</script>

<style scoped>
</style>
