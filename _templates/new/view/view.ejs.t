---
to: "src/views/<%= h.capitalize(name) %>.vue"
---
<%
  const fileName = h.capitalize(name)
%><template>
  <DefaultLayout>
    <<%= fileName %>Table></<%= fileName %>Table>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layout/default.vue'

import <%= fileName %>Table from '@/components/<%= fileName %>/<%= fileName %>Table.vue'

@Component({
  components: {
    DefaultLayout,
    <%= fileName %>Table
  }
})
export default class Home extends Vue {}
</script>
