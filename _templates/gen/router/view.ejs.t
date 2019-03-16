---
to: "src/views/<%= h.capitalize(model) %>.vue"
---
<%
  const fileName = h.capitalize(model)
%><template>
  <DefaultLayout>
  </DefaultLayout>
</template>

<script lang="js">
import DefaultLayout from '@/layout/default.vue'

export default {
  components: {
    DefaultLayout
  }
}
</script>
