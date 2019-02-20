<script>
import Resummee from '@/models/Resummee'
import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'
export default {
  data () {
    return {
      editing: false,
      model: {},
      modelName: 'resummee'
    }
  },
  mixins: [crudMixin, exportMixin],
  created () {
    window.ResummeeForm = this
  }
}
</script>

<template>
  <v-card>
    <v-toolbar
        card
        prominent
        extended
        :color="editing ? 'warning' : 'primary'"
        dark="">
      <v-toolbar-title class="headline">
        {{editing ? "你在进行编辑更新" : "你在添加模式"}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          icon
          @click="reset">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-layout wrap>
        <v-flex
            v-for="field in fields"
            :key="field"
            lg6
            sm6>
          <v-text-field
              v-model="model[field]"
              :label=" $t !== undefined ? $t(field) : field">
          </v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          :color="editing ? 'warning' : 'primary'"
          @click="saveItem(model)">{{editing ? "更新": "添加"}}</v-btn>
      <v-btn
          flat
          @click.native="exportItem(model)">导出数据</v-btn>
      <v-btn
          flat
          @click.native="mergeWordApp">合并打印</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" module>
</style>
