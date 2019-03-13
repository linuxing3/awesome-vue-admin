<template>
  <DefaultLayout>
    <ReactiveResearch>
    </ReactiveResearch>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layout/default.vue' // @ is an alias to /src
import ReactiveResearch from '@/components/helpers/ReactiveResearch.vue' // @ is an alias to /src

export default {
  components: {
    DefaultLayout,
    ReactiveResearch
  }
}
</script>
