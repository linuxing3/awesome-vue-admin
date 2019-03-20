---
to: 'src/components/<%= h.capitalize(h.inflection.singularize(model)) %>/<%= h.capitalize(h.inflection.singularize(model)) %>Form.vue'
---
<%
  const modelName = h.capitalize(h.inflection.singularize(model))
  const modelFormName = h.capitalize(h.inflection.singularize(model)) + 'Form'
  const modelTableName = h.capitalize(h.inflection.singularize(model)) + 'Table'
%><template>
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
      <ExportDialog
          buttonText="导出/打印"
          :items="[ editedItem ]"
          :modelName="modelName" ></ExportDialog>
    </v-card-title>
    <!-- activator in slot -->
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-container
            fluid
            grid-list-xl>
          <v-layout
              row
              wrap>
            <!-- generate form from schema  -->
            <v-flex
                xs10
                md10
                sm10
                class="pa-2 pr-2">
              <v-text-field
                  :editable="false"
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
          :class="editing ? 'warning' : 'success'"
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
      modelName: '<%= modelName.toLowerCase() %>',
      rules: {
        nameRules: [
          v => !!v || 'Name is required',
          v => v.length <= 10 || 'Name must be less than 10 characters'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ]
      }
    }
  },
  watch: {
    editedItem: {
      handler (newItem) {
        console.log(newItem)
      },
      immediate: true
    },
  },
  mixins: [ crudMixin, exportMixin ],
  created () {
    this.$on('set-edit-item', (item) => {
      this.setEditedItem(item)
    })
    window.<%= modelFormName %> = this
  },
  methods: { 
    validate () {
      if (this.$refs.form.validate()) {
        this.saveItem(this.editedItem)
        window.<%= modelTableName %>.$emit('toggle-form', false)
        this.reset()
      }
    },
    resetValidation () {
      this.$refs.form.resetValidation()
      window.<%= modelTableName %>.$emit('toggle-form', false)
      this.reset()
    }
  }
}
</script>

<style scoped>
</style>
