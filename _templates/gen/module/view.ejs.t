---
to: "src/views/<%= h.capitalize(model) %>.vue"
---
<%
  const fileName = h.capitalize(model)
%><template>
  <DefaultLayout>
    <CrudTable>
      <ExportDialog />
      <ImportDialog />
    </CrudTable>
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
