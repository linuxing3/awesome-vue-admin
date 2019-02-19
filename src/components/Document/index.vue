<script>
import DocumentForm from './DocumentForm'
import DocumentTable from './DocumentTable'
export default {
  components: {
    DocumentForm,
    DocumentTable
  },
  data() {},
  computed: {},
  created() {
    window.DocumentApp = this
  },
  methods: {}
}
</script>

<template>
  <v-card>
    <v-card-title v-show="false">
      DocumentApp
    </v-card-title>
    <v-responsive>
      <DocumentTable></DocumentTable>
    </v-responsive>
    <v-responsive>
      <DocumentForm></DocumentForm>
    </v-responsive>
  </v-card>
</template>
