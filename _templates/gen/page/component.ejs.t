---
to: 'src/pages/<%= h.changeCase.pascal(model) %>/components/Index.vue'
---
<%
const EntityName = h.changeCase.camel(model)
const ModelName = h.changeCase.pascal(model)
const modelTableName = ModelName + 'Table'
const modelFormName = ModelName + 'Form'
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
