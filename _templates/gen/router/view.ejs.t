---
to: "src/views/<%= h.capitalize(model) %>.vue"
---
<%
  const modelName = h.capitalize(model)
  const componentName = h.capitalize(model)
%><template>
  <DefaultLayout>
    <<%= componentName %> />
  </DefaultLayout>
</template>

<script lang="js">
import DefaultLayout from '@/layout/default.vue'
import <%= componentName %> from '@/components/<%= modelName %>/<%= componentName %>.vue'

export default {
  components: {
    DefaultLayout,
    <%= componentName %>
  }
}
</script>
