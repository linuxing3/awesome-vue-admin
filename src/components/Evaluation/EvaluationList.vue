<script>
import Evaluation from '@/models/Evaluation'
import EvaluationForm from './EvaluationForm'

import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'

export default {
  components: {
    EvaluationForm
  },
  data () {
    return {
      modelName: 'evaluation'
    }
  },
  mixins: [ exportMixin, crudMixin ],
  created () {
    window.EvaluationList = this
  },
  methods: {
    editItem (item) {
      this.$emit('SET_EDITING', item)
      window.EvaluationForm.$emit('SET_EDITING', item)
    }
  }
}
</script>

<template>
  <div>
    <h3 class='heading pa-3'>{{ modelName }}</h3>
    <v-list
        dense
        expand
      >
      <v-list-group
          v-for='(item, i) in all'
          :key='i'
          :group='i'
          prepend-icon=''
          no-action='no-action'
        >
        <v-list-tile
            slot='activator'
            ripple='ripple'
          >
          <v-list-tile-content>
            <h4 class='white--text pa-1'>
              {{ item.name }}
            </h4>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </div>
</template>
