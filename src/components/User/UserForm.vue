<script>
import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'

export default {
  data () {
    return {
      modelName: 'user',
      selectedUsers: []
    }
  },
  mixins: [ crudMixin, exportMixin ],
  created () {
    window.UserForm = this
  },
  computed: {
    selectEntities: () => map(pick(['_id', 'name']), Entity.all()),
    selectUsers: () => map(pick(['_id', 'name']), User.all())
  },
  methods: {
    openExportDialog () {
      window.ExportDialog.$emit('TOGGLE')
    }
  }
}
</script>

<template>
  <v-card>
    <v-toolbar
        card
        prominent
        extended
        :color='editing ? "warning": "primary"'
        dark=''>
      <v-toolbar-title class='headline'>
        {{editing ? '你在进行编辑更新' : '你在添加模式'}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          icon
          @click='reset'>
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-layout wrap>
          <v-flex
              v-for='field in nonRelationFields'
              :key="field"
              lg6
              sm6>
            <v-text-field
                v-model='model[field]'
                :name='field'
                :label='tryT(field) '>
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
    <v-card-actions class='pb-3'>
      <v-spacer></v-spacer>
      <v-btn
          class="ml-3 mr-3"
          :color='editing ? "warning": "primary"'
          @click='saveItem(model)'>{{editing ? '更新': '添加'}}</v-btn>
      <!-- 导出单个，将item属性设置为model对象 -->
      <ExportDialog
          buttonText="导出/打印"
          :item="[model]"
          :modelName="modelName"></ExportDialog>
      <ImportDialog
          buttonText="导入/整理"
          :modelName="modelName"></ImportDialog>
    </v-card-actions>
  </v-card>
</template>
<style scoped>
</style>
