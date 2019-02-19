---
to: "src/components/<%= h.capitalize(h.inflection.singularize(model)) %>/<%= h.capitalize(h.inflection.singularize(model)) %>Select.vue"
---
<%
  const modelName = h.capitalize(h.inflection.singularize(model))
  const modelArray = h.inflection.pluralize(model).toLowerCase()
  const modelSelectName = h.capitalize(h.inflection.singularize(model)) + 'Select'
%><script>
import { map, pick } from "lodash/fp";

import <%= modelName %> from "@/api/models/<%= modelName %>";

export default {
  data() {
    return {
      model: { "_id": 1, label: "Select <%= modelName %>" },
    }
  },
  created() {
    window.<%= modelSelectName %> = this;
  },
  computed: {
    <%= modelArray %>: () => map(pick(["_id", "text"]), <%= modelName%>.all()),
  },
  methods: {
    change() {
      this.$emit("<%= modelName %>_CHANGED", this.model._id)
    }
  }
}
</script>
<template>
  <v-select
      :items="<%= modelArray %>"
      item-text="text"
      item-value="_id"
      v-model="model._id"
      :label="model.label"
      class="white--text"
      @change="change"
    >
  </v-select>
</template>
