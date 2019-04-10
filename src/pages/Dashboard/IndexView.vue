<template>
  <DefaultLayout>
    <Dashboard>
    </Dashboard>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layout/default.vue' // @ is an alias to /src
import Dashboard from './components/Index.vue' // @ is an alias to /src

export default {
  components: {
    DefaultLayout,
    Dashboard
  }
}
</script>
