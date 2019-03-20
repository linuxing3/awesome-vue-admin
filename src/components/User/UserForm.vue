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
              v-for='field in fields'
              :key='field'
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
          :color='editing ? "warning": "primary"'
          @click='saveItem(model)'>{{editing ? '更新': '添加'}}</v-btn>
      <!-- 导出单个，将item属性设置为model对象 -->
      <ExportDialog
          :items="[ model ]"
          :modelName="modelName"></ExportDialog>
      <ImportDialog
          :modelName="modelName"></ImportDialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import User from '@/models/User'

import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'

export default {
  data () {
    return {
      modelName: 'user'
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
    window.UserForm = this
  }
}
</script>

<style scoped>
</style>
