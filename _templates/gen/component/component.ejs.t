---
to: 'src/components/<%= model %>/<%= model %>.vue'
---
<%
  const modelName = model
  const modelTableName = model + 'Table'
  const modelFormName = model + 'Form'
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
