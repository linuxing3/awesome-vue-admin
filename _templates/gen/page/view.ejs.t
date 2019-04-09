---
to: "src/pages/<%= h.changeCase.pascal(model) %>/IndexView.vue"
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
import <%= ModelName %> from './components/Index.vue'

export default {
  components: {
    DefaultLayout,
    <%= ModelName %>
  }
}
</script>
