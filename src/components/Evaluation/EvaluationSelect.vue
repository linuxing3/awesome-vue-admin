<script>
import { map, pick } from 'lodash/fp'
import Evaluation from '@/models/Evaluation'
export default {
  data() {
    return {
      model: { _id: 1, label: 'Select Evaluation' }
    }
  },
  created() {
    window.EvaluationSelect = this
  },
  computed: {
    evaluations: () => map(pick(['_id', 'text']), Evaluation.all())
  },
  methods: {
    change() {
      this.$emit('Evaluation_CHANGED', this.model._id)
    }
  }
}
</script>
<template>
  <v-select
      :items="evaluations"
      item-text="text"
      item-value="_id"
      v-model="model._id"
      :label="model.label"
      class="white--text"
      @change="change"
    >
  </v-select>
</template>
