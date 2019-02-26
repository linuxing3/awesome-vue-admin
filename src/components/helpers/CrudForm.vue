<template>
  <v-card
    class="ma-3"
  >
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
                :label=' $(field) '>
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

<script>
import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'

export default {
  mixins: [crudMixin, exportMixin],
  props: {
    modelName: {
      type: String,
      default: 'user'
    },
    editing: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: Object,
      default: null
    },
    cardBgImage: {
      type: String
    },
    color: {
      type: String,
      default: 'primary'
    },
    dark: {
      type: Boolean,
      default: false
    },
    bottomNav: {
      type: Boolean,
      default: false
    },
    topNav: {
      type: Boolean,
      default: false
    },
    mini: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({}),
  created () {
    window.crudForm = this
  },
  computed: {
    computeCardLayout () {
      return this.mini ? 'row' : 'column'
    },
    computeTextAlgin () {
      return this.mini ? 'text-sm-right' : 'text-sm-center'
    },
    computeAvatarSize () {
      return this.mini ? '48' : '96'
    },
    showAvatar () {
      return this.avatar !== null && this.avatar.src
    },

    showBottomNav () {
      return this.mini === false && this.bottomNav
    },

    showTopNav () {
      return this.mini === false && this.topNav
    }
  },

  methods: {
    openExportDialog () {
      window.ExportDialog.$emit('TOGGLE')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .caption, .subheading {
    font-weight:200;
  }
</style>
