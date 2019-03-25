---
to: 'src/components/helpers/<%= h.changeCase.pascal(model) %>.vue'
---
<%
const EntityName = h.changeCase.camel(model)
const ModelName = h.changeCase.pascal(model)
%><template>
  <div><%= modelName %></div>
</template>

<script>
export default {
  data () {
    return {
      <%= EntityName %>: '<%= EntityName %>'
    }
  },
  watch: {
    <%= EntityName %>: {
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
