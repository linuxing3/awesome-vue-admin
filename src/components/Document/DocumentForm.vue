<script>
import { map, pick, pullAll } from 'lodash/fp'
import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'

export default {
  data () {
    return {
      editing: false,
      model: {},
      modelName: 'document',
      dateMenu: false
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
                ref="date"
                lazy
                :close-on-content-click="false"
                v-model="dateMenu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-bottom="-22"
                max-width="290px"
                :return-value.sync="model['date']"
              >
              <v-text-field
                  slot="activator"
                  :label="$t('date')"
                  v-model="model['date']"
                  append-icon="event"
                  readonly
                ></v-text-field>
              <v-date-picker
                  v-model="model['date']"
                  no-title
                  scrollable>
                <v-spacer></v-spacer>
                <v-btn
                    flat
                    color="primary"
                    @click="dateMenu = false">{{ $t('cancel') }}</v-btn>
                <v-btn
                    flat
                    color="primary"
                    @click="$refs.date.save(model['date'])">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex
              lg6
              sm6>
            <v-text-field
                v-model="model['inOrOut']"
                name="inOrOut"
                key="inOrOut"
                :label=" $t !== undefined ? $t('inOrOut') : 'type'">
            </v-text-field>
          </v-flex>
          <v-flex
              lg6
              sm6>
            <v-text-field
                v-model="model['year']"
                name="year"
                key="year"
                :label=" $t !== undefined ? $t('year') : 'type'">
            </v-text-field>
          </v-flex>
          <v-flex
              lg6
              sm6>
            <v-text-field
                v-model="model['category']"
                name="category"
                key="category"
                :label=" $t !== undefined ? $t('category') : 'type'">
            </v-text-field>
          </v-flex>
          <v-flex
              lg6
              sm6>
            <v-text-field
                v-model="model['sendingCode']"
                name="sendingCode"
                key="sendingCode"
                :label=" $t !== undefined ? $t('sendingCode') : 'mark'">
            </v-text-field>
          </v-flex>
          <v-flex
              lg6
              sm6>
            <v-text-field
                v-model="model['orderedNumber']"
                name="orderedNumber"
                key="orderedNumber"
                :label=" $t !== undefined ? $t('orderedNumber') : 'mark'">
            </v-text-field>
          </v-flex>
          <v-flex
              lg6
              sm6>
            <v-text-field
                v-model="model['classiLevel']"
                name="classiLevel"
                key="classiLevel"
                :label=" $t('classiLevel') ">
            </v-text-field>
          </v-flex>
          <v-flex
              lg12
              sm12>
            <v-text-field
                v-model="model['title']"
                name="title"
                key="title"
                :label=" $t('title') ">
            </v-text-field>
          </v-flex>
          <v-flex
              lg12
              sm12>
            <v-textarea
                v-model="model['content']"
                name="content"
                key="content"
                multi-line
                :label=" $t('content') ">
            </v-textarea>
          </v-flex>
          <v-flex
              lg6
              sm6>
            <v-text-field
                v-model="model['toEntity']"
                name="toEntity"
                key="toEntity"
                :label=" $t('toEntity') ">
            </v-text-field>
          </v-flex>
          <v-flex
              lg6
              sm6>
            <v-text-field
                v-model="model['copyEntity']"
                name="copyEntity"
                key="copyEntity"
                :label=" $t('copyEntity') ">
            </v-text-field>
          </v-flex>
          <v-flex
              lg6
              sm6>
            <v-text-field
                v-model="model['workEntity']"
                name="workEntity"
                key="workEntity"
                :label=" $t('workEntity') ">
            </v-text-field>
          </v-flex>
          <v-flex
              lg12
              sm12>
            <v-text-field
                v-model="model['attachment']"
                name="attachment"
                key="attachment"
                :label=" $t('attachment') ">
            </v-text-field>
          </v-flex>
          <v-flex
              lg6
              sm6>
            <v-text-field
                v-model="model['keyword']"
                name="keyword"
                key="keyword"
                :label=" $t('keyword') ">
            </v-text-field>
          </v-flex>
          <v-flex
              lg6
              sm6>
            <v-text-field
                v-model="model['author']"
                name="author"
                key="author"
                :label=" $t('author') ">
            </v-text-field>
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
      <AttachDialog
          buttonText="单独附件"
          :modelName="modelName"></AttachDialog>
    </v-card-actions>
  </v-card>
</template>
