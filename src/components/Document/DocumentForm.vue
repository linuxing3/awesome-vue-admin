<script>
import { map, pick, pullAll } from 'lodash/fp'
import Document from '@/models/Document'

import Entity from '@/models/Entity'
import User from '@/models/User'

import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'

export default {
  data () {
    return {
      editing: false,
      model: {},
      modelName: 'document',
      startDateMenu: false
    }
  },
  mixins: [crudMixin, exportMixin],
  created () {
    window.DocumentForm = this
  },
  computed: {
    selectEntities: () => map(pick(['_id', 'name']), Entity.all()),
    selectUsers: () => map(pick(['_id', 'name']), User.all())
  },
  methods: {}
}
</script>

<template>
  <v-card>
    <v-toolbar
        card
        prominent
        extended
        :color='editing ? "warning": "primary"'
        dark="">
      <v-toolbar-title class="headline">请输入文函信息</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title :class="editing ? 'yellow--text' : 'white--text'">
        {{editing ? "你在进行编辑更新" : "你在添加模式"}}
      </v-toolbar-title>
      <v-btn
          icon
          @click="reset">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-layout wrap>
          <v-flex
              sm6
              lg6>
            <v-menu
                class="pr-2"
                ref="statDate"
                lazy
                :close-on-content-click="false"
                v-model="startDateMenu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-bottom="-22"
                max-width="290px"
                :return-value.sync="model['startDate']"
              >
              <v-text-field
                  slot="activator"
                  :label="$t('startDate')"
                  v-model="model['startDate']"
                  append-icon="event"
                  readonly
                ></v-text-field>
              <v-date-picker
                  v-model="model['startDate']"
                  no-title
                  scrollable>
                <v-spacer></v-spacer>
                <v-btn
                    flat
                    color="primary"
                    @click="startDateMenu = false">Cancel</v-btn>
                <v-btn
                    flat
                    color="primary"
                    @click="$refs.statDate.save(model['startDate'])">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex
              lg6
              sm6>
            <v-text-field
                v-model="model['type']"
                name="type"
                key="type"
                :label=" $t !== undefined ? $t('type') : 'type'">
            </v-text-field>
          </v-flex>
          <v-flex
              lg6
              sm6>
            <v-text-field
                v-model="model['mark']"
                name="mark"
                key="mark"
                :label=" $t !== undefined ? $t('mark') : 'mark'">
            </v-text-field>
          </v-flex>
          <v-flex
              lg6
              sm6>
            <v-text-field
                v-model="model['classification']"
                name="classification"
                key="classification"
                :label=" $t !== undefined ? $t('classification') : 'classification'">
            </v-text-field>
          </v-flex>
          <v-flex
              lg12
              sm12>
            <v-text-field
                v-model="model['title']"
                name="title"
                key="title"
                :label=" $t !== undefined ? $t('title') : 'title'">
            </v-text-field>
          </v-flex>
          <v-flex
              lg12
              sm12>
            <v-textarea
                v-model="model['text']"
                name="text"
                key="text"
                multi-line
                :label=" $t !== undefined ? $t('text') : 'text'">
            </v-textarea>
          </v-flex>
          <v-flex
              lg12
              sm12>
            <v-text-field
                v-model="model['attachment']"
                name="attachment"
                key="attachment"
                :label=" $t !== undefined ? $t('attachment') : 'attachment'">
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
          <v-flex
              lg6
              sm6>
            <v-select
                v-model="model['toEntity_id']"
                key="toEntity_id"
                :label=" $t('toEntity_id') "
                :items="selectEntities"
                item-text="name"
                item-value="_id">
            </v-select>
          </v-flex>
          <v-flex
              lg6
              sm6>
            <v-select
                v-model="model['copyEntity_id']"
                key="copyEntity_id"
                :label=" $t('copyEntity_id') "
                :items="selectEntities"
                item-text="name"
                item-value="_id">
            </v-select>
          </v-flex>
          <v-flex
              lg6
              sm6>
            <v-select
                v-model="model['author_id']"
                key="author_id"
                :label=" $t('author_id') "
                :items="selectUsers"
                item-text="name"
                item-value="_id">
            </v-select>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
    <v-card-actions class="pb-3">
      <v-spacer></v-spacer>
      <v-btn
          :color="editing ? 'warning' : 'primary'"
          @click="saveItem(model)">{{editing ? "更新": "添加"}}</v-btn>
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
