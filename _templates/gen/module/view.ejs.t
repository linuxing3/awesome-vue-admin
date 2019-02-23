---
to: "src/views/<%= h.capitalize(model) %>.vue"
---
<%
  const fileName = h.capitalize(model)
%><template>
  <DefaultLayout>
    <<%= fileName %>Table></<%= fileName %>Table>
    <<%= fileName %>Form></<%= fileName %>Form>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import <%= fileName %>Table from '@/components/<%= fileName %>/<%= fileName %>Table.vue'
import <%= fileName %>Form from '@/components/<%= fileName %>/<%= fileName %>Form.vue'

@Component({
  components: {
    DefaultLayout,
    <%= fileName %>Table,
    <%= fileName %>Form
  }
})
export default class <%= fileName %> extends Vue {}
</script>
