---
to: 'src/components/<%= h.capitalize(h.inflection.singularize(model)) %>/<%= h.capitalize(h.inflection.singularize(model)) %>Table.vue'
---
<%
  const modelName = h.capitalize(h.inflection.singularize(model))
  const modelTableName = h.capitalize(h.inflection.singularize(model)) + 'Table'
  const modelFormName = h.capitalize(h.inflection.singularize(model)) + 'Form'
%><template>
  <v-card>
    <v-card-title>
      <slot name="form-dialog" />
      <!-- 导出多个，将item属性设置为items数组 -->
      <ExportDialog
          buttonText="导出/打印"
          :item="items"
          :modelName="modelName" ></ExportDialog>
      <ImportDialog
          buttonText="导入/整理"
          :modelName="modelName"></ImportDialog>
      <v-spacer></v-spacer>
      <v-text-field
          v-model='filter.search'
          append-icon='search'
          label="模糊查询，不分大小写"
          single-line
        ></v-text-field>
    </v-card-title>
    <v-responsive>
      <v-data-table
          v-model='selected'
          :headers='headers'
          :items='items'
          class='elevation-0'
        >
        <template
            slot='headers'
            slot-scope='props'>
          <tr>
            <th
                class='text-xs-left'
                key='action'>
              {{ $t('action') }}
            </th>
            <th
                v-for='header in props.headers'
                class='text-xs-left'
                :key='header'>
              {{ tryT(header) }}
            </th>
          </tr>
        </template>
        <template
            slot='items'
            slot-scope='props'>
          <td class='justify-center layout px-0'>
            <v-btn
                icon
                class='mx-0'
                @click='editItem(props.item)'>
              <v-icon color='teal'>edit</v-icon>
            </v-btn>
            <v-btn
                icon
                class='mx-0'
                @click='deleteItem(props.item)'>
              <v-icon color='pink'>delete</v-icon>
            </v-btn>
          </td>
          <td
              class='text-xs-left'
              :key='header'
              :autocomplete='props.item[header]'
              v-for='header in headers'>
            {{ props.item[header] }}
          </td>
        </template>
      </v-data-table>
    </v-responsive>
  </v-card>
</template>

<script>
import exportMixin from '@/mixins/exportMixin'
import crudMixin from '@/mixins/crudMixin'

export default {
  data() {
    return {
      modelName: '<%= modelName.toLowerCase() %>'
    }
  },
  watch {
    modelName: {
      handler (newModelName) {
        this.fetch()
      },
      immediate: true
    },
  },
  mixins: [ exportMixin, crudMixin ],
  created() {
    window.<%= modelTableName %> = this
  },
  methods: {}
}
</script>

<style scoped>
</style>
