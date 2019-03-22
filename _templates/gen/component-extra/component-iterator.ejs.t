---
to: 'src/components/<%= model %>/<%= model %>Iterator.vue'
---
<%
  const modelName = model
  const modelIteratorName = model + 'Iterator'
  const modelFormName = model + 'Form'
%><template>
  <v-layout row wrap class="justify-center">
    <v-flex
      xs12
      sm6
      md6
      lg6
    >
    <v-card flat>
        <v-data-iterator
            :items="headers"
            content-tag="v-layout"
            row
            wrap
            hide-actions
          >
          <v-flex
              slot="item"
              slot-scope="props"
            >
              <v-list flat>
                <v-list-tile>
                  <v-text-field
                    outlined
                    :name="props.item"
                    :value="props.item"
                  ></v-text-field>
                </v-list-tile>
              </v-list>
          </v-flex>
        </v-data-iterator>
      </v-card>
    </v-flex>
    <v-flex
      xs12
      sm6
      md6
      lg6
    >
    <v-card flat>
        <v-data-iterator
            :items="headers"
            content-tag="v-layout"
            row
            wrap
            hide-actions
          >
          <v-flex
              slot="item"
              slot-scope="props"
            >
              <v-list flat>
                <v-list-tile>
                  <v-text-field
                    outlined
                    :name="props.item"
                    :value=" tryT(props.item) "
                  ></v-text-field>
                </v-list-tile>
              </v-list>
          </v-flex>
        </v-data-iterator>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import <%= modelName %> from '@/models/<%= modelName %>'
import <%= modelFormName %> from './<%= modelFormName %>'

import exportMixin from '@/mixins/exportMixin'
import crudMixin from '@/mixins/crudMixin'

export default {
  components: {
    <%= modelFormName %>
  },
  data() {
    return {
      modelName: '<%= modelName.toLowerCase() %>'
    }
  },
  mixins: [ exportMixin, crudMixin ],
  created() {
    window.<%= modelIteratorName %> = this
  },
  methods: {
    editItem(item) {
      this.$emit('SET_EDITING', item);
      window.<%= modelFormName %>.$emit('SET_EDITING', item)
    }
  },
}
</script>
