---
to: 'src/components/helpers/<%= model %>.vue'
---
<%
  const modelName = model
%><template>
  <div><%= modelName %></div>
</template>

<script>
export default {
  data () {
    return {
      <%= modelName.toLowerCase() %>: '<%= modelName.toLowerCase() %>'
    }
  },
  watch: {
    <%= modelName.toLowerCase() %>: {
      handler (newValue) {
        this.handler(newValue)
      },
      immediate: true
    }
  },
  mixins: [],
  created () {
  },
  methods: {
    handler (item) {
      console.log(item)
    }
  }
}
</script>

<style scoped>
</style>
