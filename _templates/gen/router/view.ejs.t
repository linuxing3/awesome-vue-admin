---
to: "src/views/<%= h.changeCase.pascal(model) %>.vue"
---
<%
const EntityName = h.changeCase.camel(model)
const ModelName = h.changeCase.pascal(model)
%><template>
  <DefaultLayout>
    <<%= ModelName %> />
  </DefaultLayout>
</template>

<script lang="js">
import DefaultLayout from '@/layout/default.vue'
import <%= ModelName %> from '@/components/<%= ModelName %>/<%= ModelName %>.vue'

export default {
  components: {
    DefaultLayout,
    <%= ModelName %>
  }
}
</script>
