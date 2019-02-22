<script>
import { map, pick, pullAll } from 'lodash/fp'
import User from '@/models/User'

import Entity from '@/models/Entity'

import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'

export default {
  data () {
    return {
      modelName: 'user'
    }
  },
  mixins: [ crudMixin, exportMixin ],
  created () {
    window.UserForm = this
  },
  computed: {
    selectEntities: () => map(pick(['_id', 'name']), Entity.all()),
    selectUsers: () => map(pick(['_id', 'name']), User.all())
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
          <v-flex
              lg6
              sm6>
            <v-select
                v-model="model['sendingEntity_id']"
                key="sendingEntity_id"
                :label=" $t('sendingEntity_id') "
                :items="selectEntities"
                item-text="name"
                item-value="_id">
            </v-select>
          </v-flex>
          <v-flex
              lg6
              sm6>
            <v-select
                v-model="model['fromEntity_id']"
                key="fromEntity_id"
                :label=" $t('fromEntity_id') "
                :items="selectEntities"
                item-text="name"
                item-value="_id">
            </v-select>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
    <v-card-actions class='pb-3'>
      <v-spacer></v-spacer>
      <v-btn
          :color='editing ? "warning": "primary"'
          @click='saveItem(model)'>{{editing ? '更新': '添加'}}</v-btn>
      <v-btn
          flat
          @click.native='exportItem(model)'>导出数据</v-btn>
      <v-btn
          flat
          @click.native='mergeWordApp'>合并打印</v-btn>
    </v-card-actions>
  </v-card>
</template>
<style scoped>
</style>
