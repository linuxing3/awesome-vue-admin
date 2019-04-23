<template>
  <DefaultLayout>
    <DocumentTypeForm />
  </DefaultLayout>
</template>

<script lang="js">
import DefaultLayout from '@/layout/default.vue'
import DocumentTypeForm from './components/DocumentTypeForm.vue'

export default {
  components: {
    DefaultLayout,
    DocumentTypeForm
  }
}
</script>
