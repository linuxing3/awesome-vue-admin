<template>
  <div id="pageCard">
    <v-container
        grid-list-xl
        fluid>
      <v-layout
          wrap
          row>
        <v-flex class="mt-15">
          <div class="mt-15">
            <h1 class="heading">
              当前数据表: {{ modelName  }}
            </h1>
          </div>
          <div class="mt-15">
            <DatabaseChips>
            </DatabaseChips>
          </div>
          <v-tabs
              v-model="activeTab"
              color="primary"
              dark
              slider-color="yellow"
              class="mt-15"
            >
            <v-tab
                v-for="tab in ['导入', '导出', '删除']"
                :key="tab"
                ripple
              >
              <h4>{{ tab }}</h4>
            </v-tab>
            <!-- tab1 -->
            <v-tab-item>
              <div class="mt-15">
                <v-layout>
                  <v-flex>
                    <input
                        type="file"
                        multiple="multiple"
                        @change=" getImportFile($event) "/>
                  </v-flex>
                  <v-flex>
                    <v-radio-group
                        v-model="clearGroup"
                        row>
                      <v-radio
                          color="primary"
                          row
                          v-for="option in ['保留', '清除']"
                          :key="option"
                          :label="`${option}已有数据`"
                          :value="option"
                        ></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <v-flex>
                    <v-tooltip bottom>
                      <v-btn
                          slot="activator"
                          class="accent"
                          @click=" importItem ">
                        开始导入
                      </v-btn>
                      <span>你可以方便地导入csv文件的数据, 请确认标题为英文,如不是请先转换</span>
                    </v-tooltip>
                  </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <!-- changeCSVHeader slot -->
                <v-layout class="translate">
                  <div slot="translate">
                    <v-flex>
                      <v-btn
                          @click=" changeCSVHeader ">
                        翻译数据表标题
                      </v-btn>
                    </v-flex>
                    <v-flex>
                      <v-radio-group
                          v-model="reverseTranslate"
                          row>
                        <v-radio
                            color="primary"
                            row
                            v-for="option in ['外译中', '中译外']"
                            :key="option"
                            :label="`${option}第一行标题`"
                            :value=" option === '外译中' ? false : true "
                          ></v-radio>
                      </v-radio-group>
                    </v-flex>
                  </div>
                  <!-- translate-csv-header slot -->
                  <translate>
                    <template>
                      <slot name="translate"></slot>
                    </template>
                  </translate>
                  <!-- end of translate-csv-header slot -->
                </v-layout>
              </div>
            </v-tab-item>
            <!-- tab2 -->
            <v-tab-item>
              <div class="mt-15">
                <v-tooltip bottom>
                  <v-btn
                      slot="activator"
                      class="accent"
                      @click="exportEntities">
                    导出数据表
                  </v-btn>
                  <span>你可以方便地导出数据到csv文件,用Excel打开</span>
                </v-tooltip>
                <v-radio-group
                    v-model="onlyKeepStringValue"
                    row>
                  <v-radio
                      color="primary"
                      row
                      v-for="option in ['字符', '全部']"
                      :key="option"
                      :label="`保留${option}`"
                      :value=" option === '字符' ? true : false "
                    ></v-radio>
                </v-radio-group>
                <v-divider></v-divider>
                <!-- 选择是否合并到Word -->
                <v-btn
                    v-show=" !needMergeWord "
                    @click=" needMergeWord = !needMergeWord">
                  选择Word模板
                </v-btn>
                <v-btn
                    v-show=" needMergeWord "
                    @click=" mergeWordApp ">
                  开始导出打印
                </v-btn>
                <v-select
                    v-show=" needMergeWord "
                    v-model="outputDocFile"
                    label="选择Word目标文件，默认为template.doc"
                    :items="templateDocs"/>

                <v-divider></v-divider>
                <v-layout>
                  <div slot="translate">
                    <v-flex>
                      <v-btn
                          @click=" changeCSVHeader ">
                        翻译数据表标题
                      </v-btn>
                    </v-flex>
                    <v-flex>
                      <v-radio-group
                          v-model="reverseTranslate"
                          row>
                        <v-radio
                            color="primary"
                            row
                            v-for="option in ['外译中', '中译外']"
                            :key="option"
                            :label="`${option}第一行标题`"
                            :value=" option === '外译中' ? false : true "
                          ></v-radio>
                      </v-radio-group>
                    </v-flex>
                  </div>
                  <!-- translate-csv-header slot -->
                  <template>
                    <v-flex>
                      <slot name="translate"></slot>
                    </v-flex>
                  </template>
                  <!-- end of translate-csv-header slot -->
                </v-layout>
              </div>
            </v-tab-item>
            <!-- tab3 -->
            <v-tab-item>
              <div class="mt-15">
                <v-btn
                    class="accent"
                    @click="resetEntities">
                  重置数据
                </v-btn>
              </div>
            </v-tab-item>
          </v-tabs>
        </v-flex>
        <v-flex>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { join } from 'path'
import { shell } from 'electron'
import { LowdbForElectron } from '@/api/lowdb'
import { entities } from '@/api/globals'
import models from '@/models'

import exportMixin from '@/mixins/exportMixin'

import DatabasesIterator from './DatabasesIterator.vue'
import DatabaseChips from './DatabaseChips.vue'

import { log, ImportCSV } from '@/util'

export default {
  components: {
    DatabasesIterator,
    DatabaseChips
  },
  mixins: [exportMixin],
  data () {
    return {
      // entity file name/ csv file name / modelname
      modelName: 'user',
      importDatasource: {},
      // Switch between import/export/reset
      activeTab: 0,
      actionGroup: '导入',
      // Import and clear
      clearGroup: '保留',
      changeHeaderGroup: false
    }
  },
  created () {
    this.findDocuments()
    this.$on('SELECT_MODEL', modelName => {
      this.modelName = modelName
    })
    window.dbApp = this
  },
  computed: {
    // models instance for vuex/orm
    Model: function () {
      return models[`${this.modelName}`]
    },
    // entity name list
    entities: () => entities,
    cardImage: () => join(process.env.BASE_URL, 'bg/17.jpg')
  },
  methods: {
    findDocuments () {
      log.suc('Template Directory is: ' + this.templateDir)
      this.templateDocs.forEach(t => log.suc(t))
    },
    getImportFile (e) {
      // 从选择控件获取文件对象
      this.importDatasource = e.target.files[0]
      console.log(this.importDatasource)
    },
    exportEntities () {
      let data = this.Model.query()
        .withAll()
        .get()

      // 导出csv文件, 并更改列标题和对应键
      this.exportItem(data)
    },
    resetEntities () {
      // 删除文件中的数据
      let { entityDb, modelName } = this
      if (entityDb === undefined || modelName === undefined) return

      entityDb.clear(modelName)
      entityDb.dbInit([modelName])
      // 删除物理文件
      alert('如需删除物理文件，请手动删除：' + entityDb.adapter.source)
      shell.showItemInFolder(entityDb.adapter.source)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .mt-15
    margin: 15px
  .mt-45
    margin: 45px
  .mt-56
    margin: 56px
</style>
