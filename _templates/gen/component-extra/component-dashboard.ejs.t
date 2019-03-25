---
to: 'src/components/<%= h.changeCase.pascal(model) %>/<%= h.changeCase.pascal(model) %>Dashboard.vue'
---
<%
const EntityName = h.changeCase.camel(model)
const ModelName = h.changeCase.pascal(model)
const modelTableName = ModelName + 'Table'
const modelFormName = ModelName + 'Form'
%><template>
  <v-card
      class="mt-5 mb-5 mx-auto"
      max-width="400"
      max-height="auto"
    >
    <v-sheet
        class="v-sheet--offset mx-auto"
        color="primary lighten-2"
        elevation="12"
        max-width="calc(100% - 32px)"
      >
      <v-sparkline
          :labels="labels"
          :value="values"
          :gradient="gradient"
          :line-width="width"
          :padding="padding"
          :smooth="radius || false"
          color="white"
        ></v-sparkline>
    </v-sheet>

    <v-card-actions class="pt-0">
      <div class="title font-weight-light mb-2 ml-5">时间线</div>
      <v-spacer></v-spacer>
      <v-btn flat><router-link to="/<%= modelName %>">Add</router-link></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import exportMixin from '@/mixins/exportMixin'
import crudMixin from '@/mixins/crudMixin'

const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea']
]

export default {
  data() {
    return {
      modelName: '<%= EntityName %>',
      gradient: gradients[4],
      gradients,
      padding: 16,
      radius: 10,
      width: 2
    }
  },
  computed: {
    labels() {
      return [...this.items.map(item => item['name'])]
    },
    values() {
      return [...this.items.map(item => item['_id'])]
    }
  },
  mixins: [ exportMixin, crudMixin ],
  async created() {
    console.table(this.items)
    window.<%= modelTableName %> = this
  },
  methods: {
    editItem(item) {
      this.$emit('SET_EDITING', item);
      window.<%= modelFormName %>.$emit('SET_EDITING', item)
    }
  }
}
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>
