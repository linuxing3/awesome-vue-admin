---
to: 'src/components/<%= h.capitalize(h.inflection.singularize(model)) %>/<%= h.capitalize(h.inflection.singularize(model)) %>.vue'
---
<%
  const modelName = h.capitalize(h.inflection.singularize(model))
  const modelTableName = h.capitalize(h.inflection.singularize(model)) + 'Table'
  const modelFormName = h.capitalize(h.inflection.singularize(model)) + 'Form'
%><template>
  <<%= modelTableName %>>
    <<%= modelFormName %> />
  </<%= modelTableName %>>
</template>

<script lang="js">
import <%= modelTableName %> from './<%= modelTableName %>.vue'
import <%= modelFormName %> from './<%= modelFormName %>.vue'

export default {
  components: {
    <%= modelTableName %>,
    <%= modelFormName %>
  }
}
</script>
