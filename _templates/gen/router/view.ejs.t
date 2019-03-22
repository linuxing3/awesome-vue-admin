---
to: "src/views/<%= model %>.vue"
---
<%
  const modelName = model
  const componentName = model
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
